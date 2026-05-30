"use client";
import { Section } from "@/components";
import { Box, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";

import { SECTIONS, STANDARD_MARGIN_BOTTOM } from "@/contants";
import { urlFor } from "@/sanity/lib/image";
import { QUERYResult } from "@/types/query";
import { YouTubeEmbed } from "@next/third-parties/google";
import { PortableText } from "next-sanity";

const Gallery: React.FC<Exclude<QUERYResult["gallery"], null>> = ({
  title,
  content,
  images,
}) => {
  return (
    <Section color="secondary" id={SECTIONS.gallery}>
      <Stack gap={STANDARD_MARGIN_BOTTOM}>
        <Typography
          variant="h3"
          component="h2"
          align="center"
        >
          {title}
        </Typography>

        {content && (
          <Typography component="div" align="center">
            <PortableText value={content} />
          </Typography>
        )}

        <Grid container spacing={4}>
          {images?.map(({ title, image }, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <Box component="figure" sx={{ m: 0 }}>
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
          style="width: 100%; height: auto; max-width: unset;"
        />
      </Stack>
    </Section>
  );
};

export default Gallery;
