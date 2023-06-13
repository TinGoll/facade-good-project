import React, { FC, useState } from "react";
import { User } from "./types";
import styled from "@emotion/styled";
import {
  Box,
  EmotionProps,
  PrimaryButton,
  Typography,
} from "../facade-good/facade-good";
import BlockWrapper from "./block-wrapper";
import { FacadeGood } from "../../app-types";
import Textbox from "../facade-good/form-components/textbox";
import $api from "../../http";

const Container = styled("div")<EmotionProps<HTMLDivElement>>`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Form = styled("form")<EmotionProps<HTMLFormElement>>`
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
`;

interface Props {
  setToken: React.Dispatch<React.SetStateAction<null | string>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
}
const AdminAuth: FC<Props> = ({ setToken, setError: setMSGError }) => {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState("");

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    console.log(value);
    setLoading(true);

    $api
      .post<{ token: string; user: User }>("auth/login", {
        password: value,
      })
      .then((responce) => {
        setError("");
        setLoading(false);
        if (typeof setToken === "function") {
          setToken(responce?.data?.token || null);
          setMSGError("");
        }
      })
      .catch((error) => {
        setError(error?.response?.data?.message || "Неизвестная ошибка");
        setLoading(false);
        setToken(null);
      });
  };

  return (
    <Container>
      <BlockWrapper
        header={
          <Typography
            css={(theme: FacadeGood.CustomTheme) => ({
              ...theme.typography.cardPrice,
              textAlign: "center",
            })}
          >
            Введите пароль
          </Typography>
        }
      >
        <Form onSubmit={submitHandler}>
          <Textbox
            value={value}
            onChange={(v) => setValue(String(v))}
            type="password"
            outline
            p={8}
          />

          <PrimaryButton disabled={loading}>Войти</PrimaryButton>

          <Typography
            hidden={!Boolean(error)}
            css={(theme: FacadeGood.CustomTheme) => ({
              ...theme.typography.cardPrice,
              textAlign: "center",
              color: "red",
            })}
          >
            {error}
          </Typography>
        </Form>
      </BlockWrapper>
    </Container>
  );
};

export default AdminAuth;
