import { FacadeGood } from "./app-types";

export const getTheme = (): FacadeGood.CustomTheme => {
  const breakpoints = ["20em", "40em", "52em", "64em"];

  const fontFamily = {
    display: "Abril Fatface, serif",
    body: "Rubik, sans-serif",
  };

  const container_width = 1200;
  const containerPadding = 15;

  const bannerSize = 70;

  const galleryImageSize = 300;

  const colors = {
    primary: "#1D2E40",
    secondary: "#F1B84A",
    cardTextPrimary: "#394C60",
    cardTextSecondary: "#4D4D4D",
    footerText: "#B9B9B9",
    buttonText: "#1C1F23",
    warning: "#FFC107",
    error: "#FF5252",
    info: "#2196F3",
    white: "#FFFFFF",
    black: "#000000",
    button: {
      normal: "#FFB421",
      hover: "#F1B84A",
      active: "#FBC55D",
    },
    bg0: "#161B20",
    bg1: "#394C60",
    bg2: "#919191",
    border: "#DEDEDE",
  };

  const loneHeight = {
    sm: 1.25,
    md: 1.5,
    lg: 1.7,
  };

  const letterSpacing = {
    sm: "-0.01em",
    md: "0.083em",
    lg: "0.125em",
  };

  const fontWeight = {
    xs: 200,
    sm: 300,
    md: 400,
    lg: 500,
    xl: 600,
    xl2: 700,
    xl3: 800,
    xl4: 900,
  };

  return {
    colors,
    fontFamily,
    fontWeight,
    loneHeight,
    letterSpacing,
    shadow: {},
    breakpoints,
    mq: {
      small: `@media (min-width: ${breakpoints[0]})`,
      tablet: `@media (min-width: ${breakpoints[1]})`,
      desktop: `@media (min-width: ${breakpoints[2]})`,
      largeDesktop: `@media (min-width: ${breakpoints[3]})`,
    },
    typography: {
      heading: {
        fontFamily: fontFamily.display,
        fontStyle: "normal",
        fontWeight: fontWeight.md,
        fontSize: "90px",
        lineHeight: "121px",
        color: colors.white,
      },
      heading2: {
        fontFamily: fontFamily.body,
        fontStyle: "normal",
        fontWeight: fontWeight.md,
        fontSize: "32px",
        lineHeight: "38px",
        color: colors.white,
      },
      logo: {
        fontFamily: fontFamily.body,
        fontStyle: "normal",
        fontWeight: fontWeight.md,
        fontSize: "24px",
        lineHeight: "28px",
        color: colors.secondary,
      },
      hederMenu: {
        fontFamily: fontFamily.body,
        fontStyle: "normal",
        fontWeight: fontWeight.sm,
        fontSize: "15px",
        lineHeight: "18px",
        color: colors.white,
      },
      hederMenuActive: {
        fontFamily: fontFamily.body,
        fontStyle: "normal",
        fontWeight: fontWeight.sm,
        fontSize: "15px",
        lineHeight: "18px",
        color: colors.secondary,
      },
      headerBlockLight: {
        fontFamily: fontFamily.body,
        fontStyle: "normal",
        fontWeight: fontWeight.md,
        fontSize: 48,
        lineHeight: "57px",
        color: colors.primary,
      },
      headerBlockBlack: {
        fontFamily: fontFamily.body,
        fontStyle: "normal",
        fontWeight: fontWeight.md,
        fontSize: "48px",
        lineHeight: "57px",
        color: colors.white,
      },
      buttonText: {
        fontFamily: fontFamily.body,
        fontStyle: "normal",
        fontWeight: fontWeight.lg,
        fontSize: "16px",
        lineHeight: "143.5%",
        color: colors.buttonText,
      },

      cardDescription: {
        fontFamily: fontFamily.body,
        fontStyle: "normal",
        fontWeight: fontWeight.sm,
        fontSize: "16px",
        lineHeight: "143.5%",
        color: colors.cardTextSecondary,
      },
      cardName: {
        fontFamily: fontFamily.body,
        fontStyle: "normal",
        fontWeight: fontWeight.md,
        fontSize: "24px",
        lineHeight: "28px",
        color: colors.black,
      },
      cardParam: {
        fontFamily: fontFamily.body,
        fontStyle: "normal",
        fontWeight: fontWeight.md,
        fontSize: "15px",
        lineHeight: "143.5%",
        color: colors.cardTextSecondary,
      },
      cardPrice: {
        fontFamily: fontFamily.body,
        fontStyle: "normal",
        fontWeight: fontWeight.lg,
        fontSize: "18px",
        lineHeight: "143.5%",
        color: colors.cardTextPrimary,
      },
      cardButton: {
        fontFamily: fontFamily.body,
        fontStyle: "normal",
        fontWeight: fontWeight.md,
        fontSize: "16px",
        lineHeight: "22.96px",
        color: colors.cardTextPrimary,
      },
    },
    container: {
      maxWidth: `${container_width + containerPadding * 2}px`, //Контейнер + отступы,
      paddingLeft: `${containerPadding}px`,
      paddingRight: `${containerPadding}px`,
      marginLeft: "auto",
      marginRight: "auto",
      container_width,
    },
    bannerSize,
    galleryImageSize,
  };
};

const theme = getTheme();
export default theme;
