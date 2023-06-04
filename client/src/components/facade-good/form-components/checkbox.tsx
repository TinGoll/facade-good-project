import React, { FC, useState } from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { FacadeGood } from "../../../app-types";
import { EmotionProps } from "../facade-good";

interface CheckboxProps {
  label?: string;
  checked?: boolean;
  onChange?: (value: boolean) => void;
}

const Container = styled("div")<EmotionProps<HTMLDivElement>>`
  border: 0.05em solid ${({ theme }) => theme.colors.border};
  width: 100%;
  padding: 0.5em;
  border-radius: 0.25em;
  outline: none;
  padding: 0.7em;
  box-sizing: border-box;
  &:focus-within {
    border: 0.05em solid white;
    outline: 2px solid ${({ theme }) => theme.colors.button.normal};
  }
  label {
    display: flex;
    align-items: center;
    cursor: pointer;
    user-select: none;
    color: ${({ theme }) => theme.typography.cardParam.color};
    font-weight: 300;
  }

  input[type="checkbox"] {
    margin-right: 8px;
    cursor: pointer;
    height: 18px;
    width: 18px;
    background-color: #999;
    border: 0.05em solid ${({ theme }) => theme.colors.border};
    border-radius: 15%;
  }
`;

const Checkbox: FC<CheckboxProps> = ({
  label,
  checked: initialChecked,
  onChange,
}) => {
  const [checked, setChecked] = useState(initialChecked);
  const handleCheckboxChange = (event: any) => {
    const newChecked = event.target.checked;
    setChecked(newChecked);
    if (onChange && typeof onChange === "function") {
      onChange(newChecked);
    }
  };
  return (
    <Container>
      <label>
        <input
          type="checkbox"
          checked={checked}
          onChange={handleCheckboxChange}
        />
        {label}
      </label>
    </Container>
  );
};

export default Checkbox;
