import { Theme } from "@emotion/react";

declare module FacadeGood {
  export interface Button {
    normal: string;
    hover: string;
    active: string;
  }

  export interface Colors {
    primary: string;
    secondary: string;
    cardTextPrimary: string;
    cardTextSecondary: string;
    footerText: string;
    buttonText: string;
    warning: string;
    danger: string;
    error: string;
    info: string;
    success: string;
    link: string;
    grey: string;
    white: string;
    black: string;
    button: Button;
    bg0: string;
    bg1: string;
    bg2: string;
    bg3: string;
    border: string;
    listSelected: string;
    listHighlighted: string;
  }

  export interface FontFamily {
    display: string;
    body: string;
  }

  export interface FontWeight {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xl2: number;
    xl3: number;
    xl4: number;
  }

  export interface LoneHeight {
    sm: number;
    md: number;
    lg: number;
  }

  export interface LetterSpacing {
    sm: string;
    md: string;
    lg: string;
  }

  export interface Shadow {}

  export interface Mq {
    small: string;
    tablet: string;
    desktop: string;
    largeDesktop: string;
  }

  export interface Heading {
    fontFamily: string;
    fontStyle: string;
    fontWeight: number;
    fontSize: string;
    lineHeight: string;
    color: string;
  }

  export interface Heading2 {
    fontFamily: string;
    fontStyle: string;
    fontWeight: number;
    fontSize: string;
    lineHeight: string;
    color: string;
  }

  export interface Logo {
    fontFamily: string;
    fontStyle: string;
    fontWeight: number;
    fontSize: string;
    lineHeight: string;
    color: string;
  }

  export interface HederMenu {
    fontFamily: string;
    fontStyle: string;
    fontWeight: number;
    fontSize: string;
    lineHeight: string;
    color: string;
  }

  export interface HederMenuActive {
    fontFamily: string;
    fontStyle: string;
    fontWeight: number;
    fontSize: string;
    lineHeight: string;
    color: string;
  }

  export interface HeaderBlockLight {
    fontFamily: string;
    fontStyle: string;
    fontWeight: number;
    fontSize: string | number;
    lineHeight: string;
    color: string;
  }

  export interface HeaderBlockBlack {
    fontFamily: string;
    fontStyle: string;
    fontWeight: number;
    fontSize: string;
    lineHeight: string;
    color: string;
  }

  export interface ButtonText {
    fontFamily: string;
    fontStyle: string;
    fontWeight: number;
    fontSize: string;
    lineHeight: string;
    color: string;
  }

  export interface CardDescription {
    fontFamily: string;
    fontStyle: string;
    fontWeight: number;
    fontSize: string;
    lineHeight: string;
    color: string;
  }

  export interface CardName {
    fontFamily: string;
    fontStyle: string;
    fontWeight: number;
    fontSize: string;
    lineHeight: string;
    color: string;
  }

  export interface CardParam {
    fontFamily: string;
    fontStyle: string;
    fontWeight: number;
    fontSize: string;
    lineHeight: string;
    color: string;
  }

  export interface CardPrice {
    fontFamily: string;
    fontStyle: string;
    fontWeight: number;
    fontSize: string;
    lineHeight: string;
    color: string;
  }

  export interface CardButton {
    fontFamily: string;
    fontStyle: string;
    fontWeight: number;
    fontSize: string;
    lineHeight: string;
    color: string;
  }

  export interface Typography {
    heading: Heading;
    heading2: Heading2;
    logo: Logo;
    hederMenu: HederMenu;
    hederMenuActive: HederMenuActive;
    headerBlockLight: HeaderBlockLight;
    headerBlockBlack: HeaderBlockBlack;
    buttonText: ButtonText;
    cardDescription: CardDescription;
    cardName: CardName;
    cardParam: CardParam;
    cardPrice: CardPrice;
    cardButton: CardButton;
  }

  export interface Container {
    maxWidth: string | number;
    paddingLeft: string | number;
    paddingRight: string | number;
    marginLeft: string | number;
    marginRight: string | number;
    container_width: number;
  }

  export interface CustomTheme extends Theme {
    colors: Colors;
    fontFamily: FontFamily;
    fontWeight: FontWeight;
    loneHeight: LoneHeight;
    letterSpacing: LetterSpacing;
    shadow: Shadow;
    breakpoints: string[];
    mq: Mq;
    typography: Typography;
    container: Container;
    bannerSize: number;
    galleryImageSize: number;
  }
}
