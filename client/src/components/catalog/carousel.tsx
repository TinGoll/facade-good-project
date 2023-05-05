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
  CardDescription,
  Divider,
  CardParams,
  CardParamItem,
  CardFooter,
  CardPrice,
  CardButton,
  CardSchemeBox,
} from "../facade-good/facade-good";
import { GalleryImages } from "../../gatsby-plugin-apollo/queries/gallery.query";
import { navigate } from "gatsby";
import { CatalogCategory } from "./catalog-links";

const LINK_TYPE1: CatalogCategory = "Массив";
const LINK_TYPE2: CatalogCategory = "МДФ";
const LINK_TYPE3: CatalogCategory = "Комплектующие";

interface CarouselProps {
  loading?: boolean;
  items?: GalleryImages.Item[];
  error?: string;
}

const Carousel: React.FC<CarouselProps> = ({ items = [], loading, error }) => {
  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Ошибка загрузки... {error}</div>;
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
              <CardTitle>{item.title}</CardTitle>
              <CardImgBox>
                {images.length && (
                  <img
                    className="SwiperImg"
                    src={`${process.env.GATSBY_API_HOST}:${process.env.GATSBY_API_PORT}/images/${images[0].filename}.webp`}
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
                    src={`${process.env.GATSBY_API_HOST}:${process.env.GATSBY_API_PORT}/images/${scheme[0].filename}.webp`}
                    alt={item.title}
                  />
                )}
              </CardSchemeBox>
              <CardFooter>
                <CardPrice>{item.params ? item.params : ""}</CardPrice>
                {/* <CardButton>Подробнее</CardButton> */}
              </CardFooter>
            </Card>
          </SwiperSlide>
        );
      })}

      {/* <div className="swiper-button-prev"></div>
      <div className="swiper-button-next"></div> */}
    </Swiper>
  );
};

export default Carousel;

/**
 * <SwiperSlide key={index}>
          <Card>
            <CardTitle>Название товара</CardTitle>
            <CardImgBox>
              <StaticImage
                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
                }}
                alt="Картинка"
                src="../../images/background/facade-good-bg.jpg"
                loading="lazy"
              />
            </CardImgBox>
            <CardDescription>
              Lorem ipsum dolor sit amet, consectetur.
            </CardDescription>
            <Divider my={15} />
            <CardParams>
              <CardParamItem>234х546</CardParamItem>
              <CardParamItem>234х546</CardParamItem>
              <CardParamItem>234х546</CardParamItem>
            </CardParams>
            <CardFooter>
              <CardPrice>от 5000 р.</CardPrice>
              <CardButton>Подробнее</CardButton>
            </CardFooter>
          </Card>
        </SwiperSlide>
 */
