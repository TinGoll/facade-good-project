import React from "react";
import { ThemeProvider } from "@emotion/react";
import theme from "../theme";

interface AppLayoutProps {
  children?: React.ReactNode;
}
const AppLayout = ({ children }: AppLayoutProps) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default AppLayout;
