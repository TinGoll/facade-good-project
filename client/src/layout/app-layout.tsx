import React from "react";
import { ThemeProvider } from "@emotion/react";
import theme from "../theme";
import { ImageModal } from "../components/modals";

interface AppLayoutProps {
  children?: React.ReactNode;
}
const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <ThemeProvider theme={theme}>
      {children}
      <ImageModal />
    </ThemeProvider>
  );
};

export default AppLayout;
