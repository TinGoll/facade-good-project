import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import AppLayout from "../layout/app-layout";
import Banner from "../components/banner/banner";
import { Box, Main } from "../components/facade-good/facade-good";
import Catalog from "../components/catalog/catalog";
import { FacadeGood } from "../app-types";
import OrderBlock from "../components/order-block/order-block";
import AboutCompany from "../components/about-company/about-company";
import TextBlock from "../components/text-block/text-block";
import HowToWork from "../components/how-to-work/how-to-work";
import PhotoGallery from "../components/image-grid/photo-gallery";
import OurProduction from "../components/our-production/our-production";
import MapComponent from "../components/map-component/map-componsnt";
import SiteFooter from "../components/footer/site-footer";
import SiteHeadder from "../components/header/site-header";
import { SEO } from "../components/seo";
import { useEffect } from "react";


const IndexPage: React.FC<PageProps> = ({ location }) => {

  // const params1 = new URLSearchParams(location.search);
  // const parameter1 = params1.get("test");

  useEffect(() => {
    if (location.state && (location.state as any).scrollToAnchor) {
      const anchorId = (location.state as any).anchorId;
      const element = document.getElementById(anchorId);
      if (element) {
        try {
          setTimeout(() => {
            element.scrollIntoView({ behavior: "smooth" });
          }, 100);
        } catch (error) {
          console.error(error);
        }
      }
    }
  }, [location]);

  return (
    <AppLayout>
      <SiteHeadder />
      <Banner />
      <Main
        css={(theme) => ({
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          transform: `translateY(${theme?.bannerSize}%)`,
          background: theme!.colors.white,
          width: "100%",
        })}
      >
        <Box
          css={(theme: FacadeGood.CustomTheme) => ({
            width: "100%",
            backgroundColor: theme.colors.white,
          })}
        >
          <Catalog />
          <OrderBlock />
          <AboutCompany />
          <TextBlock />
          <HowToWork />
          <PhotoGallery />
          <OurProduction />
          <MapComponent />
          <SiteFooter />
        </Box>
      </Main>
    </AppLayout>
  );
};

export default IndexPage;

export const Head: HeadFC = () => (
  <SEO title="Facade Good - фасады из массива и МДФ" />
);

/**
 * На нашем сайте вы найдете информацию о производстве качественных фасадов из МДФ и массива, а также широкий ассортимент комплектующих для создания и установки фасадов. Мы предлагаем индивидуальный подход к каждому заказчику, гибкую ценовую политику и быстрое изготовление изделий. Закажите фасады для вашей мебели у профессионалов с многолетним опытом работы в этой области.
 */
