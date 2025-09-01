"use client";
import { Section } from "@/components";
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";

import { urlFor } from "@/sanity/lib/image";
import { QUERYResult } from "../../../../../sanity.types";
import { SECTIONS, STANDARD_MARGIN_BOTTOM } from "@/contants";

const Gallery: React.FC<QUERYResult["gallery"]> = (gallery) => {
  return (
    <Section color="primary" id={SECTIONS.gallery}>
      {/* <Typography variant="h2" component="h2" mb={STANDARD_MARGIN_BOTTOM}>
        Photo Gallery
      </Typography> */}
      <Grid container spacing={4}>
        {gallery?.images?.map(({ name, image }, index) => (
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
