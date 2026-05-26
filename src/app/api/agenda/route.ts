import { client } from "@/sanity/lib/client";

const CONCERTS_QUERY = `*[_type == "agenda"][0].concerts[] | order(date asc){
  _key,
  name,
  date,
  url,
  address {
    name,
    street,
    city,
    postalCode
  }
}`;

type Concert = {
  _key: string;
  name: string;
  date: string;
  url?: string;
  address?: {
    name?: string;
    street?: string;
    city?: string;
    postalCode?: string;
  };
};

const PRODID =
  process.env.NEXT_PUBLIC_SITE_URL ?? "latin-quarter-big-band";

function escapeIcal(text: string): string {
  return text
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\n/g, "\\n");
}

function toIcalDate(iso: string): string {
  return new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

function addHours(iso: string, hours: number): string {
  const d = new Date(iso);
  d.setHours(d.getHours() + hours);
  return d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

function buildLocation(address: Concert["address"]): string | null {
  if (!address) return null;
  const parts = [address.name, address.street, address.postalCode, address.city]
    .filter((p) => p != null && p.trim() !== "");
  return parts.length > 0 ? parts.join(", ") : null;
}

function buildCalendar(concerts: Concert[]): string {
  const events = concerts
    .map((c) => {
      const lines = [
        "BEGIN:VEVENT",
        `UID:${c._key}@${PRODID}`,
        `DTSTAMP:${toIcalDate(new Date().toISOString())}`,
        `DTSTART:${toIcalDate(c.date)}`,
        `DTEND:${addHours(c.date, 2)}`,
        `SUMMARY:${escapeIcal(c.name)}`,
      ];

      const location = buildLocation(c.address);
      if (location) lines.push(`LOCATION:${escapeIcal(location)}`);
      if (c.url) lines.push(`URL:${c.url}`);

      lines.push("END:VEVENT");
      return lines.join("\r\n");
    })
    .join("\r\n");

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    `PRODID:-//${PRODID}//Concerts//EN`,
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "X-WR-CALNAME:Latin Quarter Big Band - Concerts",
    events,
    "END:VCALENDAR",
  ].join("\r\n");
}

export async function GET() {
  const concerts = await client.fetch<Concert[]>(CONCERTS_QUERY);
  const ical = buildCalendar(concerts ?? []);

  return new Response(ical, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'inline; filename="concerts.ics"',
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
