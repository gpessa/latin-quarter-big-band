/* eslint-disable @typescript-eslint/no-require-imports */
import { Container } from "@mui/material";
import Grid from "@mui/material/Grid";
import Image from "next/image";

export default function Gallery() {
  const images = [
    require("../../../../assets/image_00001.jpeg").default,
    require("../../../../assets/image_00002.jpeg").default,
    require("../../../../assets/image_00003.jpeg").default,
    require("../../../../assets/image_00004.jpeg").default,
    require("../../../../assets/image_00005.jpeg").default,
    require("../../../../assets/image_00006.jpeg").default,
  ];

  return (
    <Container>
      <Grid container>
        {images.map((src, index) => (
          <Grid size={4} key={index}>
            <Image src={src} alt={`Description ${index + 1}`} width={300} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
