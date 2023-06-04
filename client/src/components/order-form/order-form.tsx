import React, { useEffect, useState } from "react";
import { Box, PrimaryButton, Typography } from "../facade-good/facade-good";
import OrderFormHeader from "./order-form-header";
import OrderBlockWrapper from "./order-block-wrapper";
import Textarea from "../facade-good/form-components/textarea";
import { FacadeGood } from "../../app-types";
import FacadeTable from "./facade-table";
import AccessoriesTable from "./accessories-table";
import useOrderForm from "./use-order-form";
import FileDropzone from "../facade-good/form-components/file-dropzone";
import { FileWithPath } from "react-dropzone";
import { useTheme } from "@emotion/react";

const Errors = {
  WEIGHT_LIMIT_EXCEEDED: "Превышен лимит веса файлов",
  EXCEEDED_QUANTITY: "Превышено максимально количество файлов",
};

const accessorieType = [
  { label: "Карниз", value: "Карниз", type: "Карниз" },
  { label: "Колонна №1", value: "Колонна №1", type: "Колонна" },
];

const accessorieModel = [
  { label: "Карниз", value: "Карниз", typeOf: ["Карниз"] },
  { label: "Колонна №1", value: "Колонна №1", typeOf: ["Колонна"] },
];

const facadeType = [
  { label: "Глухой", value: "Глухой" },
  { label: "Витрина", value: "Витрина" },
  { label: "Решётка", value: "Решётка" },
];

function Note() {
  const { dispatch } = useOrderForm();

  function update(note: string) {
    dispatch({
      type: "UPDATE_HEADER",
      payload: {
        note,
      },
    });
  }
  return (
    <Textarea
      setNote={update}
      outline={false}
      placeholder="Комментарий к заказу..."
    />
  );
}

function Attachment() {
  const { dispatch, state } = useOrderForm();

  return (
    <FileDropzone
      files={state.files}
      onDrop={function (files: FileWithPath[]): void {
        dispatch({ type: "SET_FILES", payload: files });
      }}
    />
  );
}

function AttachmentCount() {
  const { state } = useOrderForm();
  const [weightfiles, setWeightfiles] = useState<number>(0);

  useEffect(() => {
    let temp = 0;
    const files = state.files || [];
    files.forEach((file) => (temp += Number(file.size)));
    setWeightfiles(temp);
  }, [state]);

  if (weightfiles / (1024 * 1024) > 100) {
    return (
      <Typography
        css={(theme: FacadeGood.CustomTheme) => ({
          ...theme.typography.cardPrice,
          textAlign: "right",
          paddingRight: 16,
        })}
      >
        {`Превышен лимит веса файлов - 100Mb . Общий вес: ${(
          weightfiles /
          (1024 * 1024)
        ).toFixed(2)} Mb`}
      </Typography>
    );
  }

  return (
    <Typography
      css={(theme: FacadeGood.CustomTheme) => ({
        ...theme.typography.cardPrice,
        textAlign: "right",
        paddingRight: 16,
      })}
    >
      {state.files.length > 10
        ? `Превышен лимит, загрузите не более 10 файлов.`
        : `Выбрано: ${state.files.length} файл(ов)`}
    </Typography>
  );
}

function SubmitButton() {
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
      glossiness: state.header.glossiness || "--",
      drill: state.header.drill || "--",
      thermalseam: state.header.thermalseam || "--",
      roll: state.header.roll || "--",
      note: state.header.note || "",

      date: state.header.date || "--",
      mail: state.header.mail || "--",
      phone: state.header.phone || "--",
    };
    const data = {
      header,
      facades: state.facades,
      accessories: state.accessories,
      files: state.files,
    };

    const formData = new FormData();

    formData.append("header", JSON.stringify(data.header));
    formData.append("accessories", JSON.stringify(data.accessories));
    formData.append("facades", JSON.stringify(data.facades));

    data.files.forEach((file) => {
      formData.append("files", file, file.name);
    });
    dispatch({ type: "RESET" });
    setLoading(false);
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
        hidden={!Boolean(error)}
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

const OrderForm = () => {
  return (
    <Box css={{ marginTop: 40 }}>
      <OrderBlockWrapper css={{ marginBottom: 16 }} footer={<Note />}>
        <OrderFormHeader css={{ padding: 16 }} />
      </OrderBlockWrapper>
      <OrderBlockWrapper
        header={
          <Typography
            css={(theme: FacadeGood.CustomTheme) => ({
              ...theme.typography.cardPrice,
              textAlign: "center",
            })}
          >
            Фасады
          </Typography>
        }
      >
        <FacadeTable facadeType={facadeType} />
      </OrderBlockWrapper>

      <OrderBlockWrapper
        css={{ marginTop: 16 }}
        header={
          <Typography
            css={(theme: FacadeGood.CustomTheme) => ({
              ...theme.typography.cardPrice,
              textAlign: "center",
            })}
          >
            Комплектующие
          </Typography>
        }
      >
        <AccessoriesTable
          accessorieModel={accessorieModel}
          accessorieType={accessorieType}
        />
      </OrderBlockWrapper>

      <OrderBlockWrapper
        css={{ marginTop: 16, marginBottom: 16 }}
        header={
          <Typography
            css={(theme: FacadeGood.CustomTheme) => ({
              ...theme.typography.cardPrice,
              textAlign: "center",
            })}
          >
            Прикрепите свои файлы
          </Typography>
        }
        footer={<AttachmentCount />}
      >
        <Attachment />
      </OrderBlockWrapper>
      <SubmitButton />
    </Box>
  );
};

export default OrderForm;
