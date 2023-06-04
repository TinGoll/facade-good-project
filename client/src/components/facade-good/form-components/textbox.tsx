import styled from "@emotion/styled";
import React, { FC } from "react";
import { EmotionProps } from "../facade-good";

const Container = styled("div")<EmotionProps<HTMLDivElement> & {outline?: boolean, type?: "text" | "number"}>`
  position: relative;
  width: 100%;
  min-height: 1.7em;
  border: 0.05em solid ${({ theme, outline  }) => outline ? theme.colors.border : "none"};
  display: flex;
  align-items: center;
  padding-left: 0.5em;
  padding-right: 0.5em;
  border-radius: 0.25em;
  outline: none;
  box-sizing: border-box;
  &:focus-within {
    border: 0.05em solid
      ${({ theme, outline }) => (outline ? theme.colors.white : "none")};
    outline: 2px solid
      ${({ theme, outline }) => (outline ? theme.colors.button.normal : theme.colors.button.normal)};
  }
  input[type="text"] {
    background-color: inherit;
    height: 100%;
    width: 100%;
    margin: 0;
    border: none;
    outline: none;
    font-weight: 300;
    color: ${({ theme }) => theme.typography.cardParam.color};
    box-sizing: border-box;
  }
  input[type="number"] {
    background-color: inherit;
    height: 100%;
    width: 100%;
    margin: 0;
    border: none;
    outline: none;
    font-weight: 300;
    color: ${({ theme }) => theme.typography.cardParam.color};
    text-align: center;
    box-sizing: border-box;
  }
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
`;

const Textbox: 
  FC<EmotionProps<HTMLDivElement> & 
  {outline?: boolean, type?: "text" | "number", 
  placeholder?: string, maxLength?: number, 
  value?: string | number, 
  onChange?: (value: string | number) => void}> = 
    ({ 
      outline, 
      type, 
      placeholder, 
      maxLength, 
      value, 
      onChange = () => null, 
      ...props
    }) => {
  return (
    <Container outline={outline} type={type}>
      <input 
        type={type ? type : "text"} 
        placeholder={placeholder} 
        maxLength={120} 
        value={value || ""}  
        onChange={(event) => onChange(event.target.value)}  
      />
    </Container>
  );
};

export default Textbox;
