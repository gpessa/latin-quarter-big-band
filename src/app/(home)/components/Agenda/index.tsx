"use client";

import { Section } from "@/components";
import { SECTIONS } from "@/contants";
import AccessTimeOutlined from "@mui/icons-material/AccessTimeOutlined";
import CalendarTodayOutlined from "@mui/icons-material/CalendarTodayOutlined";
import PlaceOutlined from "@mui/icons-material/PlaceOutlined";
import { Box, Button, Pagination, Table, TableCell, TableRow, Typography } from "@mui/material";
import { PortableText } from "next-sanity";
import { useState } from "react";
import { QUERYResult } from "../../../../../sanity.types";

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
  title,
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
      <Typography variant="h2" component="h2" gutterBottom>
        {title}
      </Typography>

      <Typography component="div" gutterBottom>
        <PortableText value={content} />
      </Typography>

      <Table>
        {paginatedConcerts.map(
          ({ dateString, timeString, name, place, active, url, date }) => (
            <TableRow
              key={`${name}-${date.toISOString()}`}
              sx={{
                opacity: active ? 1 : 0.72
              }}
            >
              <TableCell >
                <Typography><CalendarTodayOutlined /> {dateString}</Typography>
                <Typography><AccessTimeOutlined /> {timeString}</Typography>
              </TableCell>

              <TableCell>
                <Typography>
                  {name}
                </Typography>
                {place && (
                  <Typography variant="body2">
                    <PlaceOutlined />
                    {place}
                  </Typography>
                )}
              </TableCell>

              <TableCell>
                {url && (
                  <Button
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="contained"
                  >
                    Link
                  </Button>
                )}
              </TableCell>
            </TableRow>
          )
        )}
      </Table>

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
          />
        </Box>
      )}
    </Section>
  );
};

export default Agenda;
