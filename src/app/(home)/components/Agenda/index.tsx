"use client";

import { Section } from "@/components";
import { SECTIONS } from "@/contants";
import AccessTimeOutlined from "@mui/icons-material/AccessTimeOutlined";
import CalendarTodayOutlined from "@mui/icons-material/CalendarTodayOutlined";
import PlaceOutlined from "@mui/icons-material/PlaceOutlined";
import {
  Box,
  Button,
  Divider,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  styled
} from "@mui/material";
import { PortableText } from "next-sanity";
import { useState } from "react";
import { QUERYResult } from "../../../../../sanity.types";

const ITEMS_PER_PAGE = 8;

type ConcertAddress = NonNullable<
  NonNullable<NonNullable<QUERYResult["agenda"]>["concerts"]>[number]["address"]
>;

type ConcertRow = {
  name: string;
  address: ConcertAddress | null;
  active: boolean;
  date: Date;
  url: string | null;
};


function ConcertLink({ url }: { url: string }) {
  return (
    <Button
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      variant="contained"
    >
      Link
    </Button>
  );
}

const Name = styled(Typography)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightBold,
  textTransform: "uppercase",
}));


const CustomPagination = styled(Pagination)(({ theme }) => ({
  "& .MuiButtonBase-root": {
    color: theme.palette.common.white,
  },
}));

function Address({ address }: { address: ConcertAddress | null }) {
  if (!address) return null;

  let place;

  const { name, formattedAddress, street, postalCode, city } = address;

  const venue = name?.trim();

  const detail = street
    ? [street, postalCode, city].filter(Boolean).join(", ")
    : formattedAddress || [postalCode, city].filter(Boolean).join(", ");

  if (venue && detail) {
    place = `${venue} — ${detail}`;
  } else {
    place =  venue ? venue : detail;
  }

  return (
    <Stack spacing={1} direction="row" sx={{mb: 1}}>
      <PlaceOutlined />
      <Typography>{place}</Typography>
    </Stack>
  );
}

function DateTime({ date }: { date: Date }) {
    const dateString =  date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    
    const timeString =  date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })

  return (
    <>
      <Stack spacing={1} direction="row" sx={{mb: 1}}>
        <CalendarTodayOutlined  />
        <Typography>{dateString}</Typography>
      </Stack>
      <Stack spacing={1} direction="row">
        <AccessTimeOutlined />
        <Typography>{timeString}</Typography>
      </Stack>  
    </>
  );
}


function AgendaMobile({ concerts }: { concerts: ConcertRow[] }) {
  return (
    <Stack
      spacing={3}
      divider={<Divider flexItem sx={{ borderColor: "rgba(255,255,255,0.2)" }} />}
      sx={{ display: { md: "none" } }}
    >
      {concerts.map(({ name, address, active, url, date }) => (
        <Stack key={`${name}-${date.toISOString()}`} spacing={1} sx={{ opacity: active ? 1 : 0.72 }}>
          <Name>{name}</Name>
          <DateTime date={date} />
          <Address address={address} />
          {url && <ConcertLink url={url} />}
        </Stack>
      ))}
    </Stack>
  );
}

function AgendaDesktop({ concerts }: { concerts: ConcertRow[] }) {
  return (
    <Table sx={{ display: { xs: "none", md: "table" } }}>
      <TableBody>
        {concerts.map(({ date, name, address, active, url }) => (
          <TableRow
            key={`${name}-${date.toISOString()}`}
            sx={{ opacity: active ? 1 : 0.72 }}
          >
            <TableCell>
              <DateTime date={date} />
            </TableCell>
            <TableCell>
              <Name>{name}</Name>
              <Address address={address} />
            </TableCell>
            <TableCell>{url && <ConcertLink url={url} />}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
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
      active: when.getTime() > now,
      address,
      date: when,
      name,
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

      <AgendaMobile concerts={paginatedConcerts} />
      <AgendaDesktop concerts={paginatedConcerts} />

      {totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CustomPagination
            count={totalPages}
            page={currentPage}
            color="primary"
            size="large"
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
