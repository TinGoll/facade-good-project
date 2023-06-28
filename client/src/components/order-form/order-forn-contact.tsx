import React, { FC, useCallback, useEffect, useState } from "react";
import { Box } from "../facade-good/facade-good";
import { Grid } from "../facade-good/form-components/grid";
import Textbox from "../facade-good/form-components/textbox";
import useOrderForm from "./use-order-form";
import { Order } from "./order-form-provider";
import useDebounce from "../facade-good/hooks/use-debounce";

interface Props {
  clearFields: boolean;
  setClearFields: React.Dispatch<React.SetStateAction<boolean>>;
}

const OrderFornContact: FC<Props> = ({ clearFields, setClearFields }) => {
  const { state, dispatch } = useOrderForm();
  const [value, setValue] = useState<Partial<Order.Header>>({
    mail: state.header.mail,
    phone: state.header.phone,
  });
  const [typing, setTyping] = useState(false);
  const [emailValid, setEmailValid] = useState(true);

  function updateHeader() {
    dispatch({ type: "UPDATE_HEADER", payload: value });
    validateEmail(String(value.mail));
  }

  useDebounce(
    () => {
      if (typing) {
        updateHeader();
        setTyping(false);
      }
    },
    1000,
    [value]
  );

  useEffect(() => {
    if (clearFields) {
      setValue({ mail: "", phone: "" });
      setClearFields(false);
    }
  }, [clearFields, setClearFields]);

  const validateEmail = (value: string) => {
    if (!value) {
      setEmailValid(true);
    }
    const emailRegex = /^[\w.-]+@[\w.-]+\.\w+$/;
    setEmailValid(emailRegex.test(value));
  };

  const handleInputChange = (phone: string) => {
    let value = phone;

    // Удаляем все нецифровые символы из введенного значения, сохраняя "+"
    value = value.replace(/[^\d+]/g, "");

    // Проверяем и изменяем первую цифру, если необходимо
    if (value.length > 0) {
      if (value[0] === "7") {
        value = `+${value}`;
      } else if (value[0] === "8") {
        value = `+7${value.slice(1)}`;
      } else if (value[0] === "9") {
        value = `+79${value.slice(1)}`;
      }
    }

    // Проверяем длину значения
    if (value.length === 12) {
      // Форматируем строку вида: +7 (###)-###-##-##
      value = `+7 (${value.slice(2, 5)})-${value.slice(5, 8)}-${value.slice(
        8,
        10
      )}-${value.slice(10, 12)}`;
    }
    setTyping(true);
    setValue((prev) => ({ ...prev, phone: value }));
  };

  return (
    <Box css={{ padding: 16 }}>
      <Grid columns={3} gap={16}>
        <Textbox
          value={value.phone}
          onChange={(phone) => handleInputChange(String(phone))}
          // value={formatPhoneNumber(value.phone)}
          // onChange={(phone) => {
          //   setTyping(true);
          //   setValue((prev) => ({ ...prev, phone: String(phone) }));
          // }}

          placeholder="Тел: +7 (___)-___-__-__"
          outline
          maxLength={120}
          fontsize={18}
          p={8}
          type="tel"
        />
        <Textbox
          error={!emailValid}
          value={value.mail}
          onChange={(mail) => {
            setTyping(true);
            setValue((prev) => ({ ...prev, mail: String(mail) }));
          }}
          placeholder="Email *"
          outline
          maxLength={150}
          fontsize={18}
          p={8}
        />
      </Grid>
    </Box>
  );
};

export default OrderFornContact;
