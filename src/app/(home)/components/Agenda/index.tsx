"use client";

import { Section } from "@/components";
import {
  Box,
  Card,
  CardContent,
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

const Agenda: React.FC<QUERYResult["agenda"]> = (agenda) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const rows = (agenda?.concerts || [])
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
        {agenda?.title}
      </Typography>

      <Typography gutterBottom>
        {agenda?.content && <PortableText value={agenda?.content} />}
      </Typography>

      {isMobile ? (
        <Box display="flex" flexDirection="column" gap={2}>
          {rows.map(({ date, time, name, address, active }) => (
            <Card key={date} sx={{ opacity: active ? 1 : 0.5 }}>
              <CardContent>
                <Typography variant="subtitle1">
                  📅 {date} (⏰ {time})
                </Typography>
                <Typography variant="body1" sx={{ mt: 1, fontWeight: "bold" }}>
                  {name}
                </Typography>
                <Typography variant="body2">📍 {address?.city}</Typography>
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
              {rows.map(({ date, time, name, address, active }) => (
                <TableRow key={date} sx={{ opacity: active ? 1 : 0.5 }}>
                  <TableCell>{date}</TableCell>
                  <TableCell>{time}</TableCell>
                  <TableCell align="right">{name}</TableCell>
                  <TableCell>
                    <strong>{address?.city}</strong>
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
