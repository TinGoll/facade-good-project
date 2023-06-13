import React, { FC, useState } from "react";
import { Hdbk } from "../../order-form/hdbk-types";
import { Box, PrimaryButton, Typography } from "../../facade-good/facade-good";
import { Form } from "../../facade-good/form-components/form";
import Textbox from "../../facade-good/form-components/textbox";
import Select, { SelectOption } from "../../facade-good/form-components/select";
import {
  Row,
  TBody,
  THead,
  Table,
  TableButton,
  Td,
  Th,
} from "../../facade-good/form-components/table";
import { FacadeGood } from "../../../app-types";
import $api from "../../../http";

const materialTypes: SelectOption = [
  { value: "Массив", label: "Массив" },
  { value: "МДФ 16 мм", label: "МДФ 16 мм" },
  { value: "МДФ 19 мм", label: "МДФ 19 мм" },
  { value: "МДФ 22 мм", label: "МДФ 22 мм" },
];

interface Props {
  data: null | Hdbk.Data;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  token: string | null;
}
const Materials: FC<Props> = ({
  data,
  setError,
  setRefresh,
  setToken,
  setLoading,
  token,
}) => {
  const [materialName, setMaterialName] = useState<string>("");
  const [materialType, setMaterialType] = useState<SelectOption | null>(null);

  if (!data) {
    return (
      <Box>
        <Typography
          css={(theme: FacadeGood.CustomTheme) => ({
            ...theme.typography.cardPrice,
            textAlign: "center",
            paddingLeft: 16,
          })}
        >
          Загрузка...
        </Typography>
      </Box>
    );
  }

  function clear() {
    setMaterialName("");
    setMaterialType(null);
  }

  function onDelete(id: number): void {
    $api
      .delete("hdbk/materials/" + id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((responce) => {
        setRefresh(true);
        setError("");
        setLoading(false);
      })
      .catch((error) => {
        if (error?.response?.status === 401) {
          setToken(null);
        } else {
          setError(error?.response?.data?.message || "Неизвестная ошибка");
        }
        setLoading(false);
      });
  }

  function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.stopPropagation();
    event.preventDefault();
    if (!materialName || !materialType?.value) {
      setError("Все поля обязательные");
      return;
    }
    setLoading(true);
    $api
      .post(
        "hdbk/materials",
        {
          name: materialName,
          type: materialType?.value,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((responce) => {
        setRefresh(true);
        setError("");
        setLoading(false);
        clear();
      })
      .catch((error) => {
        if (error?.response?.status === 401) {
          setToken(null);
        } else {
          setError(error?.response?.data?.message || "Неизвестная ошибка");
        }
        setLoading(false);
      });
  }

  return (
    <Box>
      <Form onSubmit={submitHandler}>
        <Box css={{ flex: 1 }}>
          <Textbox
            value={materialName}
            onChange={(v) => setMaterialName(String(v))}
            outline
            p={11}
            placeholder="Название"
          />
        </Box>
        <Box css={{ width: 300, flex: 1 }}>
          <Select
            value={materialType}
            onChange={(v) => setMaterialType(v)}
            outline
            placeholder="Тип"
            options={materialTypes}
          />
        </Box>
        <Box>
          <PrimaryButton css={{ height: 42 }}>Добавить</PrimaryButton>
        </Box>
      </Form>
      <Table
        css={(theme: FacadeGood.CustomTheme) => ({
          borderTop: `1px solid ${theme.colors.border}`,
        })}
      >
        <THead>
          <Row>
            <Th css={{ width: 70 }}>№</Th>
            <Th>Название</Th>
            <Th>Тип</Th>
            <Th css={{ width: 70 }}>Удл.</Th>
          </Row>
        </THead>
        <TBody>
          {(data?.materials || []).map((item, i) => (
            <Row key={item.id}>
              <Td>{i + 1}</Td>
              <Td>{item.name}</Td>
              <Td>{item.type}</Td>
              <Td>
                <TableButton onClick={() => onDelete(item.id)}>
                  &times;
                </TableButton>
              </Td>
            </Row>
          ))}
        </TBody>
      </Table>
      {!Boolean(data?.materials?.length) && (
        <Typography
          css={(theme: FacadeGood.CustomTheme) => ({
            ...theme.typography.cardPrice,
            textAlign: "center",
            paddingLeft: 16,
          })}
        >
          Нет строк
        </Typography>
      )}
    </Box>
  );
};

export default Materials;
