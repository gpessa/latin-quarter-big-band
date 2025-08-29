/* eslint-disable @typescript-eslint/no-require-imports */
"use client";

import { Box, Card, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import { useEffect, useState } from "react";

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

const LogoContainer = styled(Paper)(({ theme }) => ({
  lineHeight: 0,
  position: "absolute",
  top: theme.spacing(5),
  right: theme.spacing(5),
}));

const Logo = styled(Image)(({ theme }) => ({
  width: 300,
  height: 300,
}));

export default function AboutUs() {
  const images = [
    require("../../../../assets/image_00001.jpeg").default,
    require("../../../../assets/image_00002.jpeg").default,
    require("../../../../assets/image_00003.jpeg").default,
    require("../../../../assets/image_00004.jpeg").default,
    require("../../../../assets/image_00005.jpeg").default,
    require("../../../../assets/image_00006.jpeg").default,
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <ContainerStyled>
      <ImageStyled
        src={images[index]}
        fill
        style={{ objectFit: "cover" }}
        alt={"About Us Background Image"}
      />

      <LogoContainer elevation={2}>
        <Logo
          src={require("../../../../assets/logo.svg").default}
          alt="About Us Background"
        />
      </LogoContainer>
      {/* 
      <TextStyled>
        <Typography variant="h2" component="h2">
          Latin Quarter
          <br />
          Big Band
        </Typography>
        <Typography>
          <strong>Latin Quarter Big Band </strong>is a 20-piece ensemble led by
          bandleader <strong>Jaime Rodrigues</strong>, bringing the vibrant
          sounds of Latin jazz to life.
        </Typography>
        <Typography>
          With a powerful blend of South American rhythms and jazz
          improvisation, the band delivers an authentic and energetic musical
          experience that makes every performance unforgettable.
        </Typography>
      </TextStyled> */}
    </ContainerStyled>
  );
}
