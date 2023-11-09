import { HeadFC, PageProps } from "gatsby";
import React from "react";
import {
  Main,
  Container,
  HeadText,
  HeadTextWrapper,
} from "../components/facade-good/facade-good";
import SiteFooter from "../components/footer/site-footer";
import SiteHeadder from "../components/header/site-header";
import { SEO } from "../components/seo";
import AppLayout from "../layout/app-layout";
import ScrollToTop from "../components/scroll/scroll-to-top";
import OrderForm from "../components/order-form/order-form";
import { OrderFormProvider } from "../components/order-form/order-form-provider";

const OrderPage: React.FC<PageProps> = () => {
  return (
    <AppLayout>
      <ScrollToTop />
      <SiteHeadder stycky />
      <Main css={{ minHeight: "100vh" }}>
        <Container css={{ paddingTop: 100 }}>
          <HeadTextWrapper>
            <HeadText>Форма для заказа мебельных фасадов.</HeadText>
          </HeadTextWrapper>
          <OrderFormProvider>
            <OrderForm />
          </OrderFormProvider>
        </Container>
      </Main>
      <SiteFooter />
    </AppLayout>
  );
};

export default OrderPage;

export const Head: HeadFC = () => <SEO title="Facade Good - Сделать заказ" />;
