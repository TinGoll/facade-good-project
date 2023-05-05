import { HeadFC, PageProps } from "gatsby";
import React from "react";
import { FacadeGood } from "../app-types";
import {
  Main,
  Container,
  Typography,
} from "../components/facade-good/facade-good";
import SiteFooter from "../components/footer/site-footer";
import SiteHeadder from "../components/header/site-header";
import { SEO } from "../components/seo";
import AppLayout from "../layout/app-layout";

const AccessoriesPage: React.FC<PageProps> = ({ location, params }) => {
  const params1 = new URLSearchParams(location.search);
  const parameter1 = params1.get("test");

  return (
    <AppLayout>
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
          <Typography id="#create" css={{ marginTop: 60, fontSize: 28 }}>
            В разработке...
          </Typography>
        </Container>
      </Main>
      <SiteFooter />
    </AppLayout>
  );
};

export default AccessoriesPage;

export const Head: HeadFC = () => <SEO title="Facade Good - Сделать заказ" />;
