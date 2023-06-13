import styled from "@emotion/styled";
import React, { FC } from "react";
import { EmotionProps } from "../facade-good";

const Container = styled("div")<EmotionProps<HTMLDivElement>>`
  display: flex;
  flex-direction: column;
  & div {
    padding: 8px;
    padding-left: 16px;
    background-color: rgba(57, 76, 96, 0.05);
    font-weight: ${({ theme }) => theme.typography.cardPrice.fontWeight};
    color: ${({ theme }) => theme.typography.cardPrice.color};
    font-size: ${({ theme }) => theme.typography.cardPrice.fontSize};
    border-bottom: 0.05em solid ${({ theme }) => theme.colors.border};
  }
  & button {
    background: inherit;
    border: none;
    padding: 8px;
    padding-left: 24px;
    text-align: left;
    :hover {
      background-color: rgba(57, 76, 96, 0.02);
      padding-left: 28px;
    }
    :active {
      background-color: rgba(57, 76, 96, 0.05);
    }
    font-weight: ${({ theme }) => theme.typography.cardPrice.fontWeight};
    color: ${({ theme }) => theme.typography.cardPrice.color};
    font-size: 1em;
  }

  & button:not(:last-child) {
    border-bottom: 0.05em solid ${({ theme }) => theme.colors.border};
  }

  & .act {
    background-color: ${({ theme }) => theme.colors.secondary};
    padding-left: 28px;
    color: white;
    :hover {
      background-color: ${({ theme }) => theme.colors.secondary};
    }
  }
`;

export const List: FC<EmotionProps<HTMLDivElement>> = ({
  children,
  ...props
}) => {
  return <Container {...props}>{children}</Container>;
};

export const ListItem = styled("button")<EmotionProps<HTMLButtonElement>>``;
export const ListTitle = styled("div")<EmotionProps<HTMLButtonElement>>``;
