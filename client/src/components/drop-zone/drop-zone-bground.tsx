import React from "react";
import { Box } from "../facade-good/facade-good";
import CloudIcon from "../../assets/icons/CloudIcon";
import styled from "@emotion/styled";
import FileIcon from "../../assets/icons/FileIcon";
import { FileWithPath } from "react-dropzone";

const truncateText = (text: string, maxLength: number) => {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + "...";
  }
  return text;
};

const Container = styled(Box)`
  cursor: grab;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  background: rgba(256, 256, 256, 0.4);
  flex: 1;
  width: 100%;
  font-size: 3em;
  &:hover {
    svg {
      fill: rgba(251, 197, 93, 0.8);
    }
  }
  svg {
    fill: rgba(0, 0, 0, 0.3);
  }
`;

const FilesContainer = styled(Box)`
  position: relative;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 4px;
  align-items: center;
  justify-content: center;
  p {
    font-size: 11px;
  }
  svg {
    fill: ${({ theme }) => theme.colors.success};
  }
`;

interface Props {
  files?: FileWithPath[];
  fontSize?: string | number;
}

const dropZoneBground: React.FC<Props> = ({ files = [], fontSize }) => {
  return (
    <Container css={{ fontSize: fontSize }}>
      {!files.length ? (
        <CloudIcon />
      ) : (
        files.map((file) => (
          <FilesContainer key={file.path}>
            <FileIcon />
            <p>{truncateText(file.name, 16)}</p>
          </FilesContainer>
        ))
      )}
    </Container>
  );
};

export default dropZoneBground;
