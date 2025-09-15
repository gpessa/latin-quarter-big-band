"use client";
import { Section } from "@/components";
import { Box, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";

import { SECTIONS } from "@/contants";
import { urlFor } from "@/sanity/lib/image";
import { QUERYResult } from "../../../../../sanity.types";
import { YouTubeEmbed } from "@next/third-parties/google";

const Gallery: React.FC<QUERYResult["gallery"]> = (gallery) => {
  return (
    <Section color="secondary" id={SECTIONS.gallery}>
      <Stack gap={4}>
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

        <YouTubeEmbed
          videoid="O0GGfZ6jOjE"
          style={
            "width: 100%; height: auto; max-width: unset;"
            //   "width: 80%; max-width: 80%; justify-content: center; margin-left: 10%"
          }
        />
      </Stack>
    </Section>
  );
};

export default Gallery;
