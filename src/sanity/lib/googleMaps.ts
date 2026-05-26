import { importLibrary, setOptions } from "@googlemaps/js-api-loader";

export type ParsedGooglePlace = {
  name?: string;
  formattedAddress: string;
  street?: string;
  city?: string;
  postalCode?: string;
  googlePlaceId: string;
  location: { lat: number; lng: number };
};

let loadPromise: Promise<void> | null = null;

export function getGoogleMapsApiKey(): string | undefined {
  return process.env.NEXT_PUBLIC_SANITY_STUDIO_GOOGLE_MAPS_API_KEY;
}

export async function loadGoogleMaps(): Promise<typeof google> {
  const apiKey = getGoogleMapsApiKey();
  if (!apiKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SANITY_STUDIO_GOOGLE_MAPS_API_KEY. " +
        "Add your Google Maps API key to .env.local."
    );
  }

  if (!loadPromise) {
    setOptions({ key: apiKey, v: "weekly" });
    loadPromise = Promise.all([
      importLibrary("maps"),
      importLibrary("places"),
    ]).then(() => undefined);
  }

  await loadPromise;
  return google;
}

function getAddressComponent(
  components: google.maps.GeocoderAddressComponent[],
  type: string,
  nameType: "long_name" | "short_name" = "long_name"
): string | undefined {
  return components.find((c) => c.types.includes(type))?.[nameType];
}

export function parseGooglePlace(
  place: google.maps.places.PlaceResult
): ParsedGooglePlace | null {
  const placeId = place.place_id;
  const formattedAddress = place.formatted_address;
  const lat = place.geometry?.location?.lat();
  const lng = place.geometry?.location?.lng();

  if (!placeId || !formattedAddress || lat == null || lng == null) {
    return null;
  }

  const components = place.address_components ?? [];
  const streetNumber = getAddressComponent(components, "street_number");
  const route = getAddressComponent(components, "route");
  const street = [streetNumber, route].filter(Boolean).join(" ").trim();

  const city =
    getAddressComponent(components, "locality") ??
    getAddressComponent(components, "postal_town") ??
    getAddressComponent(components, "administrative_area_level_2");

  const postalCode = getAddressComponent(components, "postal_code");

  return {
    name: place.name,
    formattedAddress,
    street: street || undefined,
    city: city || undefined,
    postalCode: postalCode || undefined,
    googlePlaceId: placeId,
    location: { lat, lng },
  };
}
