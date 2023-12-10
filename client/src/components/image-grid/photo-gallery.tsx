import React, { FC } from "react";
import theme from "../../theme";
import {
  HeadText,
  HeadTextWrapper,
  PrimaryButton,
  SiteSection,
} from "../facade-good/facade-good";
import { useQuery } from "@apollo/client";
import {
  GALLERY_GET_ALL,
  GalleryImages,
} from "../../gatsby-plugin-apollo/queries/gallery.query";
import GalleryGrid from "./gallery-grid";
import { navigate } from "gatsby";
import { useImageModal } from "../../stores";

const PhotoGallery: FC = React.memo(() => {
  const { data, loading, error } = useQuery<GalleryImages.Root>(
    GALLERY_GET_ALL,
    {
      variables: {
        category: "Галерея",
      },
    }
  );

  const [items, setItems] = React.useState<GalleryImages.Item[]>([]);
  const setImage = useImageModal(store => store.setImage);

  React.useEffect(() => {
    if (!loading) {
      if (data) {
        const { findAll: arr = [] } = data;
        setItems([...arr]);
      }
    }
  }, [loading, data]);

  return (
    <SiteSection id="image-grid" css={{ marginTop: 100 }}>
      <HeadTextWrapper>
        <HeadText>Фото нашей мебели</HeadText>
      </HeadTextWrapper>
      <GalleryGrid setModalItem={setImage} items={items} />
      <PrimaryButton
        onClick={() => navigate("/gallery")}
        css={{
          ...theme.typography.buttonText,
          display: "block",
          margin: "60px auto",
        }}
      >
        Показать больше
      </PrimaryButton>
    </SiteSection>
  );
});

export default PhotoGallery;
