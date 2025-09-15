"use client";
import { Section } from "@/components";
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";

import { SECTIONS } from "@/contants";
import { urlFor } from "@/sanity/lib/image";
import { QUERYResult } from "../../../../../sanity.types";

const Gallery: React.FC<QUERYResult["gallery"]> = (gallery) => {
  return (
    <Section color="secondary" id={SECTIONS.gallery}>
      <Grid container spacing={4}>
        {gallery?.images?.map(({ title, image }, index) => (
          <Grid size={{ xs: 12, md: 4 }} key={index}>
            <Box
              component="figure"
              sx={{
                m: 0,
              }}
            >
              <Box
                component="img"
                src={urlFor(image.asset!._ref).width(400).height(400).url()}
                alt={title}
                loading="lazy"
                sx={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                }}
              />
              <Typography component="figcaption" variant="caption">
                {title}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Section>
  );
};

export default Gallery;
