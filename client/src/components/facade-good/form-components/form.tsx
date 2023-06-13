import styled from "@emotion/styled";
import { EmotionProps } from "../facade-good";

export const Form = styled("form")<EmotionProps<HTMLFormElement>>`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  padding: 16px;
  & div {

  }
`;
