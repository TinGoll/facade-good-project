import React from "react";
import {
  Box,
  Card,
  CardDescription,
  CardFooter,
  CardImgBox,
  CardPrice,
  CardSchemeBox,
  CardTitle,
  Divider,
  Typography,
} from "../facade-good/facade-good";
import { useQuery } from "@apollo/client";
import {
  GalleryImages,
  GALLERY_GET_ALL,
} from "../../gatsby-plugin-apollo/queries/gallery.query";
import { CatalogImageGrid, CatalogImageWrapper } from "./catalog-image-grid";
import { GATSBY_API_HOST, GATSBY_API_PORT } from "../../settings/api.settings";
import { useTheme } from "@emotion/react";
import { FacadeGood } from "../../app-types";
import { getSubtitle } from "../../utils/get-subtitle";

interface CatalogImageProps {
  category: "Массив" | "МДФ" | "Комплектующие";
  setGalleryItem?: (item: GalleryImages.Item) => void;
}

const CatalogImages: React.FC<CatalogImageProps> = ({
  category,
  setGalleryItem,
}) => {
  const { data, loading, error } = useQuery<GalleryImages.Root>(
    GALLERY_GET_ALL,
    {
      variables: {
        category,
      },
    }
  );
  const [items, setItems] = React.useState<GalleryImages.Item[]>([]);
  const theme = useTheme() as FacadeGood.CustomTheme;

  React.useEffect(() => {
    if (!loading) {
      if (data) {
        const { findAll: arr = [] } = data;
        setItems([...arr]);
      }
    }
  }, [loading, data]);

  return (
    <CatalogImageGrid>
      {items.map((item) => {
        const images = [
          ...(item?.images?.filter((i) => i.index === 0) || []),
        ].sort((a, b) => Number(b.id) - Number(a.id));
        const scheme = [
          ...(item?.images?.filter((i) => i.index === 1) || []),
        ].sort((a, b) => Number(b.id) - Number(a.id));

        const cardClickHandler = (item: GalleryImages.Item): void => {
          if (setGalleryItem && typeof setGalleryItem === "function") {
            setGalleryItem(item);
          }
        };

        return (
          <CatalogImageWrapper key={item.id}>
            <Card
              onClick={() => cardClickHandler(item)}
              css={{
                cursor: "pointer",
                ":hover": {
                  boxShadow: "0px 8px 12px rgba(0, 0, 0, 0.06)",
                },
              }}
            >
              <CardTitle>{`Фасад: ${item.title}`}</CardTitle>
              <CardImgBox>
                {images.length && (
                  <img
                    className="SwiperImg"
                    src={`${GATSBY_API_HOST}:${GATSBY_API_PORT}/images/${images[0].filename}.webp`}
                    alt={item.title}
                  />
                )}
              </CardImgBox>
              {/* <CardParams>
                <CardParamItem>234х546</CardParamItem>
                <CardParamItem>234х546</CardParamItem>
                <CardParamItem>234х546</CardParamItem>
              </CardParams> */}
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
                  >{`Материал: ${getSubtitle(item.subtitle)[0]}`}</Typography>
                  {getSubtitle(item.subtitle)[1] && (
                    <Typography
                      css={{
                        fontWeight: 400,
                        color: theme.colors.cardTextSecondary,
                      }}
                    >{`(${getSubtitle(item.subtitle)[1]})`}</Typography>
                  )}
                </Box>
                <CardPrice>{item.params ? `${item.params}` : "от 5000 р."}</CardPrice>
              </CardFooter>
            </Card>
          </CatalogImageWrapper>
        );
      })}
    </CatalogImageGrid>
  );
};

export default CatalogImages;
