"use client";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";
import { Section } from "@/app/components";

export default function Agenda() {
  const rows = [
    {
      date: new Date("2025-08-08T21:30:00"),
      location: "Salsa Dance Party Amvo",
      city: "Volendam",
    },
    {
      date: new Date("2025-08-30T17:00:00"),
      location: "Buurtfeest Minne",
      city: "Amsterdam",
    },
    {
      date: new Date("2025-09-07T15:00:00"),
      location: "Westergas",
      city: "Amsterdam",
    },
    {
      date: new Date("2025-09-14T15:00:00"),
      location: "Pure Markt",
      city: "Amsterdam",
    },
    {
      date: new Date("2025-11-26T15:00:00"),
      location: "Huis van de Wijk De Havelaar",
      city: "Amsterdam",
    },
    {
      date: new Date("2025-12-07T16:00:00"),
      location: "Mahogany Hall",
      city: "Edam",
    },
  ];

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Section color="primary">
      <Typography variant="h2" component="h2" gutterBottom>
        Agenda
      </Typography>

      {isMobile ? (
        <Box display="flex" flexDirection="column" gap={2}>
          {rows.map(({ date, location, city }) => (
            <Card key={date.toISOString()}>
              <CardContent>
                <Typography variant="subtitle1">
                  📅 {date.toLocaleDateString("en-GB")} (⏰
                  {date.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                  )
                </Typography>
                <Typography variant="body1" sx={{ mt: 1, fontWeight: "bold" }}>
                  {location}
                </Typography>
                <Typography variant="body2">📍 {city}</Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      ) : (
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="agenda table">
            <TableHead>
              <TableRow>
                <TableCell>📅 DATE</TableCell>
                <TableCell>⏰ TIME</TableCell>
                <TableCell align="right">LOCATION</TableCell>
                <TableCell>📍 CITY</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(({ date, location, city }) => (
                <TableRow key={date.toISOString()}>
                  <TableCell>{date.toLocaleDateString("en-GB")}</TableCell>
                  <TableCell>
                    {date.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </TableCell>
                  <TableCell align="right">{location}</TableCell>
                  <TableCell>
                    <strong>{city}</strong>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Section>
  );
}
