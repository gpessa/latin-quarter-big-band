import { NAME, SITE_URL } from "@/contants";

type Concert = {
  name: string;
  date: string;
  url?: string | null;
  address?: {
    name?: string | null;
    formattedAddress?: string | null;
    street?: string | null;
    city?: string | null;
    postalCode?: string | null;
  } | null;
};

function buildMusicGroupSchema(description: string, locale: string) {
  return {
    "@type": "MusicGroup",
    name: NAME,
    url: SITE_URL,
    description,
    genre: ["Big Band", "Jazz", "Latin Jazz", "Swing"],
    inLanguage: locale === "nl" ? "nl-NL" : "en",
    areaServed: {
      "@type": "City",
      name: "Amsterdam",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Amsterdam",
      addressCountry: "NL",
    },
  };
}

function buildEventSchema(concert: Concert) {
  const eventSchema: Record<string, unknown> = {
    "@type": "MusicEvent",
    name: concert.name,
    startDate: concert.date,
    performer: {
      "@type": "MusicGroup",
      name: NAME,
      url: SITE_URL,
    },
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
  };

  if (concert.url) {
    eventSchema.url = concert.url;
  }

  if (concert.address?.name) {
    eventSchema.location = {
      "@type": "Place",
      name: concert.address.name,
      address: {
        "@type": "PostalAddress",
        ...(concert.address.street && {
          streetAddress: concert.address.street,
        }),
        ...(concert.address.city && {
          addressLocality: concert.address.city,
        }),
        ...(concert.address.postalCode && {
          postalCode: concert.address.postalCode,
        }),
      },
    };
  }

  return eventSchema;
}

export function JsonLd({
  description,
  concerts,
  locale,
}: {
  description: string;
  concerts?: Concert[] | null;
  locale: string;
}) {
  const upcomingConcerts = (concerts || []).filter(
    (c) => new Date(c.date).getTime() > Date.now()
  );

  const graph: Record<string, unknown>[] = [
    buildMusicGroupSchema(description, locale),
    ...upcomingConcerts.map(buildEventSchema),
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": graph,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
