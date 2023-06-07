import styled from "@emotion/styled";
import React, { FC } from "react";
import { EmotionProps } from "../facade-good";

const Container = styled("div")<EmotionProps<HTMLDivElement> & {outline?: boolean, type?: "text" | "number" | "tel", fontsize?: number, p?: number, error?:boolean}>`
  position: relative;
  width: 100%;
  min-height: 1.7em;
  border: 0.05em solid ${({ theme, outline, error  }) => outline ? error ? theme.colors.danger : theme.colors.border : "none"};
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
      ${({ theme, outline, error }) => (outline ? error ? theme.colors.danger : theme.colors.button.normal : theme.colors.button.normal)};
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
    font-size: ${({ fontsize }) => fontsize ? `${fontsize}px` : "1em"};
    padding: ${({p}) => p ? `${p}px` : 0};
  }
  input[type="tel"] {
    background-color: inherit;
    height: 100%;
    width: 100%;
    margin: 0;
    border: none;
    outline: none;
    font-weight: 300;
    color: ${({ theme }) => theme.typography.cardParam.color};
    box-sizing: border-box;
    font-size: ${({ fontsize }) => fontsize ? `${fontsize}px` : "1em"};
    padding: ${({p}) => p ? `${p}px` : 0};
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
    font-size: ${({ fontsize }) => fontsize ? `${fontsize}px` : "1em"};
    padding: ${({p}) => p ? `${p}px` : 0};
  }
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
`;

const Textbox: 
  FC<EmotionProps<HTMLDivElement> & 
  {outline?: boolean, type?: "text" | "number" | "tel", 
  fontsize?: number,
  placeholder?: string, maxLength?: number, 
  value?: string | number, 
  p?:number,
  error?:boolean,
  onChange?: (value: string | number) => void}> = 
    ({ 
      placeholder, 
      value, 
      outline, 
      type, 
      maxLength, 
      fontsize,
      p,
      error,
      onChange = () => null, 
      ...props
    }) => {
  return (
    <Container error={error} p={p} fontsize={fontsize} outline={outline} type={type}>
      <input 
        type={type ? type : "text"} 
        placeholder={placeholder} 
        maxLength={200} 
        value={value || ""}  
        onChange={(event) => onChange(event.target.value)}  
      />
    </Container>
  );
};

export default Textbox;
