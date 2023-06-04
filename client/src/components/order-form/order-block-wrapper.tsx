import styled from "@emotion/styled";
import React, { FC, ReactNode } from "react";
import { EmotionProps } from "../facade-good/facade-good";

const Container = styled("div")<EmotionProps<HTMLDivElement>>`
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.04);
  border-radius: 10px;
`;

interface Props extends EmotionProps<HTMLDivElement> {
  header?: ReactNode;
  footer?: ReactNode;
  children?: ReactNode;
}

const TableHeader = styled("div")<EmotionProps<HTMLDivElement>>`
  padding: 8px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const TableFooter = styled("div")<EmotionProps<HTMLDivElement>>`
  padding: 8px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const OrderBlockWrapper: FC<Props> = ({
  header,
  footer,
  children,
  css,
  ...props
}) => {
  return (
    <Container {...props} css={[{}, ...(Array.isArray(css) ? css : [css])]}>
      {header && <TableHeader>{header}</TableHeader>}
      {children}
      {footer && <TableFooter>{footer}</TableFooter>}
    </Container>
  );
};

export default OrderBlockWrapper;
