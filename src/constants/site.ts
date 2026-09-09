/**
 * Centralized Site Configuration & SEO Single Source of Truth
 * Ensures canonical consistency across all metadata, JSON-LD schemas,
 * Open Graph, Twitter cards, and sitemaps.
 */

export const SITE_CONFIG = {
  name: 'Websight Works',
  legalName: 'Websight Works',
  domain: 'websightworks.com',
  siteUrl: 'https://websightworks.com',
  defaultOgImage: 'https://websightworks.com/WW_3.png',
  
  // Primary Positioning
  positioning: 'Software development and digital technology company based in Kolhapur, Maharashtra, serving businesses across India and internationally.',
  
  // Official Verified Business Information (NAP)
  contact: {
    email: 'contact@websightworks.com',
    phone: '+91 96373 72210',
    telephoneLink: '+91-96373-72210',
    address: {
      streetAddress: 'Vimal Vihar, Rajarampuri 3rd Ln, Poorvarang Apt, Rajarampuri',
      addressLocality: 'Kolhapur',
      addressRegion: 'Maharashtra',
      postalCode: '416008',
      addressCountry: 'IN',
    },
    geo: {
      latitude: 16.7050,
      longitude: 74.2433,
    },
  },

  // Official Verified Social Media Profiles
  socials: [
    'https://www.linkedin.com/company/websight-works/',
    'https://www.instagram.com/websight.works/?hl=en',
  ],

  // Core Service Catalog for Schema Alignment
  services: [
    {
      id: 'website-development',
      name: 'Website Development',
      path: '/expertise/website-development',
    },
    {
      id: 'e-commerce',
      name: 'E-Commerce Stores',
      path: '/expertise/e-commerce',
    },
    {
      id: 'custom-apps',
      name: 'Custom Web Applications',
      path: '/expertise/custom-apps',
    },
    {
      id: 'social-media-marketing',
      name: 'Social Media Marketing',
      path: '/expertise/digital-marketing',
    },
    {
      id: 'ai-solutions',
      name: 'AI-Powered Solutions',
      path: '/expertise/ai-solutions',
    },
    {
      id: 'data-analytics',
      name: 'Data Analytics',
      path: '/expertise/data-analytics',
    },
    {
      id: 'ui-ux-design',
      name: 'UI/UX Design',
      path: '/expertise/ui-ux-design',
    },
  ],
};
