import React, { FC, useState } from "react";
import { Hdbk } from "../../order-form/hdbk-types";
import { Box, PrimaryButton, Typography } from "../../facade-good/facade-good";
import { FacadeGood } from "../../../app-types";
import $api from "../../../http";
import { Form } from "../../facade-good/form-components/form";

import {
  Table,
  THead,
  Row,
  Th,
  TBody,
  Td,
  TableButton,
} from "../../facade-good/form-components/table";
import Textbox from "../../facade-good/form-components/textbox";
import Select from "react-select";


const materialTypes = [
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
const Models: FC<Props> = ({
  data,
  setError,
  setRefresh,
  setToken,
  setLoading,
  token,
}) => {
  const [name, setName] = useState<string>("");
  const [materialType, setMaterialType] = useState<any | null>(null);

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
    setName("");
    setMaterialType([]);
  }

  function onDelete(id: number): void {
    $api
      .delete("hdbk/models/" + id, {
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
    if (!name || !materialType?.length) {
      setError("Все поля обязательные");
      return;
    }
    setLoading(true);
    console.log("materialType", materialType.map((m: any) => m.value),);
    
    $api
      .post(
        "hdbk/models",
        {
          name: name,
          materials: materialType.map((m: any) => m.value),
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
            value={name}
            onChange={(v) => setName(String(v))}
            outline
            p={9}
            placeholder="Название"
          />
        </Box>
        <Box css={{ width: 300, flex: 1 }}>
          <Select
            isMulti
            value={materialType}
            onChange={(v) => setMaterialType(v)}
            placeholder="Тип"
            options={materialTypes}
            noOptionsMessage={() => "Список пуст..."}
            styles={{}}
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
          {(data?.models || []).map((item, i) => (
            <Row key={item.id}>
              <Td>{i + 1}</Td>
              <Td>{item.name}</Td>
              <Td>{item.materials.join(", ")}</Td>
              <Td>
                <TableButton onClick={() => onDelete(item.id)}>
                  &times;
                </TableButton>
              </Td>
            </Row>
          ))}
        </TBody>
      </Table>
      {!Boolean(data?.models?.length) && (
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

export default Models;
