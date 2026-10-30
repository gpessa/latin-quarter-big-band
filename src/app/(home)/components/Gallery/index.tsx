"use client";
import { Section } from "@/components";
import { Box, Card, CardMedia, Grid, Typography } from "@mui/material";

import { SECTIONS } from "@/contants";
import { urlFor } from "@/sanity/lib/image";
import { QUERYResult } from "../../../../../sanity.types";
import Video from "../Video";
import { GRID_SPACING } from "@/theme";

const Gallery: React.FC<Exclude<QUERYResult["gallery"], null>> = ({
  title,
  images,
}) => {
  return (
    <Section id={SECTIONS.gallery} tone="teal">
      <Typography variant="h2" component="h2" gutterBottom>
        {title}
      </Typography>

      <Grid container spacing={GRID_SPACING}>
        {images?.map(({ title, image }, index) => {
          if (!image?.asset?._ref) return null;
          return (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={`${title}-${index}`}>
              <Card component="figcaption">
                <CardMedia
                  component="img"
                  src={urlFor(image)
                    .width(900)
                    .height(900)
                    .fit("crop")
                    .auto("format")
                    .url()}
                  alt={title}
                  loading="lazy"
                />
              </Card>
                {title && (
                <Typography component="figcaption" variant="caption">
                  {title}
                </Typography>
                )}
            </Grid>
          );
        })}
        <Grid size={{ xs: 12 }}>
          <Card>
            <CardMedia component={Video} videoid="O0GGfZ6jOjE" />
          </Card>
        </Grid>
      </Grid>

    </Section>
  );
};

export default Gallery;
