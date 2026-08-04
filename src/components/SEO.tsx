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
  ogImage = 'https://websightworks.com/images/og-share.jpg',
  schemas = [],
}: SEOProps) {
  const location = useLocation();
  const canonicalUrl = `https://websightworks.com${location.pathname}`;

  useEffect(() => {
    // 1. Update Document Title
    const formattedTitle = `${title} | Websight Works`;
    document.title = formattedTitle;

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

    // 2. Update Standard Meta Tags
    getOrCreateMeta('name', 'description').setAttribute('content', description);
    getOrCreateMeta('name', 'robots').setAttribute('content', 'index, follow');

    // 3. Update Open Graph Meta Tags
    getOrCreateMeta('property', 'og:title').setAttribute('content', formattedTitle);
    getOrCreateMeta('property', 'og:description').setAttribute('content', description);
    getOrCreateMeta('property', 'og:url').setAttribute('content', canonicalUrl);
    getOrCreateMeta('property', 'og:type').setAttribute('content', ogType);
    getOrCreateMeta('property', 'og:image').setAttribute('content', ogImage);
    getOrCreateMeta('property', 'og:site_name').setAttribute('content', 'Websight Works');

    // 4. Update Twitter Card Meta Tags
    getOrCreateMeta('name', 'twitter:card').setAttribute('content', 'summary_large_image');
    getOrCreateMeta('name', 'twitter:title').setAttribute('content', formattedTitle);
    getOrCreateMeta('name', 'twitter:description').setAttribute('content', description);
    getOrCreateMeta('name', 'twitter:image').setAttribute('content', ogImage);

    // 5. Update Canonical Link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    // 6. Inject JSON-LD Schema Scripts
    // Remove existing dynamic schemas
    const existingScripts = document.querySelectorAll('script[data-dynamic-schema="true"]');
    existingScripts.forEach((script) => script.remove());

    // Inject Organization and LocalBusiness as standard base schemas on every page
    const baseSchemas = [
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        '@id': 'https://websightworks.com/#organization',
        'name': 'Websight Works',
        'url': 'https://websightworks.com',
        'logo': 'https://websightworks.com/images/logo.png',
        'sameAs': [
          'https://twitter.com/websightworks',
          'https://www.linkedin.com/company/websight-works/',
          'https://github.com/websightworks',
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        '@id': 'https://websightworks.com/#localbusiness',
        'name': 'Websight Works',
        'image': ogImage,
        'telephone': '+91-96373-72210',
        'email': 'contact@websightworks.com',
        'priceRange': '$$$$',
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
              acc.push({
                '@type': 'ListItem',
                'position': index + 2,
                'name': curr.charAt(0).toUpperCase() + curr.slice(1).replace('-', ' '),
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
      // Clean up dynamic schemas on unmount (or when route transitions)
      const dynamicScripts = document.querySelectorAll('script[data-dynamic-schema="true"]');
      dynamicScripts.forEach((script) => script.remove());
    };
  }, [title, description, ogType, ogImage, schemas, location.pathname, canonicalUrl]);

  return null; // Side-effects only, does not render anything to the React DOM
}
