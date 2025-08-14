"use client";

import React from "react";
import { Typography } from "@mui/material";
import { Section } from "@/components";

const JoinTheBand: React.FC = () => (
  <Section color="primary">
    <Typography variant="h2" component="h2" gutterBottom>
      Join the Band
    </Typography>
    <Typography gutterBottom>
      Are you a musician looking to play with a dynamic big band? The{" "}
      <strong>Latin Quarter Big Band</strong> is expanding, and we want you!
    </Typography>
    <Typography gutterBottom>
      Latin Quarter Big Band is growing — and we’re looking for passionate,
      talented musicians to join our rhythm and horn sections!
    </Typography>

    <Typography gutterBottom>We’re currently looking for:</Typography>
    <ul>
      <Typography component="li">🪘 Bongo player</Typography>
      <Typography component="li">🥁 Timbales player</Typography>
      <Typography component="li">
        🎸 Guitarist (ideally with experience in Latin jazz or salsa comping)
      </Typography>
      <Typography component="li">
        🎺 1st Trombone (lead parts, strong section playing required)
      </Typography>
    </ul>
  </Section>
);

export default JoinTheBand;
