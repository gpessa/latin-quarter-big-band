import { INSTAGRAM_URL, NAME, SITE_URL } from "@/contants";

const BAND_ID = `${SITE_URL}/#band`;
const OG_IMAGE = `${SITE_URL}/opengraph-image`;

type ConcertAddress = {
  name?: string | null;
  formattedAddress?: string | null;
  street?: string | null;
  city?: string | null;
  postalCode?: string | null;
};

type Concert = {
  name: string;
  date: string;
  url?: string | null;
  address?: ConcertAddress | null;
};

function addressCountry(address: ConcertAddress) {
  const blob = [address.formattedAddress, address.postalCode, address.city]
    .filter(Boolean)
    .join(" ");
  if (/netherlands|nederland/i.test(blob) || /\b\d{4}\s?[A-Z]{2}\b/.test(blob)) {
    return "NL";
  }
  return undefined;
}

function buildMusicGroupSchema(description: string) {
  return {
    "@type": "MusicGroup",
    "@id": BAND_ID,
    name: NAME,
    url: SITE_URL,
    description,
    image: OG_IMAGE,
    genre: ["Latin jazz", "Salsa", "Big band"],
    sameAs: [INSTAGRAM_URL],
    areaServed: [
      { "@type": "City", name: "Amsterdam" },
      { "@type": "Country", name: "Netherlands" },
    ],
  };
}

function buildEventSchema(concert: Concert) {
  const address = concert.address;
  const country = address ? addressCountry(address) : undefined;
  const postalAddress = {
    "@type": "PostalAddress",
    ...(address?.street && { streetAddress: address.street }),
    ...(address?.city && { addressLocality: address.city }),
    ...(address?.postalCode && { postalCode: address.postalCode }),
    ...(country && { addressCountry: country }),
  };
  const hasAddress = Object.keys(postalAddress).length > 1;

  return {
    "@type": "MusicEvent",
    name: concert.name,
    startDate: concert.date,
    url: concert.url || `${SITE_URL}/#agenda`,
    image: OG_IMAGE,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    performer: { "@id": BAND_ID },
    organizer: { "@id": BAND_ID },
    location: {
      "@type": "Place",
      name: address?.name?.trim() || address?.city?.trim() || concert.name,
      ...(hasAddress && { address: postalAddress }),
    },
  };
}

export function JsonLd({
  description,
  concerts,
}: {
  description: string;
  concerts?: Concert[] | null;
}) {
  const upcomingConcerts = (concerts || []).filter((concert) => {
    const when = new Date(concert.date).getTime();
    return Number.isFinite(when) && when > Date.now();
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: NAME,
        description,
        publisher: { "@id": BAND_ID },
        inLanguage: "en",
      },
      buildMusicGroupSchema(description),
      ...upcomingConcerts.map(buildEventSchema),
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}
