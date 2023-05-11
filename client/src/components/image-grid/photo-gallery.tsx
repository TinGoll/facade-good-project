import styled from "@emotion/styled";
import { StaticImage } from "gatsby-plugin-image";
import React, { FC } from "react";
import theme from "../../theme";
import {
  Box,
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

const ImageGrid = styled(Box)((props) => ({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
  [props.theme.mq.desktop]: {
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  },
  [props.theme.mq.largeDesktop]: {
    gridTemplateColumns: "repeat(auto-fit, minmax(450px, 1fr))",
  },
  gridGap: "20px",
  padding: "0 15px",
  marginTop: 56,
}));

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-top: 100%; // this creates a 1:1 aspect ratio

  & > * {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover; // this ensures the image fills the square
  }
`;

interface PhotoGalleryProps {
  setGalleryItem: (item: GalleryImages.Item | null) => void;
}

const PhotoGallery: FC<PhotoGalleryProps> = React.memo(({ setGalleryItem }) => {
  const { data, loading, error } = useQuery<GalleryImages.Root>(
    GALLERY_GET_ALL,
    {
      variables: {
        category: "Галерея",
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
    <SiteSection id="image-grid" css={{ marginTop: 100 }}>
      <HeadTextWrapper>
        <HeadText>Фото нашей мебели</HeadText>
      </HeadTextWrapper>
      <GalleryGrid setModalItem={setGalleryItem} items={items} />
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
