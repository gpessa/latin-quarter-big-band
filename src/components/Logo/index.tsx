"use client";
import { BREAKPOINT } from "@/theme";
import { styled } from "@mui/material/styles";
import Image from "next/image";

const ImageStyled = styled(Image)(({ theme }) => ({
  alignSelf: "center",
  width: 150,
  height: 150,
  [theme.breakpoints.up(BREAKPOINT)]: {
    width: 200,
    height: 200,
  },
}));

const Logo = () => (
  <ImageStyled
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    src={require("../../assets/logo.svg").default}
    alt="About Us Background"
  />
);

export default Logo;
