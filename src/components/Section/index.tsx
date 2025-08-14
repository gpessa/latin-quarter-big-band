"use client";

import { Container, ContainerProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import { BREAKPOINT } from "@/theme";

const DIMENSION_CONFIGURATION = {
  horizontal: {
    height: "100%",
    width: "50%",
  },
  vertical: {
    height: 530,
    width: "100%",
  },
};

type Props = {
  id?: string;
  className?: string;
  disableGutters?: boolean;
  type?: "vertical" | "horizontal";
  color?: "primary" | "secondary";
  spacing?: "small" | "medium" | "big" | "menu";
  textAlign?: "center" | "justify";
} & Pick<ContainerProps, "maxWidth" | "children" | "sx">;

const SectionStyled = styled(Container)<Props>(
  ({ theme, spacing = "medium", color, type }) => {
    const getSpacing = (breakingPoint: "xs" | "md") => {
      return (spacing: "small" | "medium" | "big" | "menu") => {
        const CONFIGURATION = new Map();

        CONFIGURATION.set("xs", {
          big: 10,
          medium: 8,
          menu: 13,
          small: 3, // 130px
        });

        CONFIGURATION.set("md", {
          big: 20,
          medium: 13,
          menu: 30,
          small: 4,
        });

        const value = CONFIGURATION.get(breakingPoint)[spacing];
        return theme.spacing(value);
      };
    };

    return {
      "&:before": {
        backgroundColor: color && color,
        backgroundSize: "cover",
        content: "''",
        height: "100%",
        position: "absolute",
        right: 0,
        top: 0,
        width: "100%",
        zIndex: -1,
        [theme.breakpoints.up(BREAKPOINT)]: {
          height: type ? DIMENSION_CONFIGURATION[type].height : "100%",
          width: type ? DIMENSION_CONFIGURATION[type].width : "100%",
        },
      },
      overflow: "hidden",
      paddingBottom: getSpacing("xs")(spacing),
      paddingTop: getSpacing("xs")(spacing),
      [theme.breakpoints.up(BREAKPOINT)]: {
        paddingBottom: getSpacing("md")(spacing),
        paddingTop: getSpacing("md")(spacing),
      },
      position: "relative",
    };
  }
);

const SectionStyledColored = styled(SectionStyled)<Props>(
  ({ theme, color }) =>
    color && {
      backgroundColor: theme.palette[color].dark,
      color: theme.palette[color].contrastText,
    }
);

const StyledContainer = styled(Container, {
  shouldForwardProp: (props) => props !== "textAlign",
})<{
  textAlign?: "center" | "justify";
}>(({ textAlign }) => ({
  position: "relative",
  textAlign,
}));

const Section: React.FC<Props> = ({ maxWidth, textAlign, ...props }) => (
  <SectionStyledColored {...props} maxWidth={false}>
    <StyledContainer disableGutters {...{ maxWidth, textAlign }}>
      {props.children}
    </StyledContainer>
  </SectionStyledColored>
);

export default Section;
