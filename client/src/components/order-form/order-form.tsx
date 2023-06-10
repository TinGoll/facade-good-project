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

import SubmitButton from "./submit-button";
import OrderFornContact from "./order-forn-contact";
import { mockData } from "./mock-data";
import { SelectOption } from "../facade-good/form-components/select";
import { Order } from "./order-form-provider";

const accessorieType = [
  { label: "Карниз", value: "Карниз", type: "Карниз" },
  { label: "Колонна №1", value: "Колонна №1", type: "Колонна" },
];

const accessorieModel = [
  { label: "Карниз", value: "Карниз", typeOf: ["Карниз"] },
  { label: "Колонна №1", value: "Колонна №1", typeOf: ["Колонна"] },
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

const OrderForm = () => {
  const [clearContact, setClearContact] = useState(false);
  const [massiv, setMassiv] = useState<SelectOption<Order.Material>[]>([]);
  const [model, setModel] = useState<SelectOption<Order.Model>[]>([]);
  const [colors, setColors] = useState<SelectOption[]>([]);
  const [patinas, setPatinas] = useState<SelectOption[]>([]);
  const [glossiness, setGlossiness] = useState<SelectOption[]>([]);

  const [facadeTypes, setFacadeTypes] = useState<
    SelectOption<Order.FacadeType>[]
  >([]);
  const [accessories, setAccessories] = useState<
    SelectOption<Order.AccessorieModel>[]
  >([]);

  const clearAllFields = () => {
    setClearContact(true);
  };

  useEffect(() => {
    setMassiv(
      mockData.materials.map((v) => ({
        value: v.name,
        label: v.name,
        ...v,
      }))
    );

    setModel(
      mockData.models.map((v) => ({
        value: v.name,
        label: v.name,
        ...v,
      }))
    );

    setColors(
      mockData.colors.map((v) => ({ value: v.name, label: v.name, ...v }))
    );

    setPatinas(
      mockData.patinas.map((v) => ({ value: v.name, label: v.name, ...v }))
    );
    setGlossiness(
      mockData.glossiness.map((v) => ({ value: v.name, label: v.name, ...v }))
    );

    setFacadeTypes(
      mockData.facades.map((v) => ({ value: v.name, label: v.name, ...v }))
    );

    setAccessories(
      mockData.accessories.map((v) => ({ value: v.name, label: v.name, ...v }))
    );
  }, []);

  return (
    <Box css={{ marginTop: 40 }}>
      <OrderBlockWrapper css={{ marginBottom: 16 }} footer={<Note />}>
        <OrderFormHeader
          css={{ padding: 16 }}
          massiv={massiv}
          models={model}
          colors={colors}
          patinas={patinas}
          glossiness={glossiness}
        />
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
        <FacadeTable facadeType={facadeTypes} />
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
          accessorieModel={accessories}
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

      <OrderBlockWrapper
        css={{ marginTop: 16 }}
        header={
          <Typography
            css={(theme: FacadeGood.CustomTheme) => ({
              ...theme.typography.cardPrice,
              textAlign: "center",
            })}
          >
            Пожалуйста, укажите телефон и email.
          </Typography>
        }
      >
        <OrderFornContact
          clearFields={clearContact}
          setClearFields={setClearContact}
        />
      </OrderBlockWrapper>
      <SubmitButton clearAllFields={clearAllFields} />
    </Box>
  );
};

export default OrderForm;
