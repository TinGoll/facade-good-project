import React, { FC, useState } from "react";
import { Row, Td } from "../facade-good/form-components/table";
import Select, { SelectOption } from "../facade-good/form-components/select";
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
      <Td>
        <Textbox
          type="number"
          maxLength={4}
          value={value?.amount}
          onChange={(v) => handleChange({ amount: Number(v) })}
        />
      </Td>
      <Td>
        <Select
          py={0.3}
          options={facadeType}
          value={value?.type}
          onChange={(v) => handleChange({ type: v })}
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
