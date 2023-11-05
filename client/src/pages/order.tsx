import { HeadFC, PageProps } from "gatsby";
import React from "react";
import { FacadeGood } from "../app-types";
import { Main, Container } from "../components/facade-good/facade-good";
import SiteFooter from "../components/footer/site-footer";
import SiteHeadder from "../components/header/site-header";
import { SEO } from "../components/seo";
import AppLayout from "../layout/app-layout";
import ScrollToTop from "../components/scroll/scroll-to-top";


const OrderPage: React.FC<PageProps> = ({ location, params }) => {
  return (
    <AppLayout>
      <ScrollToTop />
      <SiteHeadder stycky />
      <Main
        css={{
          minHeight: "100vh",
        }}
      >
        <Container
          css={(theme: FacadeGood.CustomTheme) => ({
            paddingTop: 100,
          })}
        >

        </Container>
      </Main>
      <SiteFooter />
    </AppLayout>
  );
};

export default OrderPage;

export const Head: HeadFC = () => <SEO title="Facade Good - Сделать заказ" />;
