import React, { FC, useEffect, useState } from "react";
import {
  GALLERY_GET_ALL,
  GalleryImages,
} from "../../../gatsby-plugin-apollo/queries/gallery.query";
import { useLazyQuery } from "@apollo/client";
import {
  GATSBY_API_HOST,
  GATSBY_API_PORT,
} from "../../../settings/api.settings";
import theme from "../../../theme";
import { getSubtitle } from "../../../utils/get-subtitle";
import {
  CatalogImageGrid,
  CatalogImageWrapper,
} from "../../catalog/catalog-image-grid";
import {
  Card,
  CardTitle,
  CardImgBox,
  CardSchemeBox,
  CardFooter,
  Typography,
  CardPrice,
  Box,
  EmotionProps,
  PrimaryButton,
  Divider,
} from "../../facade-good/facade-good";
import styled from "@emotion/styled";
import { Form } from "../../facade-good/form-components/form";
import Textbox from "../../facade-good/form-components/textbox";
import FileDropzone from "../../facade-good/form-components/file-dropzone";
import { FacadeGood } from "../../../app-types";
import Select from "react-select";
import { FileWithPath } from "react-dropzone";
import $api from "../../../http";

interface ItemResponce {
  title: string;
  subtitle: string;
  description: string;
  params: string;
  tag: string;
  category: string;
  index: string;
  id: number;
  createdAt: string;
  updatedAt: string;
}

const DeleteButton = styled("button")<EmotionProps<HTMLButtonElement>>`
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 99;
  background-color: inherit;
  width: 36px;
  height: 36px;
  font-size: 1.5em;
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 50%;
  color: ${({ theme }) => theme.colors.bg2};
  &:hover {
    background-color: ${({ theme }) => theme.colors.bg3};
    color: white;
  }
`;

function DeletedBox({
  children,
  css,
  loading,
  deleteHandler,
  ...props
}: EmotionProps<HTMLDivElement> & {
  deleteHandler: () => void;
  loading: boolean;
}) {
  return (
    <Box
      {...props}
      css={[
        {
          position: "relative",
        },
        ...(Array.isArray(css) ? css : [css]),
      ]}
    >
      <DeleteButton disabled={loading} onClick={() => deleteHandler()}>
        &times;
      </DeleteButton>
      {children}
    </Box>
  );
}

const types = [
  { value: "МДФ", label: "МДФ" },
  { value: "Массив", label: "Массив" },
  { value: "Комплектующие", label: "Комплектующие" },
];

interface Props {
  data: any;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  token: string | null;
}

const FacadeCards: FC<Props> = ({
  token,
  data: hdbkData,
  setError,
  setLoading,
  setToken,
}) => {
  const [items, setItems] = useState<GalleryImages.Item[]>([]);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

  const [name, setName] = useState<string>("");
  const [material, setMaterial] = useState<string>("");
  const [cardType, setCardType] = useState<any>(null);
  const [image1, setImage1] = useState<FileWithPath[]>([]);
  const [image2, setImage2] = useState<FileWithPath[]>([]);

  const [refreshCard, setRefreshCard] = useState(true);
  const [getData, { data, loading, error }] = useLazyQuery<GalleryImages.Root>(
    GALLERY_GET_ALL,
    {
      fetchPolicy: "no-cache",
    }
  );

  useEffect(() => {
    if (refreshCard) {
      console.log("Обновление");

      getData();
      setRefreshCard(false);
    }
  }, [refreshCard]);

  useEffect(() => {
    if (!loading) {
      if (data) {
        const { findAll: arr = [] } = data;
        setItems([...arr].filter((d) => d.category !== "Галерея"));
      }
    }
  }, [loading, data]);

  function deleteHandler(id: string): void {
    setDeleteLoading(true);
    $api
      .delete("gallery/items/" + id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setDeleteLoading(false);
        setRefreshCard(true);
        setError("");
      })
      .catch((error) => {
        if (error?.response?.status === 401) {
          setToken(null);
        } else {
          setError(error?.response?.data?.message || "Неизвестная ошибка");
        }
        setDeleteLoading(false);
      });
  }

  function clearFields() {
    setName("");
    setMaterial("");
    setCardType(null);
    setImage1([]);
    setImage2([]);
  }

  function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.stopPropagation();
    event.preventDefault();

    if (!name || !material || !image1.length || !cardType?.value) {
      setError("Название, материал, раздел галереи и фото, обязательные поля");
      return;
    }
    setLoading(true);
    $api
      .post<ItemResponce>(
        "gallery/items",
        {
          title: name,
          subtitle: material,
          description: "",
          params: "",
          tag: name,
          category: cardType?.value,
          index: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((itemResponce) => {
        const item = itemResponce.data;
        const firstFormData = new FormData();
        const img1 = image1[0];
        firstFormData.append("index", String(0));
        firstFormData.append("images", img1, img1.name);
        return $api
          .post("gallery/images/" + item.id, firstFormData, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(() => {
            if (!image2[0]) {
              return;
            }
            const item = itemResponce.data;
            const secondFormData = new FormData();
            const img2 = image2[0];
            secondFormData.append("index", String(1));
            secondFormData.append("images", img2, img2.name);
            return $api.post("gallery/images/" + item.id, secondFormData, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
          });
      })
      .then(() => {
        setLoading(false);
        setRefreshCard(true);
        getData();
        setError("");
        clearFields();
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
    <Box css={{}}>
      <Form onSubmit={submitHandler}>
        <Box css={{ flex: 1 }}>
          <Textbox
            outline
            p={9}
            placeholder="Название"
            value={name}
            onChange={(v) => setName(String(v))}
          />
        </Box>
        <Box css={{ flex: 1 }}>
          <Textbox
            outline
            p={9}
            placeholder="Материал"
            value={material}
            onChange={(v) => setMaterial(String(v))}
          />
        </Box>
        <Box css={{ width: 300, flex: 1 }}>
          <Select
            value={cardType}
            onChange={(v) => setCardType(v)}
            placeholder="Раздел"
            options={types}
            noOptionsMessage={() => "Список пуст..."}
            styles={{}}
          />
        </Box>

        <Box>
          <PrimaryButton css={{ height: 42 }}>Добавить</PrimaryButton>
        </Box>
      </Form>
      <Box
        css={(theme: FacadeGood.CustomTheme) => ({
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          borderTop: `2px solid ${theme.colors.border}`,
        })}
      >
        <Box
          css={(theme: FacadeGood.CustomTheme) => ({
            flex: 1,
            borderRight: `2px solid ${theme.colors.border}`,
          })}
        >
          <FileDropzone
            files={image1}
            onDrop={(files) => setImage1(files)}
            placeholder="Добавьте фото изделия"
          />
        </Box>
        <Box css={{ flex: 1 }}>
          <FileDropzone
            files={image2}
            onDrop={(files) => setImage2(files)}
            placeholder="Добавьте фото схемы"
          />
        </Box>
      </Box>
      <Divider />
      <CatalogImageGrid>
        {items.map((item) => {
          const images = [
            ...(item?.images?.filter((i) => i.index === 0) || []),
          ].sort((a, b) => Number(b.id) - Number(a.id));
          const scheme = [
            ...(item?.images?.filter((i) => i.index === 1) || []),
          ].sort((a, b) => Number(b.id) - Number(a.id));
          return (
            <CatalogImageWrapper key={item.id}>
              <DeletedBox
                loading={deleteLoading}
                deleteHandler={() => deleteHandler(item.id)}
              >
                <Card
                  css={{
                    ":hover": {
                      boxShadow: "0px 8px 12px rgba(0, 0, 0, 0.06)",
                    },
                  }}
                >
                  <CardTitle>{`${item.title}`}</CardTitle>
                  <CardImgBox>
                    {images.length && (
                      <img
                        className="SwiperImg"
                        src={`${GATSBY_API_HOST}:${GATSBY_API_PORT}/images/${images[0].filename}.webp`}
                        alt={item.title}
                      />
                    )}
                  </CardImgBox>

                  {scheme.length ? (
                    <CardSchemeBox css={{ marginTop: 10 }} schemeheight={60}>
                      <img
                        className="SwiperImg"
                        src={`${GATSBY_API_HOST}:${GATSBY_API_PORT}/images/${scheme[0].filename}.webp`}
                        alt={item.title}
                      />
                    </CardSchemeBox>
                  ) : (
                    <CardSchemeBox
                      css={{ marginTop: 10 }}
                      schemeheight={60}
                    ></CardSchemeBox>
                  )}
                  <CardFooter>
                    <Box
                      css={{
                        flexGrow: 1,
                        paddingLeft: 20,
                      }}
                    >
                      <Typography
                        css={{
                          fontWeight: 400,
                          color: theme.colors.cardTextSecondary,
                        }}
                      >{`Материал: ${
                        getSubtitle(item.subtitle)[0]
                      }`}</Typography>
                      {getSubtitle(item.subtitle)[1] && (
                        <Typography
                          css={{
                            fontWeight: 400,
                            color: theme.colors.cardTextSecondary,
                          }}
                        >{`(${getSubtitle(item.subtitle)[1]})`}</Typography>
                      )}
                    </Box>
                    <CardPrice>{item.params ? `${item.params}` : ""}</CardPrice>
                  </CardFooter>
                </Card>
              </DeletedBox>
            </CatalogImageWrapper>
          );
        })}
      </CatalogImageGrid>
    </Box>
  );
};

export default FacadeCards;
