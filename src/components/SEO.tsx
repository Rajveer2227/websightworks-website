import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SITE_CONFIG } from '../constants/site';

interface SEOProps {
  title: string;
  description: string;
  ogType?: 'website' | 'article';
  ogImage?: string;
  schemas?: object[];
}

export default function SEO({
  title,
  description,
  ogType = 'website',
  ogImage = SITE_CONFIG.defaultOgImage,
  schemas = [],
}: SEOProps) {
  const location = useLocation();
  const canonicalUrl =
    location.pathname === '/'
      ? `${SITE_CONFIG.siteUrl}/`
      : `${SITE_CONFIG.siteUrl}${location.pathname}`;

  useEffect(() => {
    // 1. Format Document Title
    const formattedTitle = title.includes(SITE_CONFIG.name)
      ? title
      : `${title} | ${SITE_CONFIG.name}`;
    document.title = formattedTitle;

    // Ensure favicon metadata
    const faviconLink = document.querySelector('link[rel="icon"]');
    if (faviconLink) {
      faviconLink.setAttribute('href', '/WW_3.png');
      faviconLink.setAttribute('type', 'image/png');
    }

    // Helper to get or create a head element
    const getOrCreateMeta = (attrName: string, attrValue: string) => {
      const selector = `meta[${attrName}="${attrValue}"]`;
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      return element;
    };

    // 2. Standard Technical Meta Tags
    getOrCreateMeta('name', 'description').setAttribute('content', description);
    getOrCreateMeta('name', 'robots').setAttribute(
      'content',
      'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
    );
    getOrCreateMeta('name', 'author').setAttribute('content', SITE_CONFIG.name);
    getOrCreateMeta('name', 'publisher').setAttribute('content', SITE_CONFIG.name);

    // Geo Meta Tags for Verified Local Search Signals (Kolhapur, Maharashtra, India)
    getOrCreateMeta('name', 'geo.region').setAttribute('content', 'IN-MH');
    getOrCreateMeta('name', 'geo.placename').setAttribute('content', 'Kolhapur');
    getOrCreateMeta(
      'name',
      'geo.position',
    ).setAttribute(
      'content',
      `${SITE_CONFIG.contact.geo.latitude};${SITE_CONFIG.contact.geo.longitude}`
    );
    getOrCreateMeta(
      'name',
      'ICBM',
    ).setAttribute(
      'content',
      `${SITE_CONFIG.contact.geo.latitude}, ${SITE_CONFIG.contact.geo.longitude}`
    );

    // 3. Open Graph Social Graph Metadata
    getOrCreateMeta('property', 'og:title').setAttribute('content', formattedTitle);
    getOrCreateMeta('property', 'og:description').setAttribute('content', description);
    getOrCreateMeta('property', 'og:url').setAttribute('content', canonicalUrl);
    getOrCreateMeta('property', 'og:type').setAttribute('content', ogType);
    getOrCreateMeta('property', 'og:image').setAttribute('content', ogImage);
    getOrCreateMeta('property', 'og:site_name').setAttribute('content', SITE_CONFIG.name);
    getOrCreateMeta('property', 'og:locale').setAttribute('content', 'en_US');

    // 4. Twitter Card Metadata
    getOrCreateMeta('name', 'twitter:card').setAttribute('content', 'summary_large_image');
    getOrCreateMeta('name', 'twitter:title').setAttribute('content', formattedTitle);
    getOrCreateMeta('name', 'twitter:description').setAttribute('content', description);
    getOrCreateMeta('name', 'twitter:image').setAttribute('content', ogImage);

    // 5. Canonical URL Link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    // 6. JSON-LD Structured Data Schema Injection
    // Clean up previous dynamic schema scripts
    const existingScripts = document.querySelectorAll('script[data-dynamic-schema="true"]');
    existingScripts.forEach((script) => script.remove());

    // Universal Base Schemas for Organization, LocalBusiness, WebSite, and BreadcrumbList
    const baseSchemas = [
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        '@id': `${SITE_CONFIG.siteUrl}/#organization`,
        'name': SITE_CONFIG.name,
        'legalName': SITE_CONFIG.legalName,
        'url': SITE_CONFIG.siteUrl,
        'logo': `${SITE_CONFIG.siteUrl}/WW_3.png`,
        'image': ogImage,
        'description': SITE_CONFIG.positioning,
        'email': SITE_CONFIG.contact.email,
        'telephone': SITE_CONFIG.contact.telephoneLink,
        'sameAs': SITE_CONFIG.socials,
        'knowsAbout': [
          'Software Development',
          'Custom Web Applications',
          'Website Development',
          'E-Commerce Development',
          'Artificial Intelligence Solutions',
          'Data Analytics',
          'UI/UX Design',
        ],
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': SITE_CONFIG.contact.address.streetAddress,
          'addressLocality': SITE_CONFIG.contact.address.addressLocality,
          'addressRegion': SITE_CONFIG.contact.address.addressRegion,
          'postalCode': SITE_CONFIG.contact.address.postalCode,
          'addressCountry': SITE_CONFIG.contact.address.addressCountry,
        },
        'areaServed': [
          { '@type': 'City', 'name': 'Kolhapur' },
          { '@type': 'State', 'name': 'Maharashtra' },
          { '@type': 'Country', 'name': 'India' },
          { '@type': 'AdministrativeArea', 'name': 'Worldwide' },
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': ['LocalBusiness', 'ProfessionalService'],
        '@id': `${SITE_CONFIG.siteUrl}/#localbusiness`,
        'name': SITE_CONFIG.name,
        'image': ogImage,
        'description': SITE_CONFIG.positioning,
        'telephone': SITE_CONFIG.contact.telephoneLink,
        'email': SITE_CONFIG.contact.email,
        'url': SITE_CONFIG.siteUrl,
        'priceRange': '$$$',
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': SITE_CONFIG.contact.address.streetAddress,
          'addressLocality': SITE_CONFIG.contact.address.addressLocality,
          'addressRegion': SITE_CONFIG.contact.address.addressRegion,
          'postalCode': SITE_CONFIG.contact.address.postalCode,
          'addressCountry': SITE_CONFIG.contact.address.addressCountry,
        },
        'geo': {
          '@type': 'GeoCoordinates',
          'latitude': SITE_CONFIG.contact.geo.latitude,
          'longitude': SITE_CONFIG.contact.geo.longitude,
        },
        'areaServed': [
          {
            '@type': 'City',
            'name': 'Kolhapur',
          },
          {
            '@type': 'State',
            'name': 'Maharashtra',
          },
          {
            '@type': 'Country',
            'name': 'India',
          },
          {
            '@type': 'AdministrativeArea',
            'name': 'Worldwide',
          },
        ],
        'hasOfferCatalog': {
          '@type': 'OfferCatalog',
          'name': 'Software & Digital Technology Services',
          'itemListElement': SITE_CONFIG.services.map((s) => ({
            '@type': 'Offer',
            'itemOffered': {
              '@type': 'Service',
              'name': s.name,
              'url': `${SITE_CONFIG.siteUrl}${s.path}`,
            },
          })),
        },
        'openingHoursSpecification': {
          '@type': 'OpeningHoursSpecification',
          'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          'opens': '09:00',
          'closes': '20:00',
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': `${SITE_CONFIG.siteUrl}/#website`,
        'url': SITE_CONFIG.siteUrl,
        'name': SITE_CONFIG.name,
        'description': SITE_CONFIG.positioning,
        'publisher': {
          '@id': `${SITE_CONFIG.siteUrl}/#organization`,
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': location.pathname
          .split('/')
          .filter(Boolean)
          .reduce(
            (acc, curr, index, arr) => {
              const path = '/' + arr.slice(0, index + 1).join('/');
              const formattedName = curr
                .replace(/-/g, ' ')
                .replace(/\b\w/g, (char) => char.toUpperCase());
              acc.push({
                '@type': 'ListItem',
                'position': index + 2,
                'name': formattedName,
                'item': `${SITE_CONFIG.siteUrl}${path}`,
              });
              return acc;
            },
            [
              {
                '@type': 'ListItem',
                'position': 1,
                'name': 'Home',
                'item': `${SITE_CONFIG.siteUrl}/`,
              },
            ]
          ),
      },
    ];

    const allSchemas = [...baseSchemas, ...schemas];

    allSchemas.forEach((schemaObj) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-dynamic-schema', 'true');
      script.text = JSON.stringify(schemaObj);
      document.head.appendChild(script);
    });

    return () => {
      const dynamicScripts = document.querySelectorAll('script[data-dynamic-schema="true"]');
      dynamicScripts.forEach((script) => script.remove());
    };
  }, [title, description, ogType, ogImage, schemas, location.pathname, canonicalUrl]);

  return null;
}
