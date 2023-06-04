import React, { FC, useEffect, useRef, useState } from "react";
import styled, { Interpolation } from "@emotion/styled";
import { FacadeGood } from "../../../app-types";
import { motion, AnimatePresence } from "framer-motion";
import { EmotionProps } from "../facade-good";

export type SelectOption<T extends any = any, J extends string = string> = {
  [key in J]?: key extends "label" ? number | string : any;
} & { label: string | number; value:any; } & T;

type FacadeGoodProps = {
  css?: Interpolation<any>;
  theme?: FacadeGood.CustomTheme;
  outline?: boolean;
};

const Container = styled("div")<FacadeGoodProps & { py?: number}>`
  position: relative;
  width: 100%;
  min-height: 1.5em;
  border: 0.05em solid
    ${({ theme, outline }) => (outline ? theme.colors.border : "none")};
  display: flex;
  align-items: center;
  gap: 0.5em;
  padding: 0.7em;
  padding-top: ${({ py }) =>  typeof py === "undefined" ? "0.7em" : `${py}em` };
  padding-bottom: ${({ py }) =>  typeof py === "undefined" ? "0.7em" : `${py}em` };
  border-radius: 0.25em;
  outline: none;
  box-sizing: border-box;
  cursor: pointer;
  &:hover {
    background-color: rgba(57, 76, 96, 0.02);
  }
  &:focus {
    border: 0.05em solid
      ${({ theme, outline }) => (outline ? theme.colors.white : "none")};
    outline: 2px solid
      ${({ theme, outline }) => (outline ? theme.colors.button.normal : theme.colors.button.normal)};
  }
`;

const Box = styled("div")<EmotionProps<HTMLDivElement>>``;

const Span = styled("span")<EmotionProps<HTMLSpanElement>>`
  flex-grow: 1;
  &.placeholder {
    color: #999;
    letter-spacing: 0.1em;
  }
`;

const Button = styled("button")<EmotionProps<HTMLButtonElement>>`
  background: none;
  border: none;
  outline: none;
  color: #777;
  cursor: pointer;
  padding: 0;
  font-size: 1em;
  &:focus,
  :hover {
    color: #333;
  }
`;

const List = styled(motion.ul)<EmotionProps<HTMLUListElement>>`
  position: absolute;
  margin: 0;
  padding: 0;
  list-style: none;
  display: block;
  max-height: 15em;
  overflow-y: auto;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0.25em;
  width: 100%;
  left: 0;
  top: calc(100% + 0.25em);
  background-color: white;
  z-index: 1000;
  ::-webkit-scrollbar {
    width: 7px;
  }
  ::-webkit-scrollbar-track {
    background-color: white;
  }
  ::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.bg3};
    border-radius: 6px;
    border: 2px solid white;
  }
`;

const ListItem = styled("li")<EmotionProps<HTMLLIElement>>`
  padding: 0.25em 0.5em;
  cursor: pointer;
  color: ${({ theme }) => theme.typography.cardParam.color};
  &.highlighted {
    background-color: rgba(57, 76, 96, 0.04);
  }
  &.selected {
    background-color: ${({ theme }) => theme.colors.button.active};
    color: white;
  }
`;



interface SelectProps extends FacadeGoodProps {
  value?: SelectOption;
  onChange?: (value?: SelectOption) => void;
  options: SelectOption[];
  placeholder?: string;
  py?: number;
}

const Select: FC<SelectProps> = ({
  value,
  onChange,
  options = [],
  placeholder,
  py,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  function clearOption() {
    if (typeof onChange === "function") {
      onChange(undefined);
    }
  }

  function selectOption(option: SelectOption) {
    if (option !== value && typeof onChange === "function") {
      onChange(option);
    }
  }

  function isOptionSelected(option: SelectOption) {
    return option === value;
  }

  useEffect(() => {
    if (isOpen) {
      setHighlightedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      e.preventDefault();

      if (e.target != containerRef.current) {
        return;
      }

      switch (e.code) {
        case "Delete":
          clearOption();
          break;

        case "Enter":
        case "Space":
          setIsOpen((prev) => !prev);
          if (isOpen) {
            selectOption(options[highlightedIndex]);
          }
          break;
        case "ArrowUp":
        case "ArrowDown":
          if (!isOpen) {
            setIsOpen(true);
            break;
          }
          const newValue = highlightedIndex + (e.code === "ArrowDown" ? 1 : -1);

          if (newValue >= 0 && newValue < options.length) {
            setHighlightedIndex(newValue);
          } else if (newValue < 0) {
            setHighlightedIndex(options.length - 1);
          } else {
            setHighlightedIndex(0);
          }
          break;
        default:
          break;
      }
    };
    containerRef.current?.addEventListener("keydown", handler);
    return () => containerRef.current?.removeEventListener("keydown", handler);
  }, [isOpen, highlightedIndex, options]);

  return (
    <Container
      {...props}
      ref={containerRef}
      tabIndex={0}
      onBlur={() => setIsOpen(false)}
      onClick={() => setIsOpen((prev) => !prev)}
      py={py}
      css={[{}, ...(Array.isArray(props.css) ? props.css : [props.css])]}
    >
      <Span className={
        `${!value && placeholder ? "placeholder" : ""}`}>
        {value
          ? `${placeholder ? placeholder + ": " : ""}${value.label}`
          : placeholder
          ? placeholder
          : ""
        }
      </Span>
      <Button
        hidden={!value}
        onClick={(e) => {
          e.stopPropagation();
          clearOption();
        }}
      >
        &times;
      </Button>
      <Box
        css={(theme) => ({
          backgroundColor: theme.colors.border,
          width: "0.05em",
          alignSelf: "stretch",
        })}
      ></Box>

      <Box
        css={{
          translate: "0 25%",
          border: "0.25em solid transparent",
          borderTopColor: "#777",
        }}
      ></Box>
      
      <AnimatePresence>
        {isOpen && (
          <List
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.1 }}
          >
            {(options || []).map((option, index) => (
              <ListItem
                onClick={(e) => {
                  e.stopPropagation();
                  selectOption(option);
                  setIsOpen(false);
                }}
                key={option.label}
                onMouseEnter={() => setHighlightedIndex(index)}
                className={`${isOptionSelected(option) ? "selected" : ""} ${
                  index === highlightedIndex ? "highlighted" : ""
                }`}
              >
                {option.label}
              </ListItem>
            ))}
          </List>
        )}
      </AnimatePresence>
    </Container>
  );
};

export default Select;


