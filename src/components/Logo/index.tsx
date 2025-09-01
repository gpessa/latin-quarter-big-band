"use client";
import { BREAKPOINT } from "@/theme";
import { styled } from "@mui/material/styles";
import Image from "next/image";

const ImageStyled = styled(Image)(({ theme }) => ({
  width: 150,
  height: 150,
  [theme.breakpoints.up(BREAKPOINT)]: {
    width: 300,
    height: 300,
  },
}));

const Logo = () => {
  return (
    <ImageStyled
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      src={require("../../assets/logo.svg").default}
      alt="About Us Background"
    />
  );
};

export default Logo;
