"use client";
import { Section } from "@/components";
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";

import { styled } from "@mui/material/styles";

import { QUERYResult } from "../../../../../sanity.types";
import { urlFor } from "@/sanity/lib/image";

const Gallery: React.FC<Pick<QUERYResult["gallery"], "images">> = ({
  images,
}) => {
  return (
    <Section>
      <Typography variant="h2" component="h2" gutterBottom>
        Photo Gallery
      </Typography>
      <Grid container spacing={4}>
        {images.map(({ name, image }, index) => (
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
                alt={name}
                loading="lazy"
                sx={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                }}
              />
              <Typography component="figcaption" variant="caption">
                {name}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Section>
  );
};

export default Gallery;
