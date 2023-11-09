import React, { useEffect, useState } from "react";
import AdminAuth from "./admin-auth";
import styled from "@emotion/styled";
import { Box, EmotionProps, Typography } from "../facade-good/facade-good";
import BlockWrapper from "./block-wrapper";
import { FacadeGood } from "../../app-types";
import { List, ListItem, ListTitle } from "../facade-good/form-components/list";
import { Hdbk } from "../order-form/hdbk-types";
import $api from "../../http";
import AdminTabs from "./components/admin-tabs";

const Wrapper = styled("div")<EmotionProps<HTMLDivElement>>`
  position: relative;
  display: flex;
  gap: 16px;
`;

const MenuWrapper = styled("div")<EmotionProps<HTMLDivElement>>`
  position: fixed;
  top: 64px;
  width: 350px;
  height: calc(100vh - 64px);
  overflow: auto;
`;

const ContentWrapper = styled("div")<EmotionProps<HTMLDivElement>>`
  margin-left: 350px;
  flex: 1;
  overflow: auto;
  padding-top: 64px;
  min-height: calc(100vh - 64px);
`;

const AdminPanel = () => {
  const [token, setToken] = useState<null | string>(null);
  const [data, setData] = useState<Hdbk.Data | null>(null);
  const [refresh, setRefresh] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [title, setTitle] = useState("Материалы");
  const [tab, setTab] = useState(0);

  useEffect(() => {
    if (token && refresh) {
      setLoading(true);
      $api
        .get<Hdbk.Data>("hdbk/get-all")
        .then((responce) => {
          setData(responce.data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error?.response?.data?.message || "Неизвестная ошибка");
          setLoading(false);
          setData(null);
        });

      setRefresh(false);
    }
  }, [token, refresh]);

  const setTabHandler = (tabIndex: number, newTitle: string) => {
    setTab(tabIndex);
    setTitle(newTitle);
    setError("");
  };

  if (!token) {
    return <AdminAuth setToken={setToken} setError={setError} />;
  }

  return (
    <div>
      <Wrapper>
        <MenuWrapper>
          <Box
            css={{
              paddingTop: 16,
              paddingLeft: 16,
              paddingBottom: 16,
              paddingRight: 8,
            }}
          >
            <BlockWrapper
              header={
                <Typography
                  css={(theme: FacadeGood.CustomTheme) => ({
                    ...theme.typography.cardPrice,
                    textAlign: "center",
                  })}
                >
                  Меню
                </Typography>
              }
            >
              <List>
                <ListTitle>Форма заказа:</ListTitle>
                <ListItem
                  className={tab === 0 ? "act" : ""}
                  onClick={() => setTabHandler(0, "Материалы")}
                >
                  Материалы
                </ListItem>
                <ListItem
                  className={tab === 1 ? "act" : ""}
                  onClick={() => setTabHandler(1, "Модели фасадов")}
                >
                  Модели фасадов
                </ListItem>
                <ListItem
                  className={tab === 2 ? "act" : ""}
                  onClick={() => setTabHandler(2, "Цвета")}
                >
                  Цвета
                </ListItem>
                <ListItem
                  className={tab === 3 ? "act" : ""}
                  onClick={() => setTabHandler(3, "Глянцевость")}
                >
                  Глянцевость
                </ListItem>
                <ListItem
                  className={tab === 4 ? "act" : ""}
                  onClick={() => setTabHandler(4, "Патина")}
                >
                  Патина
                </ListItem>
                <ListItem
                  className={tab === 5 ? "act" : ""}
                  onClick={() => setTabHandler(5, "Типы фасадов")}
                >
                  Типы фасадов
                </ListItem>
                <ListItem
                  className={tab === 6 ? "act" : ""}
                  onClick={() => setTabHandler(6, "Комплектующие")}
                >
                  Комплектующие
                </ListItem>
                <ListTitle>Галерея:</ListTitle>
                <ListItem
                  className={tab === 7 ? "act" : ""}
                  onClick={() => setTabHandler(7, "Карточки фасадов")}
                >
                  Карточки фасадов
                </ListItem>
                <ListItem
                  className={tab === 8 ? "act" : ""}
                  onClick={() => setTabHandler(8, "Фото-галерея")}
                >
                  Фото-галерея
                </ListItem>
              </List>
            </BlockWrapper>
          </Box>
        </MenuWrapper>
        <ContentWrapper>
          <Box
            css={{
              paddingTop: 16,
              paddingLeft: 8,
              paddingBottom: 16,
              paddingRight: 16,
            }}
          >
            <BlockWrapper
              header={
                <Box
                  css={{
                    minHeight: 54,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: 8,
                  }}
                >
                  <Typography
                    css={(theme: FacadeGood.CustomTheme) => ({
                      ...theme.typography.cardPrice,
                      textAlign: "left",
                      paddingLeft: 16,
                    })}
                  >
                    {title}
                  </Typography>
                  {error && (
                    <Typography
                      css={(theme: FacadeGood.CustomTheme) => ({
                        ...theme.typography.cardPrice,
                        textAlign: "left",
                        paddingLeft: 16,
                        fontSize: 14,
                        color: "red",
                      })}
                    >
                      {error}
                    </Typography>
                  )}
                  {loading && (
                    <Typography
                      css={(theme: FacadeGood.CustomTheme) => ({
                        ...theme.typography.cardPrice,
                        textAlign: "left",
                        paddingLeft: 16,
                        fontSize: 14,
                        color: "red",
                      })}
                    >
                      Загрузка...
                    </Typography>
                  )}
                </Box>
              }
            >
              <AdminTabs
                data={data}
                setToken={setToken}
                setRefresh={setRefresh}
                tab={tab}
                setError={setError}
                setLoading={setLoading}
                token={token}
                loading={loading}
              />
            </BlockWrapper>
          </Box>
        </ContentWrapper>
      </Wrapper>
    </div>
  );
};

export default AdminPanel;
