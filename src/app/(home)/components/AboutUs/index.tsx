/* eslint-disable @typescript-eslint/no-require-imports */
"use client";

import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";

const ContainerStyled = styled("div")({
  width: "100vw",
  height: "100vh",
  zIndex: -1,
});

const ImageStyled = styled(Image)({
  position: "absolute",
  top: 0,
  left: 0,
});

const TextStyled = styled(Box)(({ theme }) => ({
  position: "absolute",
  bottom: theme.spacing(2),
  right: theme.spacing(2),
  width: "30%",
  padding: theme.spacing(5),
  backgroundColor: theme.palette.common.white,
}));

const LogoStyled = styled(Image)(({ theme }) => ({
  position: "absolute",
  top: theme.spacing(2),
  left: theme.spacing(2),
  width: 250,
  height: 250,
}));

export default function AboutUs() {
  return (
    <ContainerStyled>
      <ImageStyled
        src={require("../../../../assets/image_00001.jpeg").default}
        fill
        style={{ objectFit: "cover" }}
        alt={"About Us Background Image"}
      />

      <LogoStyled
        src={require("../../../../assets/logo.png").default}
        alt="About Us Background"
      />

      <TextStyled>
        <Typography variant="h2" component="h2" gutterBottom>
          Latin Quarter
          <br />
          Big Band
        </Typography>
        <Typography gutterBottom>
          <strong>Latin Quarter Big Band </strong>is a 20-piece ensemble led by
          bandleader <strong>Jaime Rodrigues</strong>, bringing the vibrant
          sounds of Latin jazz to life.
        </Typography>
        <Typography>
          With a powerful blend of South American rhythms and jazz
          improvisation, the band delivers an authentic and energetic musical
          experience that makes every performance unforgettable.
        </Typography>
      </TextStyled>
    </ContainerStyled>
  );
}
