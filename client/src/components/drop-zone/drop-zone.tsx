import React from "react";
import styled from "@emotion/styled";
import { useDropzone, FileWithPath } from "react-dropzone";
import { Box, EmotionProps } from "../facade-good/facade-good";
import DropZoneBground from "./drop-zone-bground";

const Container = styled(Box)`
  position: relative;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  height: 100%;
  background: "none";
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TextBox = styled(Box)`
  font-size: 1.1em;
  font-weight: 400;
  color: ${({ theme }) => theme.typography.cardName.color};
`;

interface Props extends EmotionProps<HTMLDivElement> {
  fontSize?: string | number;
  bground?: React.ReactNode | null;
  text?: React.ReactNode;
  multiple?: boolean;
  setFiles?: (files: FileWithPath[]) => void;
  files?: FileWithPath[];
}
const DropZone: React.FC<Props> = ({
  fontSize,
  setFiles,
  files = [],
  multiple,
  bground,
  text,
  css,
  ...props
}) => {
  const filesHandler = (files: FileWithPath[]) => {
    setFiles && setFiles(files);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: filesHandler,
    multiple,
  });

  return (
    <Container
      css={[{}, ...(Array.isArray(css) ? css : [css])]}
      {...props}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      {bground !== null &&
        (typeof bground !== "undefined" ? (
          bground
        ) : (
          <DropZoneBground files={files} fontSize={fontSize} />
        ))}
      {!files.length && text && <TextBox>{text}</TextBox>}
    </Container>
  );
};

export default DropZone;
