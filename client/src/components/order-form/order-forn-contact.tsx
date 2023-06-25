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

  const formatPhoneNumber = useCallback((phoneNumber: string = "") => {
    const cleaned = ("" + phoneNumber).replace(/\D/g, "");
    const match = cleaned.match(/^(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})$/);

    if (match) {
      return `+${match[1]} (${match[2]})-${match[3]}-${match[4]}-${match[5]}`;
    }
    return phoneNumber;
  }, []);

  const validateEmail = (value: string) => {
    if (!value) {
      setEmailValid(true);
    }
    const emailRegex = /^[\w.-]+@[\w.-]+\.\w+$/;
    setEmailValid(emailRegex.test(value));
  };

  return (
    <Box css={{ padding: 16 }}>
      <Grid columns={3} gap={16}>
        <Textbox
          value={formatPhoneNumber(value.phone)}
          onChange={(phone) => {
            setTyping(true);
            setValue((prev) => ({ ...prev, phone: String(phone) }));
          }}
          placeholder="Телефон *"
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
