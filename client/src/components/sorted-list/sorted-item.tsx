import React from "react";
import { Reorder, useDragControls } from "framer-motion";
import { ReorderIcon } from "./dragIcon";
import styled, { Interpolation } from "@emotion/styled";
import { FacadeGood } from "../../app-types";
import { Box } from "../facade-good/facade-good";

const { Item } = Reorder;

interface ListItemProps {
  css?: Interpolation<any>;
  theme?: FacadeGood.CustomTheme;
}

const ListItem = styled(Item)<ListItemProps>();

interface Props<T> {
  css?: Interpolation<any>;
  contentCss?: Interpolation<any>;
  id: string;
  value: T;
  children?: React.ReactNode;
}
function SortedItem<T extends any>({
  id,
  value,
  css,
  children,
  contentCss,
}: Props<T>): React.ReactElement {
  const dragControls = useDragControls();
  return (
    <ListItem
      value={value}
      id={id}
      whileDrag={{
        boxShadow: "4px 4px 8px 0px rgba(34, 60, 80, 0.1)",
        scale: 1.005,
      }}
      dragListener={false}
      dragControls={dragControls}
      css={(theme: FacadeGood.CustomTheme) => [
        {
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: 8,
          borderBottom: `1px solid ${theme.colors.border}`,
          // marginBottom: 6,
          // borderRadius: 6,
          userSelect: "none",
          background: theme.colors.white,
          padding: 6,
        },
        ...(Array.isArray(css) ? css : [css]),
      ]}
    >
      <ReorderIcon
        dragControls={dragControls}
        width={22}
        height={22}
        css={{
          cursor: "grab",
          flex: "0 0 auto",
        }}
      />
      <Box
        css={[
          { flex: 1 },
          ...(Array.isArray(contentCss) ? contentCss : [contentCss]),
        ]}
      >
        {children}
      </Box>
    </ListItem>
  );
}

export default SortedItem;
