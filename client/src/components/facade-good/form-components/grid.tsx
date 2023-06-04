import styled from "@emotion/styled";
import { EmotionProps } from "../facade-good";

const Grid = styled("div")<EmotionProps<HTMLDivElement> & { columns: number; gap?: number }>`
  display: grid;
  grid-template-columns: ${({ columns }) => `repeat(${columns}, 1fr)`};
  gap: ${({ gap }) => `${typeof gap === "undefined" ? 0 : gap}px`};
  box-sizing: border-box;

  @media (max-width: 820px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export { Grid };