import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

// Simple in-memory sliding window rate limiter for Serverless Function executions
const ipRateLimitMap = new Map<string, { count: number; firstSeen: number }>();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes window
const MAX_REQUESTS_PER_WINDOW = 5; // Max 5 submissions per 15 mins per IP

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = ipRateLimitMap.get(ip);

  // Clean up old entries periodically
  if (ipRateLimitMap.size > 1000) {
    for (const [key, value] of ipRateLimitMap.entries()) {
      if (now - value.firstSeen > RATE_LIMIT_WINDOW_MS) {
        ipRateLimitMap.delete(key);
      }
    }
  }

  if (!record) {
    ipRateLimitMap.set(ip, { count: 1, firstSeen: now });
    return false;
  }

  if (now - record.firstSeen > RATE_LIMIT_WINDOW_MS) {
    ipRateLimitMap.set(ip, { count: 1, firstSeen: now });
    return false;
  }

  record.count += 1;
  return record.count > MAX_REQUESTS_PER_WINDOW;
}

// Input sanitizer to prevent HTML/Header Injection & XSS attacks
function sanitizeInput(str: string, maxLength: number = 1000): string {
  if (typeof str !== 'string') return '';
  return str
    .trim()
    .slice(0, maxLength)
    .replace(/[<>]/g, '') // Strip basic HTML tags
    .replace(/[\r\n]{3,}/g, '\n\n'); // Prevent header injection & line break flooding
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // 1. Enforce POST HTTP Method Only
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // 2. Security Headers for API Response
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');

  try {
    // 3. Request Body & Payload Size Check
    if (!req.body || typeof req.body !== 'object') {
      return res.status(400).json({ error: 'Invalid payload structure.' });
    }

    const { name, email, phone, category, message, honeypot } = req.body;

    // 4. Honeypot Spam Bot Trap: Silent drop if honeypot is populated
    if (honeypot && typeof honeypot === 'string' && honeypot.trim().length > 0) {
      // Return 200 OK to trick automated spam bots without executing Resend API
      return res.status(200).json({ success: true });
    }

    // 5. Client IP Extraction & Serverless Rate Limiting
    const forwarded = req.headers['x-forwarded-for'];
    const clientIp = typeof forwarded === 'string' 
      ? forwarded.split(',')[0].trim() 
      : (req.headers['x-real-ip'] as string) || req.socket.remoteAddress || '127.0.0.1';

    if (isRateLimited(clientIp)) {
      return res.status(429).json({ error: 'Too many requests. Please try again later.' });
    }

    // 6. Strict Server-Side Input Validation & Sanitization
    const cleanName = sanitizeInput(name, 100);
    const cleanEmail = sanitizeInput(email, 150);
    const cleanPhone = sanitizeInput(phone || '', 30);
    const cleanCategory = sanitizeInput(category, 100);
    const cleanMessage = sanitizeInput(message, 3000);

    if (!cleanName) {
      return res.status(400).json({ error: 'Name is required.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!cleanEmail || !emailRegex.test(cleanEmail)) {
      return res.status(400).json({ error: 'Valid email address is required.' });
    }

    if (!cleanCategory) {
      return res.status(400).json({ error: 'Project category is required.' });
    }

    if (!cleanMessage) {
      return res.status(400).json({ error: 'Project scope message is required.' });
    }

    // 7. Validate Server Environment Secret
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      // Log internally; return generic message to client to prevent internal structure exposure
      console.error('[API /contact] Error: RESEND_API_KEY environment variable missing.');
      return res.status(500).json({ error: 'Unable to process enquiry at this time.' });
    }

    // 8. Construct Email Content & Send via Resend Serverless API
    const resend = new Resend(apiKey);
    const submittedAt = new Date().toUTCString();

    const emailBody = `New Project Enquiry — Websight Works

Name:
${cleanName}

Email:
${cleanEmail}

${cleanPhone ? `Phone:\n${cleanPhone}\n\n` : ''}Category:
${cleanCategory}

Project Scope:
${cleanMessage}

----------------------------------------
Submitted: ${submittedAt}
IP Address: ${clientIp}`;

    const { data, error } = await resend.emails.send({
      from: 'Websight Works <contact@websightworks.com>',
      to: 'contact@websightworks.com',
      replyTo: cleanEmail,
      subject: `New Project Enquiry — ${cleanName}`,
      text: emailBody,
    });

    if (error) {
      console.error('[API /contact] Resend dispatch failure:', error);
      return res.status(500).json({ error: 'Unable to deliver enquiry email.' });
    }

    return res.status(200).json({ success: true, id: data?.id });

  } catch (err: any) {
    // Log full error stack internally; expose ZERO stack trace to client
    console.error('[API /contact] Internal Server Error:', err);
    return res.status(500).json({ error: 'An unexpected internal server error occurred.' });
  }
}
