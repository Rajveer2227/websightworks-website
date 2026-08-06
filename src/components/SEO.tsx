import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

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
  ogImage = 'https://websightworks.com/WW_3.png',
  schemas = [],
}: SEOProps) {
  const location = useLocation();
  const canonicalUrl = `https://websightworks.com${location.pathname === '/' ? '' : location.pathname}`;

  useEffect(() => {
    // 1. Format Document Title
    const formattedTitle = title.includes('Websight Works')
      ? title
      : `${title} | Websight Works`;
    document.title = formattedTitle;

    // Ensure favicon metadata
    let faviconLink = document.querySelector('link[rel="icon"]');
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
    getOrCreateMeta('name', 'author').setAttribute('content', 'Websight Works');
    getOrCreateMeta('name', 'publisher').setAttribute('content', 'Websight Works');

    // Geo Meta Tags for Local Search Signals (Kolhapur, Maharashtra, India)
    getOrCreateMeta('name', 'geo.region').setAttribute('content', 'IN-MH');
    getOrCreateMeta('name', 'geo.placename').setAttribute('content', 'Kolhapur');
    getOrCreateMeta('name', 'geo.position').setAttribute('content', '16.7050;74.2433');
    getOrCreateMeta('name', 'ICBM').setAttribute('content', '16.7050, 74.2433');

    // 3. Open Graph Social Graph Metadata
    getOrCreateMeta('property', 'og:title').setAttribute('content', formattedTitle);
    getOrCreateMeta('property', 'og:description').setAttribute('content', description);
    getOrCreateMeta('property', 'og:url').setAttribute('content', canonicalUrl);
    getOrCreateMeta('property', 'og:type').setAttribute('content', ogType);
    getOrCreateMeta('property', 'og:image').setAttribute('content', ogImage);
    getOrCreateMeta('property', 'og:site_name').setAttribute('content', 'Websight Works');
    getOrCreateMeta('property', 'og:locale').setAttribute('content', 'en_US');

    // 4. Twitter Card Metadata
    getOrCreateMeta('name', 'twitter:card').setAttribute('content', 'summary_large_image');
    getOrCreateMeta('name', 'twitter:title').setAttribute('content', formattedTitle);
    getOrCreateMeta('name', 'twitter:description').setAttribute('content', description);
    getOrCreateMeta('name', 'twitter:image').setAttribute('content', ogImage);
    getOrCreateMeta('name', 'twitter:site').setAttribute('content', '@websightworks');
    getOrCreateMeta('name', 'twitter:creator').setAttribute('content', '@websightworks');

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
        '@type': ['Organization', 'SoftwareCompany'],
        '@id': 'https://websightworks.com/#organization',
        'name': 'Websight Works',
        'legalName': 'Websight Works',
        'url': 'https://websightworks.com',
        'logo': 'https://websightworks.com/WW_3.png',
        'image': ogImage,
        'email': 'contact@websightworks.com',
        'telephone': '+91-96373-72210',
        'sameAs': [
          'https://www.instagram.com/websightworks/',
          'https://www.linkedin.com/company/websight-works/',
          'https://twitter.com/websightworks',
          'https://github.com/websightworks',
        ],
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': 'Vimal Vihar, Rajarampuri 3rd Lane',
          'addressLocality': 'Kolhapur',
          'addressRegion': 'Maharashtra',
          'postalCode': '416008',
          'addressCountry': 'IN',
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': ['LocalBusiness', 'ProfessionalService', 'WebDesign'],
        '@id': 'https://websightworks.com/#localbusiness',
        'name': 'Websight Works',
        'image': ogImage,
        'telephone': '+91-96373-72210',
        'email': 'contact@websightworks.com',
        'url': 'https://websightworks.com',
        'priceRange': '$$$',
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': 'Vimal Vihar, Rajarampuri 3rd Lane',
          'addressLocality': 'Kolhapur',
          'addressRegion': 'Maharashtra',
          'postalCode': '416008',
          'addressCountry': 'IN',
        },
        'geo': {
          '@type': 'GeoCoordinates',
          'latitude': 16.7050,
          'longitude': 74.2433,
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
        ],
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
        '@id': 'https://websightworks.com/#website',
        'url': 'https://websightworks.com',
        'name': 'Websight Works',
        'publisher': {
          '@id': 'https://websightworks.com/#organization',
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
                'item': `https://websightworks.com${path}`,
              });
              return acc;
            },
            [
              {
                '@type': 'ListItem',
                'position': 1,
                'name': 'Home',
                'item': 'https://websightworks.com/',
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
