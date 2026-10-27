"use client";

import { useState } from "react";
import { Section } from "@/components";
import { SECTIONS, pageCopy } from "@/contants";
import { Box, Button, Pagination, Typography } from "@mui/material";
import { PortableText } from "next-sanity";
import { QUERYResult } from "../../../../../sanity.types";
import { brand } from "@/theme";
import AccessTimeOutlined from "@mui/icons-material/AccessTimeOutlined";
import CalendarTodayOutlined from "@mui/icons-material/CalendarTodayOutlined";
import PlaceOutlined from "@mui/icons-material/PlaceOutlined";

const ITEMS_PER_PAGE = 8;

type ConcertAddress = NonNullable<
  NonNullable<NonNullable<QUERYResult["agenda"]>["concerts"]>[number]["address"]
>;

function placeLine(address?: ConcertAddress | null) {
  if (!address) return "";
  const venue = address.name?.trim();
  const detail = address.street
    ? [address.street, address.postalCode, address.city].filter(Boolean).join(", ")
    : address.formattedAddress ||
      [address.postalCode, address.city].filter(Boolean).join(", ");

  if (venue && detail) return `${venue.toUpperCase()} — ${detail}`;
  return venue ? venue.toUpperCase() : detail;
}

const Agenda: React.FC<Exclude<QUERYResult["agenda"], null>> = ({
  content,
  concerts,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [now] = useState(() => Date.now());

  const rows = (concerts || []).map(({ date, name, address, url }) => {
    const when = new Date(date);
    return {
      dateString: when.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
      timeString: when.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      name,
      place: placeLine(address),
      active: when.getTime() > now,
      date: when,
      url,
    };
  });

  const upcoming = rows
    .filter(({ active }) => active)
    .sort((a, b) => a.date.getTime() - b.date.getTime());
  const past = rows
    .filter(({ active }) => !active)
    .sort((a, b) => b.date.getTime() - a.date.getTime());
  const concertsSorted = [...upcoming, ...past];

  const totalPages = Math.ceil(concertsSorted.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedConcerts = concertsSorted.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <Section tone="teal" id={SECTIONS.agenda}>
      <Typography variant="h2" component="h2" sx={{ mb: 3, maxWidth: 980 }}>
        {pageCopy.agendaTitle}
      </Typography>

      <Typography component="div" sx={{ maxWidth: 920, mb: 2 }}>
        <PortableText value={content} />
      </Typography>

      <Box>
        {paginatedConcerts.map(
          ({ dateString, timeString, name, place, active, url, date }) => (
            <Box
              key={`${name}-${date.toISOString()}`}
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "168px 1fr auto" },
                gap: { xs: 1.5, md: 3 },
                alignItems: { md: "center" },
                py: 2.5,
                borderTop: "1px solid rgba(255,255,255,0.2)",
                opacity: active ? 1 : 0.72,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "row", md: "column" },
                  flexWrap: "wrap",
                  alignItems: "center",
                  columnGap: 2.5,
                  rowGap: 0.75,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <CalendarTodayOutlined sx={{ fontSize: 16 }} />
                  <Typography sx={{ fontSize: 15 }}>{dateString}</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <AccessTimeOutlined sx={{ fontSize: 16 }} />
                  <Typography sx={{ fontSize: 15 }}>{timeString}</Typography>
                </Box>
              </Box>

              <Box>
                <Typography sx={{ fontWeight: 700, fontSize: { xs: 17, md: 18 } }}>
                  {name}
                </Typography>
                {place && (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 0.75,
                      mt: 0.5,
                      opacity: 0.9,
                    }}
                  >
                    <PlaceOutlined sx={{ fontSize: 16, mt: "3px" }} />
                    <Typography sx={{ fontSize: 14, letterSpacing: "0.02em" }}>
                      {place}
                    </Typography>
                  </Box>
                )}
              </Box>

              {url ? (
                <Button
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="contained"
                  sx={{
                    justifySelf: { md: "end" },
                    width: { xs: "100%", md: "auto" },
                    bgcolor: active ? brand.red : brand.mutedRed,
                    color: "#fff",
                    px: 2.25,
                    py: 1,
                    whiteSpace: "nowrap",
                    "&:hover": {
                      bgcolor: active ? brand.redDark : "#6E3638",
                    },
                  }}
                >
                  {pageCopy.moreInfo}
                </Button>
              ) : (
                <Box sx={{ display: { xs: "none", md: "block" } }} />
              )}
            </Box>
          )
        )}
      </Box>

      {totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(_event, page) => {
              setCurrentPage(page);
              document
                .getElementById(SECTIONS.agenda)
                ?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            sx={{
              "& .MuiPaginationItem-root": { color: "#fff" },
              "& .Mui-selected": {
                bgcolor: "rgba(255,255,255,0.16) !important",
              },
            }}
          />
        </Box>
      )}
    </Section>
  );
};

export default Agenda;
