import styled from "@emotion/styled";
import React from "react";
import { Box, EmotionProps, Typography } from "../facade-good/facade-good";
import { GalleryImages } from "../../gatsby-plugin-apollo/queries/gallery.query";
import { FacadeGood } from "../../app-types";
import { GATSBY_API_HOST, GATSBY_API_PORT } from "../../settings/api.settings";

export const ImageGrid = styled(Box)<{ imageSize?: number }>((props) => ({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
  [props.theme.mq.desktop]: {
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  },
  [props.theme.mq.largeDesktop]: {
    gridTemplateColumns: `repeat(auto-fit, minmax(${
      props.imageSize ? props.imageSize : 450
    }px, 1fr))`,
  },
  gridGap: "20px",
  padding: "0 15px",
  marginTop: 56,
}));

export const ImageWrapper = styled(Box)`
  position: relative;
  width: 100%;
  padding-top: 100%;
  overflow: hidden;
  & > * {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .tooltip {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    opacity: 0;
    background-color: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(6px);
    color: #fff;
    font-size: 16px;
    line-height: 1.5;
    padding: 10px;
    z-index: 1;
    transition: opacity 0.3s ease, transform 0.3s ease;
    height: 60px;
    border-top: 1px solid #6d6d6d;
  }

  &:hover .tooltip {
    opacity: 1;
    transform: translateX(-50%) translateY(-100%);
  }

  &:hover {
    outline: 1px solid #dedede;
    box-shadow: 0px 10px 14px rgba(0, 0, 0, 0.1);
  }
`;

interface GalleryGridProps extends EmotionProps<HTMLDivElement> {
  items?: GalleryImages.Item[];
  imagesize?: number;
  setModalItem?: (item: GalleryImages.Item) => void;
}

const GalleryGrid = ({
  items = [],
  setModalItem,
  ...props
}: GalleryGridProps & React.ClassAttributes<HTMLDivElement>) => {
  const openImageHandler = (item: GalleryImages.Item) => {
    if (setModalItem && typeof setModalItem === "function") {
      setModalItem(item);
    }
  };

  return (
    <ImageGrid {...props}>
      {items.map((item) => {
        const images = item.images?.filter((i) => i.index === 0) || [];
        return (
          <ImageWrapper
            key={item.id}
            onClick={() => openImageHandler(item)}
            css={{ cursor: "pointer" }}
          >
            {images.length && (
              <img
                className="SwiperImg"
                src={`${GATSBY_API_HOST}:${GATSBY_API_PORT}/images/${images[0].filename}.webp`}
                alt={item.title}
              />
            )}
            <Box
              className="tooltip"
              css={{
                display: Boolean(item.title) ? "block" : "none",
              }}
            >
              <Box
                css={{
                  width: "100%",
                  height: "100%",
                  paddingLeft: 20,
                  paddingRight: 20,
                  paddingBottom: 20,
                }}
              >
                <Typography
                  css={(theme: FacadeGood.CustomTheme) => ({
                    ...theme.typography.cardName,
                    fontSize: 18,
                    color: theme.colors.white,
                  })}
                >
                  {item.title}
                </Typography>
                <Typography css={{ marginTop: 4, fontSize: 14 }}>
                  {item.subtitle}
                </Typography>
              </Box>
            </Box>
          </ImageWrapper>
        );
      })}
    </ImageGrid>
  );
};

export default GalleryGrid;
