import React, { FC, useEffect, useState } from "react";
import { Row, Td } from "../facade-good/form-components/table";
import { SelectOption } from "../facade-good/form-components/select";
import Textbox from "../facade-good/form-components/textbox";
import styled from "@emotion/styled";
import { Box, EmotionProps } from "../facade-good/facade-good";
import { Order } from "./order-form-provider";
import useDebounce from "../facade-good/hooks/use-debounce";

import ReactSelect from "react-select";

const customNoOptionsMessage = () => "Пусто";

const customStyles = {
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isFocused ? "rgba(57, 76, 96, 0.04)" : "white",
    color: "rgba(57, 76, 96, 1)",
    ":hover": {
      backgroundColor: "rgba(57, 76, 96, 0.04)",
    },
  }),
  control: (baseStyles: any, state: any) => {
    baseStyles["&:hover"] = {
      borderColor: "none",
    };
    return {
      ...baseStyles,
      outline: state.isFocused
        ? `2px solid #FFB421 !important`
        : "0 !important",
      border: "none",
      // borderColor: state.isFocused ? "hsl(0, 0%, 90%)" : "hsl(0, 0%, 80%)",
      backgroundColor: state.isFocused ? "rgba(57, 76, 96, 0.02)" : "white",
      minHeight: 27.5,
      height: "100%",
      textAlign: "center",
    };
  },
  dropdownIndicator: (provided: any) => ({
    ...provided,
    transform: "translate(0, 25%)",
  }),
};

const Button = styled("button")<EmotionProps<HTMLButtonElement>>`
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

interface Props {
  facadeType?: SelectOption<Order.FacadeType>[];
  item: Order.Facade;
  onDelete: () => void;
  onChange?: (value: Order.Facade) => void;
}

const OrderDesktopTableFacadeRow: FC<Props> = ({
  facadeType = [],
  item,
  onDelete,
  onChange,
}) => {
  const [invalid, setInvalid] = useState<boolean>(false);
  const [value, setValue] = useState<Order.Facade>(item);
  const [typing, setTyping] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleClick = () => {
    // setIsFocused((prev) => !prev);
  };

  const handleChange = (data: Partial<Order.Facade>) => {
    setTyping(true);
    setValue((prev) => ({ ...prev, ...data }));
  };

  useEffect(() => {
    if (value.type?.value && !value.amount) {
      setInvalid(true);
    } else {
      setInvalid(false);
    }
  }, [value]);

  useDebounce(
    () => {
      if (typing) {
        if (typeof onChange === "function") {
          onChange(value);
        }
        setTyping(false);
      }
    },
    500,
    [value, onChange]
  );

  return (
    <Row className={isFocused ? "focused" : ""} onClick={handleClick}>
      <Td>
        <Textbox
          type="number"
          maxLength={4}
          value={value?.height}
          onChange={(v) => handleChange({ height: Number(v) })}
        />
      </Td>
      <Td>x</Td>
      <Td>
        <Textbox
          type="number"
          maxLength={4}
          value={value?.width}
          onChange={(v) => handleChange({ width: Number(v) })}
        />
      </Td>
      <Td>-</Td>
      <Td
        css={{
          backgroundColor: invalid ? `rgba(220, 20, 60, 0.07)` : "inherit",
        }}
      >
        <Textbox
          type="number"
          maxLength={4}
          value={value?.amount}
          onChange={(v) => handleChange({ amount: Number(v) })}
        />
      </Td>
      <Td>
        {/* <Select
          py={0.3}
          options={facadeType}
          value={value?.type}
          onChange={(v) => handleChange({ type: v })}
        /> */}
        <ReactSelect
          noOptionsMessage={customNoOptionsMessage}
          placeholder=""
          styles={customStyles}
          options={facadeType}
          value={value?.type}
          onChange={(v: any) => handleChange({ type: v })}
          components={{
            DropdownIndicator: () => (
              <Box
                css={{
                  translate: "0 25%",
                  border: "0.25em solid transparent",
                  borderTopColor: "#777",
                  marginRight: "10px", // Отступ справа
                  marginLeft: "10px", // Отступ слева
                }}
              />
            ),
          }}
        />
      </Td>
      <Td>
        <Textbox
          type="text"
          maxLength={120}
          value={value?.note}
          onChange={(v) => handleChange({ note: String(v) })}
        />
      </Td>
      <Td>
        <Button onClick={() => onDelete()}>&times;</Button>
      </Td>
    </Row>
  );
};

export default OrderDesktopTableFacadeRow;
