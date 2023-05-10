import React from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardImgBox,
  CardPrice,
  CardSchemeBox,
  CardTitle,
  Divider,
} from "../facade-good/facade-good";
import { useQuery } from "@apollo/client";
import {
  GalleryImages,
  GALLERY_GET_ALL,
} from "../../gatsby-plugin-apollo/queries/gallery.query";
import { CatalogImageGrid, CatalogImageWrapper } from "./catalog-image-grid";
import { GATSBY_API_HOST, GATSBY_API_PORT } from "../../settings/api.settings";

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
              <CardTitle>{item.title}</CardTitle>
              <CardImgBox>
                {images.length && (
                  <img
                    className="SwiperImg"
                    src={`${GATSBY_API_HOST}:${GATSBY_API_PORT}/images/${images[0].filename}.webp`}
                    alt={item.title}
                  />
                )}
              </CardImgBox>
              <CardDescription>{item.subtitle}</CardDescription>
              <Divider my={15} />
              {/* <CardParams>
                <CardParamItem>234х546</CardParamItem>
                <CardParamItem>234х546</CardParamItem>
                <CardParamItem>234х546</CardParamItem>
              </CardParams> */}
              <CardSchemeBox schemeheight={60}>
                {scheme.length && (
                  <img
                    className="SwiperImg"
                    src={`${GATSBY_API_HOST}:${GATSBY_API_PORT}/images/${scheme[0].filename}.webp`}
                    alt={item.title}
                  />
                )}
              </CardSchemeBox>
              <CardFooter>
                <CardPrice>{item.params ? item.params : ""}</CardPrice>
                {/* <CardButton>Подробнее</CardButton> */}
              </CardFooter>
            </Card>
          </CatalogImageWrapper>
        );
      })}
    </CatalogImageGrid>
  );
};

export default CatalogImages;
