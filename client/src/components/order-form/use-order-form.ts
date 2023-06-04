import React, { useContext } from "react";
import { OrderFormContext } from "./order-form-provider";

const useOrderForm = () => {
  const context = useContext(OrderFormContext);
  if (!context) {
    throw new Error(
      "useOrderForm должен использоваться внутри OrderFormProvider."
    );
  }
  return context;
};

export default useOrderForm;
