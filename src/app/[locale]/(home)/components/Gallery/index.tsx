"use client";

import { Section } from "@/components";
import { SECTIONS, copyFor } from "@/contants";
import { urlFor } from "@/sanity/lib/image";
import { displayTitleSx, proseSx } from "@/theme";
import { QUERYResult } from "@/types/query";
import { Box, Grid, Typography } from "@mui/material";
import { YouTubeEmbed } from "@next/third-parties/google";
import { PortableText } from "next-sanity";

const Gallery: React.FC<
  Exclude<QUERYResult["gallery"], null> & { locale: string }
> = ({ content, images, locale }) => {
  const copy = copyFor(locale);

  return (
    <Section id={SECTIONS.gallery} tone="teal">
      <Typography
        variant="h2"
        component="h2"
        sx={{ ...displayTitleSx, mb: content ? 3 : 5 }}
      >
        {copy.galleryTitle}
      </Typography>

      {content && (
        <Typography component="div" sx={{ ...proseSx, maxWidth: 720, mb: 5 }}>
          <PortableText value={content} />
        </Typography>
      )}

      <Grid container spacing={2.5}>
        {images?.map(({ title, image }, index) => {
          if (!image?.asset?._ref) return null;
          return (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={`${title}-${index}`}>
              <Box component="figure" sx={{ m: 0 }}>
                <Box
                  component="img"
                  src={urlFor(image).width(900).height(900).fit("crop").auto("format").url()}
                  alt={title}
                  loading="lazy"
                  sx={{
                    width: "100%",
                    aspectRatio: "1 / 1",
                    objectFit: "cover",
                    display: "block",
                    borderRadius: "10px",
                  }}
                />
                {title && (
                  <Box
                    component="figcaption"
                    sx={{
                      mt: 0.75,
                      fontSize: "13px",
                      fontWeight: 500,
                      lineHeight: 1.4,
                      letterSpacing: "0.01em",
                      textTransform: "none",
                      color: "rgba(255,255,255,0.78)",
                    }}
                  >
                    {title}
                  </Box>
                )}
              </Box>
            </Grid>
          );
        })}
      </Grid>

      <Box
        sx={{
          mt: { xs: 6, md: 8 },
          borderRadius: "10px",
          overflow: "hidden",
          lineHeight: 0,
          "& lite-youtube": { maxWidth: "100%" },
        }}
      >
        <YouTubeEmbed
          videoid="O0GGfZ6jOjE"
          style="width: 100%; max-width: 100%;"
        />
      </Box>
    </Section>
  );
};

export default Gallery;
