import React, { useState, useEffect } from "react";
import { useTheme } from "@emotion/react";
import { FacadeGood } from "../../app-types";
import { PrimaryButton, Typography, Box } from "../facade-good/facade-good";
import useOrderForm from "./use-order-form";
import $api from "../../http";
import { Order } from "./order-form-provider";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { AxiosError } from "axios";
import moment from "moment";
import { convertToTranslit } from "../../utils/convert-to-translit";

const MySwal = withReactContent(Swal);

const Errors = {
  WEIGHT_LIMIT_EXCEEDED: "Превышен лимит веса файлов",
  EXCEEDED_QUANTITY: "Превышено максимально количество файлов",
  NO_PHONE: "Не указан телефон для связи",
  NO_EMAIL: "Не указан email",
  NOT_CORRECT_EMAIL: "Не корректный формат email",
};

interface Props {
  clearAllFields: () => void;
}

function SubmitButton({ clearAllFields }: Props) {
  const { state, dispatch } = useOrderForm();
  const [error, setError] = useState<string | null>(null);
  const [empty, setEmpty] = useState<boolean>(true);
  const theme = useTheme() as FacadeGood.CustomTheme;
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    let tempError: string | null = null;
    let temp = 0;
    let isEmpty = true;

    if (isEmpty) {
      for (const item of state.facades) {
        if (item.height || item.type) {
          isEmpty = false;
          break;
        }
      }
    }
    if (isEmpty) {
      for (const item of state.accessories) {
        if (item.model || item.type || item.height) {
          isEmpty = false;
          break;
        }
      }
    }
    if (isEmpty && state.files.length) {
      isEmpty = false;
    }
    setEmpty(isEmpty);
    const files = state.files || [];
    files.forEach((file) => (temp += Number(file.size)));
    if (temp / (1024 * 1024) > 100) {
      tempError = Errors.WEIGHT_LIMIT_EXCEEDED;
    }
    if (files.length > 10) {
      if (tempError) {
        tempError = `${tempError}. ${Errors.EXCEEDED_QUANTITY}`;
      } else {
        tempError = Errors.EXCEEDED_QUANTITY;
      }
    }
    if (!state.header.mail) {
      if (tempError) {
        tempError = `${tempError}. ${Errors.NO_EMAIL}`;
      } else {
        tempError = Errors.NO_EMAIL;
      }
    }
    if (!state.header.phone) {
      if (tempError) {
        tempError = `${tempError}. ${Errors.NO_PHONE}`;
      } else {
        tempError = Errors.NO_PHONE;
      }
    }

    setError(tempError);
  }, [state]);

  const handleSubmit = () => {
    setLoading(true);
    state.header.material;
    const header = {
      material: state.header?.material?.value || "--",
      model: state.header?.model?.value || "--",
      color: state.header?.color?.value || "--",
      patina: state.header?.patina?.value || "--",
      glossiness: state.header.glossiness?.value || "--",
      drill: state.header.drill?.value || "--",
      thermalseam: state.header.thermalseam?.value || "--",
      roll: state.header.roll?.value || "--",
      note: state.header.note || "",
      date: moment().format("l"),
      mail: state.header.mail || "--",
      phone: state.header.phone || "--",
    };
    const data = {
      header,
      facades: state.facades
        .filter((v) => {
          return Boolean(v.height || v.amount);
        })
        .map((v, i) => ({ ...v, type: v.type?.value, num: i + 1 })),

      accessories: state.accessories
        .filter((v) => {
          return Boolean(v.height || v.amount);
        })
        .map((v, i) => ({
          ...v,
          model: v.model?.value,
          type: v.type?.value,
          num: i + 1,
        })),
      files: state.files,
    };

    const formData = new FormData();

    formData.append("header", JSON.stringify(data.header));
    formData.append("accessories", JSON.stringify(data.accessories));
    formData.append("facades", JSON.stringify(data.facades));

    data.files.forEach((file) => {
      return formData.append("files", file, convertToTranslit(file.name));
    });

    $api
      .post("/orders", formData)
      .then((response) => {
        // Обработка успешного ответа
        setLoading(false);
        resetHandler();
        MySwal.fire({
          title: <strong>Удачно!</strong>,
          html: (
            <>
              Спасибо, Ваш заказ отправлен!
              <br />
              Так же, копия заказа будет отправлена на Ваш электронный адрес.
            </>
          ),
          icon: "success",
          confirmButtonColor: "#FFB421",
        });
      })
      .catch((error: AxiosError<{ message: string }>) => {
        // Обработка ошибки
        setLoading(false);
        MySwal.fire({
          title: <strong>Неудачно :(</strong>,
          html: (
            <>
              К сожалению, заказ не отправлен.
              <br />
              {`Код ошибки: ${error.response?.status}`}
              <br />
              {error?.response?.data?.message}
            </>
          ),
          icon: "error",
          confirmButtonColor: "#FFB421",
        });
      });
  };

  const resetHandler = () => {
    dispatch({ type: "RESET" });
    if (typeof clearAllFields === "function") {
      clearAllFields();
    }
  };

  return (
    <Box
      css={{
        paddingTop: 16,
        paddingBottom: 16,
        flexDirection: "column",
        display: "flex",
        justifyContent: "start",
        alignItems: "flex-end",
        minHeight: 100,
        gap: 8,
      }}
    >
      <PrimaryButton
        hidden={empty}
        onClick={() => handleSubmit()}
        loading={loading}
        disabled={Boolean(error)}
      >
        {loading ? "Отправка..." : "Отправить"}
      </PrimaryButton>
      <Typography
        hidden={!Boolean(error) || empty}
        css={{
          ...theme.typography.buttonText,
          textAlign: "right",
          color: theme.colors.danger,
          fontSize: "0.8em",
        }}
      >
        {error}
      </Typography>
      {
        <Typography
          hidden={!loading}
          css={{
            ...theme.typography.buttonText,
            textAlign: "right",
            color: "green",
            fontSize: "0.8em",
          }}
        >
          Выполняеться отправка Вашего заказа. Пожалуйста не закрывайте
          страницу.
        </Typography>
      }
    </Box>
  );
}

export default SubmitButton;
