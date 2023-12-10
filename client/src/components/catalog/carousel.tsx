import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper";

// Import Swiper styles
import "swiper/swiper-bundle.min.css";
import "./carousel.css";

import {
  Card,
  CardTitle,
  CardImgBox,
  CardFooter,
  CardPrice,
  CardSchemeBox,
  Typography,
  Box,
} from "../facade-good/facade-good";
import { GalleryImages } from "../../gatsby-plugin-apollo/queries/gallery.query";
import { navigate } from "gatsby";
import { CatalogCategory } from "./catalog-links";
import { GATSBY_API_HOST, GATSBY_API_PORT } from "../../settings/api.settings";
import { useTheme } from "@emotion/react";
import { FacadeGood } from "../../app-types";
import { getSubtitle } from "../../utils/get-subtitle";

const LINK_TYPE1: CatalogCategory = "Массив";
const LINK_TYPE2: CatalogCategory = "МДФ";
const LINK_TYPE3: CatalogCategory = "Комплектующие";

interface CarouselProps {
  loading?: boolean;
  items?: GalleryImages.Item[];
  error?: string;
}

const Carousel: React.FC<CarouselProps> = ({ items = [], loading, error }) => {
  const theme = useTheme() as FacadeGood.CustomTheme;

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return (
      <div>
        Ошибка загрузки: {`${GATSBY_API_HOST}:${GATSBY_API_PORT} - ${error}`}
      </div>
    );
  }

  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={38}
      breakpoints={{
        640: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 38,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 38,
        },
      }}
      pagination={{
        type: "bullets",
        clickable: true,
      }}
      navigation={{
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      }}
      autoplay={{
        delay: 5000,
        disableOnInteraction: true,
      }}
      loop
      modules={[Navigation, Pagination, Autoplay]}
      className="mySwiper"
    >
      {items.map((item) => {
        const images = [
          ...(item?.images?.filter((i) => i.index === 0) || []),
        ].sort((a, b) => Number(b.id) - Number(a.id));
        const scheme = [
          ...(item?.images?.filter((i) => i.index === 1) || []),
        ].sort((a, b) => Number(b.id) - Number(a.id));

        let link = "/";
        if (item.category === LINK_TYPE1) {
          link = "/catalog/massive";
        }
        if (item.category === LINK_TYPE2) {
          link = "/catalog/mdf";
        }
        if (item.category === LINK_TYPE3) {
          link = "/catalog/accessories";
        }

        return (
          <SwiperSlide key={item.id}>
            <Card
              css={{
                cursor: "pointer",
                ":hover": {
                  boxShadow: "0px 8px 12px rgba(0, 0, 0, 0.06)",
                },
              }}
              onClick={() => navigate(link)}
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
              {/* <CardDescription>{item.subtitle}</CardDescription> */}
              {/* <Divider my={15} /> */}
              {/* <CardParams>
                <CardParamItem>234х546</CardParamItem>
                <CardParamItem>234х546</CardParamItem>
                <CardParamItem>234х546</CardParamItem>
              </CardParams> */}

              {scheme.length ? (
                <CardSchemeBox css={{ marginTop: 10 }} schemeheight={"auto"}>
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
                <CardPrice>{item.params ? `${item.params}` : ""}</CardPrice>
              </CardFooter>
            </Card>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default Carousel;
