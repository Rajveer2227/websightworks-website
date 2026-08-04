import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // 1. Enforce POST HTTP Method Only
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { name, email, phone, category, message } = req.body || {};

    // 2. Server-side Input Validation
    if (!name || typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({ error: 'Name is required.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || !email.trim() || !emailRegex.test(email.trim())) {
      return res.status(400).json({ error: 'Valid email address is required.' });
    }

    if (!category || typeof category !== 'string' || !category.trim()) {
      return res.status(400).json({ error: 'Project category is required.' });
    }

    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ error: 'Project scope message is required.' });
    }

    // 3. Extract Metadata (Client IP and Current Timestamp)
    const forwarded = req.headers['x-forwarded-for'];
    const clientIp = typeof forwarded === 'string' 
      ? forwarded.split(',')[0].trim() 
      : (req.headers['x-real-ip'] as string) || req.socket.remoteAddress || 'Unknown';

    const submittedAt = new Date().toUTCString();

    // 4. Validate Environment Variables
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error('[API /contact] RESEND_API_KEY is not defined in process.env');
      return res.status(500).json({ error: 'Server configuration error: RESEND_API_KEY missing.' });
    }

    // 5. Construct Email Content & Send via Resend
    const resend = new Resend(apiKey);

    const emailBody = `New Project Enquiry

Name:
${name.trim()}

Email:
${email.trim()}

${phone && typeof phone === 'string' && phone.trim() ? `Phone:\n${phone.trim()}\n\n` : ''}Category:
${category.trim()}

Project Scope:
${message.trim()}

Submitted:
${submittedAt}

IP:
${clientIp}`;

    const { data, error } = await resend.emails.send({
      from: 'Websight Works <contact@websightworks.com>',
      to: 'contact@websightworks.com',
      subject: 'New Project Enquiry — Websight Works',
      text: emailBody,
    });

    if (error) {
      console.error('[API /contact] Resend dispatch error:', error);
      return res.status(500).json({ error: error.message || 'Failed to send enquiry email.' });
    }

    return res.status(200).json({ success: true, id: data?.id });

  } catch (err: any) {
    console.error('[API /contact] Unexpected server error:', err);
    return res.status(500).json({ error: 'An unexpected internal server error occurred.' });
  }
}
