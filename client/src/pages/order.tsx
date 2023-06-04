import { HeadFC, PageProps } from "gatsby";
import React from "react";
import { FacadeGood } from "../app-types";
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

const OrderPage: React.FC<PageProps> = ({ location, params }) => {
  const params1 = new URLSearchParams(location.search);
  const parameter1 = params1.get("test");

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

/**
 *  <Select
            outline
            css={{ marginTop: 40, marginBottom: 40 }}
            value={selectValue[0]}
            onChange={(opt) => selectValue[1](opt)}
            options={massiv}
            placeholder="Массив"
          />
          <Select
            outline
            value={selectValue2[0]}
            onChange={(opt) => selectValue2[1](opt)}
            options={options}
            placeholder="Массив"
          />
          <Select
            outline
            value={selectValue3[0]}
            onChange={(opt) => selectValue3[1](opt)}
            options={options}
            placeholder="Третий"
          />
          <Checkbox checked={false} label="Сверлить" />
          <Textbox />
          <Grid columns={4} gap={16}>
            <Item>Item 1</Item>
            <Item>Item 2</Item>
            <Item>Item 3</Item>
            <Item>Item 4</Item>
            <Item>Item 5</Item>
            <Item>Item 6</Item>
            <Item>Item 7</Item>
            <Item>Item 8</Item>
            </Grid>
 */
