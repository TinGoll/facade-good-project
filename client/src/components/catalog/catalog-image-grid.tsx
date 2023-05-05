import React from "react";

import { Box } from "../facade-good/facade-good";
import styled from "@emotion/styled";

export const CatalogImageGrid = styled(Box)((props) => ({
  position: "relative",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  flexWrap: "wrap",
  gap: 20,
  ["@media (min-width: 1260px)"]: {
    gap: 80,
  },
  marginTop: 20,
  marginBottom: 20,
}));

export const CatalogImageWrapper = styled(Box)((props) => ({
  width: 345,
  height: 656,
}));
