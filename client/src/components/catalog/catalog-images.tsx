import React from "react";
import { useMediaQuery } from "@react-hook/media-query";
import { useQuery } from "@apollo/client";
import {
  GalleryImages,
  GALLERY_GET_ALL,
} from "../../gatsby-plugin-apollo/queries/gallery.query";
import { CatalogImageGrid, CatalogImageWrapper } from "./catalog-image-grid";
import { useImageModal } from "../../stores";
import ProductCard from "../card/product-card";

interface CatalogImageProps {
  category: "Массив" | "МДФ" | "Комплектующие";
}

const CatalogImages: React.FC<CatalogImageProps> = ({ category }) => {
  const { data, loading, error } = useQuery<GalleryImages.Root>(
    GALLERY_GET_ALL,
    {
      variables: {
        category,
      },
    }
  );
  const [items, setItems] = React.useState<GalleryImages.Item[]>([]);

  const setImage = useImageModal((store) => store.setImage);

  const isSmallScreen = useMediaQuery("(max-width: 680px)");

  React.useEffect(() => {
    if (!loading) {
      if (data) {
        const { findAll = [] } = data;
        const arr = [...findAll];
        arr.sort((a, b) => a.index - b.index);
        setItems(arr);
      }
    }
  }, [loading, data]);

  return (
    <CatalogImageGrid>
      {items.map((item) => {
        return (
          <CatalogImageWrapper key={item.id}>
            <ProductCard
              item={item}
              title="Фасад"
              onImage={isSmallScreen ? undefined : setImage}
              css={{
                cursor: isSmallScreen ? "initial" : "pointer",
                ":hover": {
                  boxShadow: isSmallScreen
                    ? "none"
                    : "4px 2px 8px rgba(0, 0, 0, 0.1)",
                },
              }}
            />
          </CatalogImageWrapper>
        );
      })}
    </CatalogImageGrid>
  );
};

export default CatalogImages;
