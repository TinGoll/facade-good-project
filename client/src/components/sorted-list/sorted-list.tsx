import React from "react";
import { MotionProps, Reorder } from "framer-motion";
import styled, { Interpolation } from "@emotion/styled";
import { FacadeGood } from "../../app-types";

const { Group } = Reorder;

interface ListProps extends MotionProps {
  css?: Interpolation<any>;
  theme?: FacadeGood.CustomTheme;
}

const List = styled(Group)<ListProps>();

interface Props<T> {
  css?: Interpolation<any>;
  axis?: "x" | "y";
  onReorder: (newOrder: T[]) => void;
  values: T[];
  children?: React.ReactNode;
}

function SortedList<T extends any = any>({
  css,
  children,
  ...props
}: Props<T>): React.ReactElement {
  return (
    <List
      css={[
        {
          position: "relative",
        },
        ...(Array.isArray(css) ? css : [css]),
      ]}
      {...props}
    >
      {children}
    </List>
  );
}

export default SortedList;
