import styled from "@emotion/styled";
import { EmotionProps } from "../facade-good";

const Table = styled("table")<EmotionProps<HTMLTableElement>>`
  width: 100%;
  border-collapse: collapse;
`;
const THead = styled("thead")<EmotionProps<HTMLTableElement>>`
  & tr {
    background-color: rgba(57, 76, 96, 0.05);
  }
`;
const TBody = styled("tbody")<EmotionProps<HTMLTableElement>>`
  & tr {
    border-top: 1px solid ${({ theme }) => theme.colors.border};
  }
  & tr:hover {
    background-color: rgba(57, 76, 96, 0.05);
  }
`;
const Row = styled("tr")<EmotionProps<HTMLTableElement>>`
  & th:not(:last-child) {
    border-right: 1px solid ${({ theme }) => theme.colors.border};
  }
  & th {
    padding-top: 8px;
    padding-bottom: 8px;
    text-align: center;
    color: ${({ theme }) => theme.typography.headerBlockLight.color};
  }
  &.focused {
    background-color: rgba(57, 76, 96, 0.02);
  }

  & td {
    text-align: center;
  }
  & td:not(:last-child) {
    border-right: 1px solid ${({ theme }) => theme.colors.border};
  }
`;
const Th = styled("th")<EmotionProps<HTMLTableElement>>``;
const Td = styled("td")<EmotionProps<HTMLTableElement>>``;

const TableButton = styled("button")<EmotionProps<HTMLButtonElement>>`
  background: none;
  border: none;
  outline: none;
  color: #777;
  cursor: pointer;
  padding: 0;
  font-size: 1.25em;
  width: 100%;
  height: 100%;
  &:focus,
  :hover {
    color: #333;
  }
`;

export { Table, THead, TBody, Row, Th, Td, TableButton };
