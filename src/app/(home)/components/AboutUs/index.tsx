"use client";

import { Section } from "@/components";
import { SECTIONS } from "@/contants";
import { Grid, Typography } from "@mui/material";
import { PortableText } from "next-sanity";
import { QUERYResult } from "../../../../../sanity.types";

const AboutUs = ({ title, content }: Exclude<QUERYResult["aboutUs"], null>) => (
  <Section id={SECTIONS.aboutUs}>
    <Grid container spacing={{ xs: 3, md: 8 }} sx={{ alignItems: "flex-start" }}>
      <Grid size={{ xs: 12, md: 5 }}>
        <Typography variant="h2" component="h2">
          {title}
        </Typography>
      </Grid>
      <Grid size={{ xs: 12, md: 7 }}>
        <Typography component="div">
          {content && <PortableText value={content} />}
        </Typography>
      </Grid>
    </Grid>
  </Section>
);

export default AboutUs;
