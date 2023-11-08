import React, { useState } from "react";
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

const PanelContainer = styled(Box)(({}) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

interface Props extends EmotionProps<HTMLDivElement> {
  item: GalleryImages.Item;
  title?: string;
  editable?: boolean;
  onConfirm?: (item: GalleryImages.Item) => void;
  onDelete?: (id: string) => void;
}

const ProductCard: React.FC<Props> = ({
  item,
  title,
  editable,
  onConfirm,
  onDelete,
  ...props
}) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [itemData, setItemData] = useState<GalleryImages.Item>(() => ({
    ...item,
  }));

  const images = [...(item?.images?.filter((i) => i.index === 0) || [])].sort(
    (a, b) => Number(b.id) - Number(a.id)
  );

  const scheme = [...(item?.images?.filter((i) => i.index === 1) || [])].sort(
    (a, b) => Number(b.id) - Number(a.id)
  );

  const theme = useTheme() as FacadeGood.CustomTheme;

  const confirmHandler = () => {
    typeof onConfirm === "function" && onConfirm(itemData);
  };

  const deleteHandler = () => {
    typeof onDelete === "function" && onDelete(item.id);
  };

  return (
    <Card
      {...props}      
    >
      <PanelContainer>               
        <EditableWrapper
          edited={editMode}
          text={<CardTitle> {`${title ? title + ': ' : ''}${item.title}`}</CardTitle>}
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
        {editable && 
        <EditPanel
          editMode={editMode}
          setEditMode={setEditMode}
          onConfirm={confirmHandler}
          onDelete={deleteHandler}
          onCancel={() => {
            setItemData({...item})
          }}
        />}
      </PanelContainer>
      <CardImgBox>
        {images.length && (
          <img
            className="SwiperImg"
            src={`${GATSBY_API_HOST}:${GATSBY_API_PORT}/images/${item.images[0].filename}.webp`}
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
        <CardSchemeBox css={{ marginTop: 10 }} schemeheight={60} />
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
          >
            <EditableWrapper
              edited={editMode}
              text={`Материал: ${getSubtitle(item.subtitle)[0]}`}
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
          </Typography>
        </Box>
        <CardPrice>          
          <EditableWrapper
            edited={editMode}
            text={item.params ? `${item.params}` : ""}
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
            />
          </EditableWrapper>                  
          </CardPrice>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
