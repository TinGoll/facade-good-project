import React, { useState } from "react";
import { ThemeProvider } from "@emotion/react";
import theme from "../theme";
import { ImageModal } from "../components/modals";

interface AppLayoutProps {
  children?: React.ReactNode;
}
const AppLayout = ({ children }: AppLayoutProps) => {
  const [open, setOpen] = useState<boolean>(true);
  return (
    <ThemeProvider theme={theme}>
      {children}
      <ImageModal />
    </ThemeProvider>
  );
};

export default AppLayout;
