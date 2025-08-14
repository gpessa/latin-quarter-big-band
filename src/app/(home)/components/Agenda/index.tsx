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
import { Section } from "@/components";
import { QUERYResult } from "../../../../../sanity.types";

const Agenda: React.FC<Pick<QUERYResult["concerts"], "concerts">> = ({
  concerts,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const rows = (concerts || [])
    .map(({ date, name, address }) => ({
      date: new Date(date).toLocaleDateString("en-GB"),
      time: new Date(date).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      name,
      address,
      active: new Date(date).getTime() > new Date().getTime(),
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <Section color="primary">
      <Typography variant="h2" component="h2" gutterBottom>
        Agenda
      </Typography>

      {isMobile ? (
        <Box display="flex" flexDirection="column" gap={2}>
          {rows.map(({ date, time, name, address: { city }, active }) => (
            <Card key={date} sx={{ opacity: active ? 1 : 0.5 }}>
              <CardContent>
                <Typography variant="subtitle1">
                  📅 {date} (⏰ {time})
                </Typography>
                <Typography variant="body1" sx={{ mt: 1, fontWeight: "bold" }}>
                  {name}
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
              {rows.map(({ date, time, name, address: { city }, active }) => (
                <TableRow key={date} sx={{ opacity: active ? 1 : 0.5 }}>
                  <TableCell>{date}</TableCell>
                  <TableCell>{time}</TableCell>
                  <TableCell align="right">{name}</TableCell>
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
};

export default Agenda;
