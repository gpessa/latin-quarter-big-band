"use client";

import { Section } from "@/components";
import { SECTIONS } from "@/contants";
import { Typography } from "@mui/material";
import { PortableText } from "next-sanity";
import { QUERYResult } from "../../../../../sanity.types";

const AboutUs = ({ title, content }: Exclude<QUERYResult["aboutUs"], null>) => (
  <Section color="primary" id={SECTIONS.aboutUs}>
    <Typography variant="h3" component="h2" gutterBottom align="center">
      {title}
    </Typography>
    <Typography component="div" align="center">
      {content && <PortableText value={content} />}
    </Typography>
  </Section>
);

export default AboutUs;
