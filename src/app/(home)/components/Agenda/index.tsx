import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";

export default function Agenda() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody></TableBody>
      </Table>
    </TableContainer>
  );
}
