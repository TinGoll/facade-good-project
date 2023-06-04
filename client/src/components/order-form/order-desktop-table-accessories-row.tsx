import React, { FC, useState } from "react";
import Select, { SelectOption } from "../facade-good/form-components/select";
import { Row, Td } from "../facade-good/form-components/table";
import Textbox from "../facade-good/form-components/textbox";
import styled from "@emotion/styled";
import { EmotionProps } from "../facade-good/facade-good";
import { Order } from "./order-form-provider";
import useDebounce from "../facade-good/hooks/use-debounce";

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
  accessorieType?: SelectOption<Order.AccessorieType>[];
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

  const [value, setValue] = useState<Order.Accessorie>(item);
  const [typing, setTyping] = useState(false);

  const handleChange = (data: Partial<Order.Accessorie>) => {
    setTyping(true);
    setValue((prev) => ({ ...prev, ...data }));
  };

  const handleClick = () => {
    // setIsFocused((prev) => !prev);
  };

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
        <Select
          py={0.3}
          options={accessorieType}
          onChange={(v: SelectOption<Order.AccessorieType>) =>
            handleChange({ type: v })
          }
          value={value?.type}
        />
      </Td>

      <Td>
        <Select
          py={0.4}
          options={accessorieModel}
          onChange={(v: SelectOption<Order.AccessorieModel>) =>
            handleChange({ model: v })
          }
          value={value?.model}
        />
      </Td>

      <Td>
        <Textbox type="number" onChange={(v) => handleChange({ height: Number(v) })} value={value?.height} />
      </Td>
      <Td>
        <Textbox type="number" onChange={(v) => handleChange({ amount: Number(v) })} value={value?.amount} />
      </Td>
      <Td>
        <Textbox type="text" onChange={(v) => handleChange({ note: String(v) })} value={value?.note}  />
      </Td>
      <Td>
        <Button onClick={() => onDelete()}>&times;</Button>
      </Td>
    </Row>
  );
};

export default OrderDesktopTableAccessoriesRow;
