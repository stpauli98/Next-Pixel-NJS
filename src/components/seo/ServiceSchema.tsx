import React from 'react';

interface ServiceSchemaProps {
  serviceName: string;
  description: string;
  provider: string;
  url: string;
  priceRange?: string;
  areaServed?: string[];
  image?: string;
}

export const ServiceSchema: React.FC<ServiceSchemaProps> = ({
  serviceName,
  description,
  provider,
  url,
  priceRange = '€€',
  areaServed = ['Serbia', 'Bosnia and Herzegovina', 'Montenegro', 'Europe'],
  image = 'https://nextpixel.dev/og-image.png'
}) => {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: serviceName,
    description: description,
    provider: {
      '@type': 'LocalBusiness',
      name: provider,
      '@id': 'https://nextpixel.dev/#business'
    },
    url: url,
    areaServed: areaServed.map(area => ({
      '@type': 'Place',
      name: area
    })),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: serviceName,
      itemListElement: {
        '@type': 'Offer',
        priceSpecification: {
          '@type': 'PriceSpecification',
          priceCurrency: 'EUR',
          price: priceRange
        }
      }
    },
    image: image,
    serviceType: serviceName,
    termsOfService: 'https://nextpixel.dev/terms',
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: url,
      servicePhone: '+381601234567',
      availableLanguage: ['sr', 'en', 'de']
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
};

export default ServiceSchema;