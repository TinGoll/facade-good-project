import styled from "@emotion/styled";
import React, { FC, useRef, useEffect, useState, useCallback } from "react";
import { EmotionProps } from "../facade-good";
import useDebounce from "../hooks/use-debounce";

const Container = styled("div")<
  EmotionProps<HTMLDivElement> & { outline?: boolean }
>`
  position: relative;
  width: 100%;
  min-height: 1.5em;
  border: 0.05em solid
    ${({ theme, outline }) => (outline ? theme.colors.border : "none")};
  display: flex;
  align-items: center;
  padding: 0.5em;
  border-radius: 0.25em;
  outline: none;
  box-sizing: border-box;
  &:focus-within {
    border: 0.05em solid
      ${({ theme, outline }) => (outline ? theme.colors.white : "none")};
    outline: 2px solid
      ${({ theme, outline }) =>
        outline ? theme.colors.button.normal : theme.colors.button.normal};
  }
  textarea {
    background-color: inherit;
    width: 100%;
    min-height: 1.7em;
    margin: 0;
    border: none;
    outline: none;
    resize: none;
    font-weight: 300;
    color: ${({ theme }) => theme.typography.cardParam.color};
    box-sizing: border-box;
    overflow: auto;
    overflow-x: hidden;
    height: auto;
    max-height: 5em;

    &::before,
    &::after {
      content: "";
      height: 1.5em;
      display: block;
    }

    /* Стили для полосы прокрутки */
    scrollbar-width: thin;
    scrollbar-color: ${({ theme }) => theme.colors.bg2};
    &::-webkit-scrollbar {
      width: 6px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: ${({ theme }) => theme.colors.bg2};
      border-radius: 4px;
    }
    &::-webkit-scrollbar-track {
      background-color: transparent;
    }
  }
`;

const Textarea: FC<
  EmotionProps<HTMLTextAreaElement> & {
    outline?: boolean;
    placeholder?: string;
    setNote?: (value: string) => void;
  }
> = ({ outline, placeholder, setNote, ...props }) => {
  const [value, setValue] = useState("");
  const [typing, setTyping] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    adjustTextareaHeight();
  }, [value]);

  const adjustTextareaHeight = () => {
    const textareaElement = textareaRef.current;
    if (textareaElement) {
      textareaElement.style.height = "auto";
      textareaElement.style.height = `${textareaElement.scrollHeight}px`;
    }
  };

  const handleTextareaChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setValue(event.target.value);
      setTyping(true);
    },
    []
  );

  useDebounce(
    () => {
      if (typing) {
        if (typeof setNote === "function") {
          setNote(value);
        }
        setTyping(false);
      }
    },
    1000,
    [value, setNote]
  );

  return (
    <Container outline={outline}>
      <textarea
        ref={textareaRef}
        placeholder={placeholder}
        onChange={handleTextareaChange}
        maxLength={500}
        value={value}
        {...props}
      />
    </Container>
  );
};

export default Textarea;
