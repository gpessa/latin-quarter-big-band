import { Section } from "@/app/components";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";

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

  return (
    <Section color="primary">
      <Typography variant="h2" component="h2" gutterBottom>
        Agenda
      </Typography>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
                <TableCell>
                  {date.toLocaleDateString("en-GB", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })}
                </TableCell>
                <TableCell>{date.toLocaleTimeString()}</TableCell>
                <TableCell align="right">{location}</TableCell>
                <TableCell>
                  <strong>{city}</strong>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Section>
  );
}
