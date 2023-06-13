import styled from "@emotion/styled";
import React, { useState } from "react";
import { useDropzone, FileWithPath } from "react-dropzone";
import { Box, Button, EmotionProps } from "../facade-good";

const DropZone = styled("div")<EmotionProps<HTMLDivElement>>`
  min-height: 5em;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(57, 76, 96, 0.04);
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  &.active {
    background-color: rgba(57, 76, 96, 0.01);
  }
  & p {
    padding-left: 16px;
    padding-right: 16px;
    text-align: center;
  }
`;

const FileBox = styled("div")<EmotionProps<HTMLDivElement>>`
  position: relative;
  display: flex;
  min-height: 3.5em;
  flex-direction: row;
  justify-content: flex-start;
  align-items: start;
  flex-wrap: wrap;
  gap: 16px;
  padding: 16px;

  & div {
    flex: 1;
    border: 1px solid ${({ theme }) => theme.colors.border};
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.04);
    border-radius: 10px;
    padding: 8px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    max-width: 10em;
    background-color: rgba(0, 0, 0, 0.02);
  }

  & button {
    cursor: pointer;
    position: absolute;
    top: 8;
    right: 8;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 1px solid ${({ theme }) => theme.colors.border};
    font-size: 1.3em;
    color: #999;
    &:hover {
      background-color: rgba(0, 0, 0, 0.04);
    }
  }

  .file-sticker {
    p {
      &:first-of-type {
        color: ${({ theme }) => theme.typography.cardPrice.color};
        font-weight: ${({ theme }) => theme.typography.cardPrice.fontWeight};
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      &:last-child {
        color: ${({ theme }) => theme.typography.cardParam.color};
        font-size: 0.7em;
      }
    }
  }
`;

interface FileDropzoneProps {
  onDrop: (files: FileWithPath[]) => void;
  files: FileWithPath[];
  placeholder?: string;
  multiple?: boolean;
}

const FileDropzone: React.FC<FileDropzoneProps> = ({
  onDrop,
  files,
  placeholder,
  multiple,
}) => {
  const [droppedFiles, setDroppedFiles] = useState<FileWithPath[]>([]);

  const handleDrop = (acceptedFiles: FileWithPath[]) => {
    setDroppedFiles(acceptedFiles);
    onDrop(acceptedFiles);
  };

  const handleClear = () => {
    setDroppedFiles([]);
    onDrop([]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    multiple: Boolean(multiple),
  });

  return (
    <div>
      <DropZone
        {...getRootProps()}
        className={`dropzone ${isDragActive ? "active" : ""}`}
      >
        <input {...getInputProps()} />
        <p>
          {placeholder
            ? placeholder
            : "Перетащите файлы сюда или нажмите для выбора файла."}{" "}
        </p>
      </DropZone>

      <FileBox className="file-stickers">
        {files?.map((file) => (
          <div key={file.name} className="file-sticker">
            <p>{file.name}</p>
            <p>{`${(file.size / (1024 * 1024)).toFixed(2)} Mb`}</p>
          </div>
        ))}

        <Button
          hidden={!files?.length}
          onClick={() => handleClear()}
          css={{
            top: 8,
            right: 8,
            zIndex: 100,
          }}
        >
          &times;
        </Button>
      </FileBox>
    </div>
  );
};

export default FileDropzone;
