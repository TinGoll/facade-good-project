import React, { FC, useEffect, useState } from "react";
import Select, { SelectOption } from "../facade-good/form-components/select";
import { Row, Td } from "../facade-good/form-components/table";
import Textbox from "../facade-good/form-components/textbox";
import styled from "@emotion/styled";
import { Box, EmotionProps } from "../facade-good/facade-good";
import { Order } from "./order-form-provider";
import useDebounce from "../facade-good/hooks/use-debounce";

import ReactSelect from "react-select";

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

const Arrow = () => {
  return (
    <Box
      css={{
        translate: "0 25%",
        border: "0.25em solid transparent",
        borderTopColor: "#777",
        marginRight: "10px", // Отступ справа
        marginLeft: "10px", // Отступ слева
      }}
    />
  );
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
  accessorieType?: SelectOption[];
  accessorieModel?: SelectOption<Order.AccessorieModel>[];
  item: Order.Accessorie;
  onDelete: () => void;
  onChange?: (value: Order.Accessorie) => void;
}

const OrderDesktopTableAccessoriesRow: FC<Props> = ({
  accessorieModel = [],
  accessorieType = [],
  item,
  onDelete,
  onChange,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [invalid, setInvalid] = useState<boolean>(false);

  const [value, setValue] = useState<Order.Accessorie>(item);
  const [typing, setTyping] = useState(false);

  const [filteredAccessorie, setFilteredAccessorie] = useState<SelectOption[]>(
    []
  );

  const handleChange = (data: Partial<Order.Accessorie>) => {
    setTyping(true);
    setValue((prev) => ({ ...prev, ...data }));
  };

  const handleClick = () => {
    // setIsFocused((prev) => !prev);
  };

  useEffect(() => {
    if (value.type?.value && !value.amount) {
      setInvalid(true);
    } else {
      setInvalid(false);
    }
  }, [value]);

  useEffect(() => {
    if (accessorieModel.length && accessorieType.length && value.type) {
      setFilteredAccessorie(
        accessorieModel.filter((v) => v.group === value.type?.value)
      );
    } else {
      setFilteredAccessorie([]);
    }
  }, [accessorieModel, accessorieType, value]);

  useEffect(() => {
    if (!value.type?.value && value.model?.value) {
      setValue((prev) => ({ ...prev, model: undefined }));
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
        <ReactSelect
          noOptionsMessage={() => "Пусто"}
          placeholder=""
          styles={customStyles}
          options={accessorieType}
          onChange={(v: SelectOption) => handleChange({ type: v })}
          value={value?.type}
          components={{
            DropdownIndicator: Arrow,
          }}
        />
        {/* <Select
          py={0.3}
          options={accessorieType}
          onChange={(v: SelectOption) => handleChange({ type: v })}
          value={value?.type}
        /> */}
      </Td>

      <Td>
        <ReactSelect
          noOptionsMessage={() => "Выберите вид"}
          placeholder=""
          styles={customStyles}
          options={filteredAccessorie}
          onChange={(v: SelectOption<Order.AccessorieModel>) =>
            handleChange({ model: v })
          }
          value={value?.model}
          components={{
            DropdownIndicator: Arrow,
          }}
        />
        {/* 
        <Select
          py={0.4}
          options={filteredAccessorie}
          onChange={(v: SelectOption<Order.AccessorieModel>) =>
            handleChange({ model: v })
          }
          value={value?.model}
        /> */}
      </Td>

      <Td>
        <Textbox
          type="number"
          onChange={(v) => handleChange({ height: Number(v) })}
          value={value?.height}
        />
      </Td>
      <Td
        css={{
          backgroundColor: invalid ? `rgba(220, 20, 60, 0.07)` : "inherit",
        }}
      >
        <Textbox
          type="number"
          onChange={(v) => handleChange({ amount: Number(v) })}
          value={value?.amount}
        />
      </Td>
      <Td>
        <Textbox
          type="text"
          onChange={(v) => handleChange({ note: String(v) })}
          value={value?.note}
        />
      </Td>
      <Td>
        <Button onClick={() => onDelete()}>&times;</Button>
      </Td>
    </Row>
  );
};

export default OrderDesktopTableAccessoriesRow;
