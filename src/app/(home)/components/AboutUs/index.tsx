/* eslint-disable @typescript-eslint/no-require-imports */
"use client";

import { Section } from "@/components";
import { SECTIONS } from "@/contants";
import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function AboutUs() {
  const images = [
    require("../../../../assets/image_00001.jpeg").default,
    require("../../../../assets/image_00002.jpeg").default,
    require("../../../../assets/image_00003.jpeg").default,
    require("../../../../assets/image_00004.jpeg").default,
    require("../../../../assets/image_00005.jpeg").default,
    require("../../../../assets/image_00006.jpeg").default,
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Section color="primary" id={SECTIONS.aboutUs}>
      <Grid container>
        <Grid size={6}>
          <Typography variant="h2" component="h2">
            Latin Quarter
            <br />
            Big Band
          </Typography>
        </Grid>
        <Grid size={6}>
          <Typography>
            <strong>Latin Quarter Big Band </strong>is a 20-piece ensemble led
            by bandleader <strong>Jaime Rodrigues</strong>, bringing the vibrant
            sounds of Latin jazz to life.
          </Typography>
          <Typography>
            With a powerful blend of South American rhythms and jazz
            improvisation, the band delivers an authentic and energetic musical
            experience that makes every performance unforgettable.
          </Typography>
        </Grid>
      </Grid>
    </Section>
  );
}
