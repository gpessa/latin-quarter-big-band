"use client";

import { Section } from "@/components";
import { NAME, SECTIONS, STANDARD_SPACING } from "@/contants";
import { Grid, Typography } from "@mui/material";
import { PortableText } from "next-sanity";
import { QUERYResult } from "../../../../../sanity.types";

const AboutUs = ({ content }: QUERYResult["aboutUs"]) => (
  <Section color="primary" id={SECTIONS.aboutUs}>
    <Grid container spacing={STANDARD_SPACING}>
      <Grid size={{ xs: 12, md: 5 }}>
        <Typography variant="h3" component="h2" gutterBottom>
          {NAME}
        </Typography>
      </Grid>
      <Grid size={{ xs: 12, md: 7 }}>
        <Typography component="div" gutterBottom>
          {content && <PortableText value={content} />}
        </Typography>
      </Grid>
    </Grid>
  </Section>
);

export default AboutUs;
