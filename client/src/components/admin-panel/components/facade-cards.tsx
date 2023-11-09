import React, { FC, useEffect, useState } from "react";
import {
  GALLERY_GET_ALL,
  GalleryImages,
} from "../../../gatsby-plugin-apollo/queries/gallery.query";
import { useLazyQuery } from "@apollo/client";
import {
  CatalogImageGrid,
  CatalogImageWrapper,
} from "../../catalog/catalog-image-grid";
import {
  Box,
  PrimaryButton,
  Divider,
  Button,
} from "../../facade-good/facade-good";
import styled from "@emotion/styled";
import { Form } from "../../facade-good/form-components/form";
import Textbox from "../../facade-good/form-components/textbox";
import FileDropzone from "../../facade-good/form-components/file-dropzone";
import { FacadeGood } from "../../../app-types";
import Select from "react-select";
import { FileWithPath } from "react-dropzone";
import $api from "../../../http";
import SortedCards from "./sorted-cards";
import { compareArrays } from "../../../utils/compareArrays";
import ProductCard from "../../card/product-card";
import { Hdbk } from "../../order-form/hdbk-types";

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

const SortedBatton = styled(Button)(({ theme }) => ({
  padding: 6,
  border: "none",
  cursor: "pointer",
  borderRadius: 6,
  background: theme.colors.button.normal,
  ":hover": {
    background: theme.colors.button.hover,
  },
  ":active": {
    background: theme.colors.button.active,
  },
  ":disabled": {
    background: theme.colors.bg3,
    cursor: "not-allowed",
  },
}));

const types = [
  { value: "МДФ", label: "МДФ" },
  { value: "Массив", label: "Массив" },
  { value: "Комплектующие", label: "Комплектующие" },
];

interface Files {
  image?: FileWithPath[];
  scheme?: FileWithPath[];
}

interface Props {
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  token: string | null;
  loading?: boolean;
  data: Hdbk.Data | null;
}

const FacadeCards: FC<Props> = ({
  token,
  loading,
  setError,
  setLoading,
  setToken,
}) => {
  const [sorted, setSorted] = useState<boolean>(false);
  const [items, setItems] = useState<GalleryImages.Item[]>([]);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

  const [name, setName] = useState<string>("");
  const [material, setMaterial] = useState<string>("");
  const [cardType, setCardType] = useState<any>(null);
  const [image1, setImage1] = useState<FileWithPath[]>([]);
  const [image2, setImage2] = useState<FileWithPath[]>([]);

  const [refreshCard, setRefreshCard] = useState(true);

  const [getData, { data, loading: dataLoading }] =
    useLazyQuery<GalleryImages.Root>(GALLERY_GET_ALL, {
      fetchPolicy: "no-cache",
    });

  useEffect(() => {
    if (refreshCard) {
      getData();
      setRefreshCard(false);
    }
  }, [refreshCard]);

  useEffect(() => {
    if (!dataLoading) {
      if (data) {
        const { findAll = [] } = data;
        const arr = [...findAll];
        arr.sort((a, b) => a.index - b.index);
        setItems(arr.filter((d) => d.category !== "Галерея"));
      }
    }
  }, [dataLoading, data]);

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

  function updateItem(item: Partial<GalleryImages.Item> & { id: string }) {
    const { images, __typename, ...updateData } = item;

    return $api.put<ItemResponce>(
      "gallery/items",
      { ...updateData },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  function addImage(id: string, formData: FormData) {
    return $api.post("gallery/images/" + id, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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

  const reorderHandler = (array: GalleryImages.Item[]) => {
    const sorderItems = array.map<GalleryImages.Item>((item, index) => ({
      ...item,
      index: index,
    }));
    const reorderArray = compareArrays<GalleryImages.Item>(
      items,
      sorderItems,
      (i) => Number(i.id),
      (i) => Number(i.index)
    );

    const responcePromises = reorderArray.map(({ id, index }) =>
      updateItem({ id, index })
    );

    Promise.all(responcePromises)
      .then((responces) => responces)
      .catch((err) => err)
      .finally(() => {
        setLoading(false);
        setRefreshCard(true);
      });
    setLoading(true);
  };

  const updateHandler = async (item: GalleryImages.Item, files: Files) => {
    setLoading(true);
    try {
      await updateItem(item);

      if (files.image?.length) {
        const formData = new FormData();
        const image = files.image[0];
        formData.append("index", String(0));
        formData.append("images", image, image.name);
        await addImage(item.id, formData);
      }
      if (files.scheme?.length) {
        const formData = new FormData();
        const image = files.scheme[0];
        formData.append("index", String(1));
        formData.append("images", image, image.name);
        await addImage(item.id, formData);
      }
      setRefreshCard(true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const isLoading = dataLoading || deleteLoading || loading;

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

      <Box
        css={{
          padding: "8px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <SortedBatton
          hidden={sorted}
          disabled={sorted}
          onClick={() => setSorted(true)}
        >
          Сортировать
        </SortedBatton>
      </Box>

      {!isLoading && sorted && items.length && (
        <SortedCards
          cards={items}
          setSorted={setSorted}
          sorted={sorted}
          onReorder={reorderHandler}
        />
      )}
      {/* Карточки */}
      {!isLoading && !sorted && (
        <CatalogImageGrid>
          {items.map((item) => (
            <CatalogImageWrapper key={item.id}>
              <ProductCard
                item={item}
                title="Фасад"
                editable
                onDelete={deleteHandler}
                onEdit={updateHandler}
                loading={isLoading}
              />
            </CatalogImageWrapper>
          ))}
        </CatalogImageGrid>
      )}
    </Box>
  );
};

export default FacadeCards;
