"use client";

import { useState } from "react";
import { Section } from "@/components";
import { SECTIONS, STANDARD_MARGIN_BOTTOM } from "@/contants";
import {
  Box,
  Button,
  Divider,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { PortableText } from "next-sanity";
import { QUERYResult } from "../../../../../sanity.types";

const ITEMS_PER_PAGE = 10;

const Agenda: React.FC<Exclude<QUERYResult["agenda"], null>> = ({
  title,
  content,
  concerts,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [currentPage, setCurrentPage] = useState(1);

  const rows = (concerts || []).map(({ date, name, address, url }) => {
    const addressLine = [address?.street, address?.postalCode, address?.city]
      .filter((val) => val != null)
      .join(", ");

    return {
      dateString: new Date(date).toLocaleDateString("en-GB"),
      timeString: new Date(date).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      name,
      address: address?.name ? (
        <Typography component="span" variant="body2">
          {address.name.toUpperCase()}
          {addressLine && (
            <>
              <br />
              {addressLine}
            </>
          )}
        </Typography>
      ) : null,
      active: new Date(date).getTime() > new Date().getTime(),
      date: new Date(date),
      url,
    };
  });

  const oldConcerts = rows
    .filter(({ active }) => !active)
    .sort((a, b) => b.date.getTime() - a.date.getTime());

  const newConcerts = rows
    .filter(({ active }) => active)
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  const concertsSorted = [...newConcerts, ...oldConcerts];

  const totalPages = Math.ceil(concertsSorted.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedConcerts = concertsSorted.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handlePageChange = (event: any, page: number) => {
    setCurrentPage(page);
  };

  return (
    <Section color="secondary" id={SECTIONS.agenda}>
      <Typography
        variant="h3"
        component="h2"
        mb={STANDARD_MARGIN_BOTTOM}
        align="center"
      >
        {title}
      </Typography>

      <Typography component="div" mb={STANDARD_MARGIN_BOTTOM} align="center">
        <PortableText value={content} />
      </Typography>

      {isMobile ? (
        <Stack
          display="flex"
          flexDirection="column"
          gap={3}
          divider={<Divider orientation="horizontal" flexItem />}
        >
          {paginatedConcerts.map(
            ({ dateString, timeString, name, address, active, url }) => (
              <Stack key={dateString} sx={{ opacity: active ? 1 : 0.5 }}>
                <Stack spacing={1}>
                  <Typography
                    variant="body1"
                    sx={{ mt: 1, fontWeight: "bold" }}
                  >
                    {name}
                  </Typography>
                  <Typography variant="body2">
                    📅 {dateString}
                  </Typography>
                  <Typography variant="body2">
                    ⏰ {timeString}
                  </Typography>
                  {address && (
                    <Typography variant="body2">📍 {address}</Typography>
                  )}
                  {url && (
                    <Button
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="contained"
                      color="secondary"
                      size="small"
                    >
                      🔗 Link
                    </Button>
                  )}
                </Stack>
              </Stack>
            )
          )}
        </Stack>
      ) : (
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="agenda table">
            <TableHead>
              <TableRow>
                <TableCell>📅 DATE</TableCell>
                <TableCell>⏰ TIME</TableCell>
                <TableCell align="right">📍 LOCATION</TableCell>
                <TableCell align="right">🔗 LINK</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedConcerts.map(
                (
                  { dateString, timeString, name, address, active, url },
                  index
                ) => (
                  <TableRow key={index} sx={{ opacity: active ? 1 : 0.5 }}>
                    <TableCell>{dateString}</TableCell>
                    <TableCell>{timeString}</TableCell>
                    <TableCell align="right">
                      <strong>{name}</strong>
                      <br />
                      {address}
                    </TableCell>
                    <TableCell align="right">
                      {url && (
                        <Button
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          variant="contained"
                          color="secondary"
                        >
                          Link
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {totalPages > 1 && (
        <Box display="flex" justifyContent="center" mt={4}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="secondary"
          />
        </Box>
      )}
    </Section>
  );
};

export default Agenda;
