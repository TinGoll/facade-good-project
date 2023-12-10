import React, { useEffect, useState } from "react";
import { GalleryImages } from "../../gatsby-plugin-apollo/queries/gallery.query";
import {
  Box,
  Card,
  CardTitle,
  CardImgBox,
  CardSchemeBox,
  CardFooter,
  Typography,
  CardPrice,
  EmotionProps,
} from "../facade-good/facade-good";
import styled from "@emotion/styled";
import { GATSBY_API_HOST, GATSBY_API_PORT } from "../../settings/api.settings";
import { useTheme } from "@emotion/react";
import { FacadeGood } from "../../app-types";
import { getSubtitle } from "../../utils/get-subtitle";
import EditPanel from "../edit-panel/edit-panel";
import EditableWrapper from "../edit-panel/editable-wrapper/editable-wrapper";
import Textbox from "../facade-good/form-components/textbox";
import { sortedAndGetFirstElement } from "../../utils/sorted-and-get-first";
import { FileWithPath } from "react-dropzone";
import { DropZone } from "../drop-zone";

const indexFilter = (images: GalleryImages.Image[], index: 0 | 1 = 0) => {
  return images.filter((item) => item.index === index);
};

const comparator = (item: GalleryImages.Image) => Number(item.id);

const PanelContainer = styled(Box)(({}) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

const AbsoluteBox = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

interface Files {
  image?: FileWithPath[];
  scheme?: FileWithPath[];
}

interface Props extends EmotionProps<HTMLDivElement> {
  item: GalleryImages.Item;
  title?: string;
  editable?: boolean;
  loading?: boolean;
  onEdit?: (item: GalleryImages.Item, files: Files) => void;
  onDelete?: (id: string) => void;
  onImage?: (name: string) => void;
}

const ProductCard: React.FC<Props> = ({
  item,
  title,
  editable,
  loading,
  onEdit,
  onDelete,
  onImage,
  ...props
}) => {
  const theme = useTheme() as FacadeGood.CustomTheme;
  const [editMode, setEditMode] = useState<boolean>(false);
  const [filesData, setFilesData] = useState<Files>(() => ({
    image: [],
    scheme: [],
  }));
  const [itemData, setItemData] = useState<GalleryImages.Item>(() => ({
    ...item,
  }));

  useEffect(() => {
    setItemData({ ...item });
  }, [item]);

  const imageFilename = sortedAndGetFirstElement<GalleryImages.Image>(
    indexFilter(item?.images, 0),
    comparator,
    "descending"
  )?.filename;

  const schemeFilename = sortedAndGetFirstElement<GalleryImages.Image>(
    indexFilter(item?.images, 1),
    comparator,
    "descending"
  )?.filename;

  const confirmHandler = () => {
    typeof onEdit === "function" && onEdit(itemData, filesData);
  };

  const deleteHandler = () => {
    typeof onDelete === "function" && onDelete(item.id);
  };

  const imageHandler = (files: FileWithPath[]) => {
    setFilesData({ ...filesData, image: files });
  };

  const schemeHandler = (files: FileWithPath[]) => {
    setFilesData({ ...filesData, scheme: files });
  };

  const omImageHandler = (name: string) => {
    typeof onImage === "function" && onImage(name);
  };

  return (
    <Card {...props} onClick={() => omImageHandler(imageFilename)}>
      <PanelContainer>
        <EditableWrapper
          edited={editMode}
          text={
            <CardTitle>{`${title ? title + ": " : ""}${item.title}`}</CardTitle>
          }
        >
          <Textbox
            type="text"
            placeholder={title}
            value={itemData.title}
            onChange={(event) =>
              setItemData({
                ...itemData,
                title: String(event),
              })
            }
          />
        </EditableWrapper>
        {editable && (
          <EditPanel
            editMode={editMode}
            loading={loading}
            setEditMode={setEditMode}
            onConfirm={confirmHandler}
            onDelete={deleteHandler}
            onCancel={() => {
              setItemData({ ...item });
              setFilesData({
                image: [],
                scheme: [],
              });
            }}
          />
        )}
      </PanelContainer>
      <CardImgBox>
        {editMode && (
          <AbsoluteBox>
            <DropZone files={filesData.image} setFiles={imageHandler} />
          </AbsoluteBox>
        )}

        {imageFilename ? (
          <img
            className="SwiperImg"
            src={`${GATSBY_API_HOST}:${GATSBY_API_PORT}/images/${imageFilename}.webp`}
            alt={item.title}
          />
        ) : (
          <img
            className="SwiperImg"
            src={`${GATSBY_API_HOST}:${GATSBY_API_PORT}/images/${imageFilename}.webp`}
            alt={item.title}
          />
        )}
      </CardImgBox>
      <CardSchemeBox
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          omImageHandler(schemeFilename);
        }}
        css={{ marginTop: 10, position: "relative" }}
        schemeheight={"auto"}
      >
        {editMode && (
          <AbsoluteBox>
            <DropZone
              fontSize="2.5em"
              files={filesData.scheme}
              setFiles={schemeHandler}
            />
          </AbsoluteBox>
        )}
        {schemeFilename ? (
          <img
            className="SwiperImg"
            src={`${GATSBY_API_HOST}:${GATSBY_API_PORT}/images/${schemeFilename}.webp`}
            alt={item.title}
          />
        ) : (
          <Box css={{ width: "100%", height: "100%" }} />
        )}
      </CardSchemeBox>
      <CardFooter>
        <Box
          css={{
            flexGrow: 1,
            paddingLeft: 20,
          }}
        >
          <EditableWrapper
            edited={editMode}
            text={
              <Typography
                css={{
                  fontWeight: 400,
                  color: theme.colors.cardTextSecondary,
                }}
              >
                {`Материал: ${getSubtitle(item.subtitle)[0]}`}
              </Typography>
            }
          >
            <Textbox
              type="text"
              placeholder="Материал"
              value={itemData.subtitle}
              onChange={(event) =>
                setItemData({
                  ...itemData,
                  subtitle: String(event),
                })
              }
            />
          </EditableWrapper>
        </Box>
        <EditableWrapper
          edited={editMode}
          text={<CardPrice>{item.params ? `${item.params} ₽` : ""}</CardPrice>}
        >
          <Textbox
            type="text"
            placeholder="Цена"
            value={itemData.params}
            onChange={(event) =>
              setItemData({
                ...itemData,
                params: String(event),
              })
            }
            css={{ width: 100 }}
          />
        </EditableWrapper>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
