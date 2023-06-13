import React, { FC, useState } from "react";
import { Hdbk } from "../../order-form/hdbk-types";
import { Box, PrimaryButton, Typography } from "../../facade-good/facade-good";
import { FacadeGood } from "../../../app-types";
import $api from "../../../http";
import { Form } from "../../facade-good/form-components/form";
import Select from "../../facade-good/form-components/select";
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
interface Props {
  data: null | Hdbk.Data;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  token: string | null;
}
const Accessories: FC<Props> = ({
  data,
  setError,
  setRefresh,
  setToken,
  setLoading,
  token,
}) => {
  const [name, setName] = useState<string>("");
  const [group, setGroup] = useState<string>("");

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
    // setGroup("");
  }

  function onDelete(id: number): void {
    $api
      .delete("hdbk/accessories/" + id, {
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
    if (!name || !group) {
      setError("Все поля обязательные");
      return;
    }
    setLoading(true);
    $api
      .post(
        "hdbk/accessories",
        {
          name: name,
          group: group,
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
            value={group}
            onChange={(v) => setGroup(String(v))}
            outline
            p={11}
            placeholder="Категория"
          />
        </Box>
        <Box css={{ flex: 1 }}>
          <Textbox
            value={name}
            onChange={(v) => setName(String(v))}
            outline
            p={11}
            placeholder="Название"
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
            <Th>Категория</Th>
            <Th css={{ width: 70 }}>Удл.</Th>
          </Row>
        </THead>
        <TBody>
          {(data?.accessories || []).map((item, i) => (
            <Row key={item.id}>
              <Td>{i + 1}</Td>
              <Td>{item.name}</Td>
              <Td>{item.group}</Td>
              <Td>
                <TableButton onClick={() => onDelete(item.id)}>
                  &times;
                </TableButton>
              </Td>
            </Row>
          ))}
        </TBody>
      </Table>
      {!Boolean(data?.accessories?.length) && (
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

export default Accessories;
