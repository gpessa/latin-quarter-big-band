"use client";

import {
  loadGoogleMaps,
  parseGooglePlace,
  type ParsedGooglePlace,
} from "@/sanity/lib/googleMaps";
import { Box, Card, Flex, Stack, Text, TextInput } from "@sanity/ui";
import { useCallback, useEffect, useRef, useState } from "react";
import { ObjectInputProps, PatchEvent, set, unset } from "sanity";

type AddressValue = {
  name?: string;
  formattedAddress?: string;
  street?: string;
  city?: string;
  postalCode?: string;
  googlePlaceId?: string;
  location?: { lat?: number; lng?: number };
};

function formatAddressLine(addr: AddressValue): string {
  if (addr.formattedAddress?.trim()) return addr.formattedAddress.trim();
  return [addr.name, addr.street, addr.postalCode, addr.city]
    .filter((part) => part?.trim())
    .join(", ");
}

export function GooglePlacesAddressInput(props: ObjectInputProps) {
  const { value, onChange, schemaType } = props;
  const addr = (value ?? {}) as AddressValue;

  const searchRef = useRef<HTMLInputElement>(null);
  const mapBoxRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);

  const [loadError, setLoadError] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  const lat = addr.location?.lat;
  const lng = addr.location?.lng;
  const hasCoords = typeof lat === "number" && typeof lng === "number";
  const displayAddress = formatAddressLine(addr);

  const setField = useCallback(
    (field: keyof AddressValue, v: string | undefined) => {
      onChange(v ? PatchEvent.from(set(v, [field])) : PatchEvent.from(unset([field])));
    },
    [onChange]
  );

  const applyPlace = useCallback(
    (parsed: ParsedGooglePlace) => {
      onChange(
        PatchEvent.from([
          parsed.name ? set(parsed.name, ["name"]) : unset(["name"]),
          set(parsed.formattedAddress, ["formattedAddress"]),
          parsed.street ? set(parsed.street, ["street"]) : unset(["street"]),
          parsed.city ? set(parsed.city, ["city"]) : unset(["city"]),
          parsed.postalCode ? set(parsed.postalCode, ["postalCode"]) : unset(["postalCode"]),
          set(parsed.googlePlaceId, ["googlePlaceId"]),
          set(parsed.location, ["location"]),
        ])
      );
      if (searchRef.current) searchRef.current.value = parsed.formattedAddress;
      setLoadError(null);
    },
    [onChange]
  );

  const updateMap = useCallback((mLat: number, mLng: number) => {
    if (!mapBoxRef.current || typeof google === "undefined") return;
    const pos = { lat: mLat, lng: mLng };
    if (!mapRef.current) {
      mapRef.current = new google.maps.Map(mapBoxRef.current, {
        center: pos,
        zoom: 15,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
      });
      markerRef.current = new google.maps.Marker({ map: mapRef.current });
    }
    mapRef.current.setCenter(pos);
    mapRef.current.setZoom(15);
    markerRef.current?.setPosition(pos);
  }, []);

  useEffect(() => {
    let cancelled = false;
    let ac: google.maps.places.Autocomplete | null = null;

    loadGoogleMaps()
      .then((g) => {
        if (cancelled || !searchRef.current) return;
        ac = new g.maps.places.Autocomplete(searchRef.current, {
          fields: ["place_id", "formatted_address", "address_components", "geometry", "name"],
        });
        ac.addListener("place_changed", () => {
          const place = ac?.getPlace();
          if (!place) return;
          const parsed = parseGooglePlace(place);
          if (!parsed) {
            setLoadError("Could not read this place. Pick a suggestion from the list.");
            return;
          }
          applyPlace(parsed);
        });
        setReady(true);
        setLoadError(null);
      })
      .catch((err: unknown) => {
        if (!cancelled)
          setLoadError(err instanceof Error ? err.message : "Failed to load Google Maps.");
      });

    return () => {
      cancelled = true;
      if (ac && typeof google !== "undefined") google.maps.event.clearInstanceListeners(ac);
    };
  }, [applyPlace]);

  useEffect(() => {
    if (ready && hasCoords) updateMap(lat, lng);
  }, [hasCoords, lat, lng, ready, updateMap]);

  useEffect(() => {
    if (searchRef.current && displayAddress) {
      searchRef.current.value = displayAddress;
    }
  }, [displayAddress]);

  return (
    <Stack space={4} padding={3}>
      <Text size={1} weight="semibold">
        {schemaType.title || "Address"}
      </Text>

      <Stack space={3}>
        <Text size={1} muted>
          Start typing and pick a suggestion from Google Maps.
        </Text>
        <input
          ref={searchRef}
          defaultValue={displayAddress}
          placeholder={
            ready ? "Search venue or address\u2026" : loadError ? "See error below" : "Loading Google Maps\u2026"
          }
          style={{
            width: "100%",
            padding: "0.6rem 0.75rem",
            borderRadius: 3,
            border: "1px solid var(--card-border-color)",
            font: "inherit",
            background: "var(--card-bg-color)",
            color: "var(--card-fg-color)",
          }}
        />
        {loadError && (
          <Text size={1} style={{ color: "var(--card-badge-critical-fg-color)" }}>
            {loadError}
          </Text>
        )}
        {(addr.googlePlaceId || displayAddress) && (
          <Card padding={3} radius={2} tone={addr.googlePlaceId ? "positive" : "caution"} border>
            <Text size={1}>
              {addr.googlePlaceId
                ? `Google place selected${displayAddress ? `: ${displayAddress}` : ""}`
                : `Saved address${displayAddress ? `: ${displayAddress}` : ""} (pick a Google suggestion to refresh coordinates)`}
            </Text>
          </Card>
        )}
      </Stack>

      {hasCoords && (
        <Box
          ref={mapBoxRef}
          style={{
            width: "100%",
            height: 200,
            borderRadius: 3,
            overflow: "hidden",
            border: "1px solid var(--card-border-color)",
          }}
        />
      )}

      <Stack space={3}>
        <Text size={1} weight="semibold">Venue details</Text>
        <TextInput
          value={addr.name ?? ""}
          onChange={(e) => setField("name", e.currentTarget.value)}
          placeholder="Venue name (optional)"
        />
        <TextInput
          value={addr.street ?? ""}
          onChange={(e) => setField("street", e.currentTarget.value)}
          placeholder="Street"
        />
        <Flex gap={3}>
          <Box flex={1}>
            <TextInput
              value={addr.city ?? ""}
              onChange={(e) => setField("city", e.currentTarget.value)}
              placeholder="City"
            />
          </Box>
          <Box flex={1}>
            <TextInput
              value={addr.postalCode ?? ""}
              onChange={(e) => setField("postalCode", e.currentTarget.value)}
              placeholder="Postal code"
            />
          </Box>
        </Flex>
      </Stack>
    </Stack>
  );
}
