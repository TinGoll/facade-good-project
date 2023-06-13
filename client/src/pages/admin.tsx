import React from "react";

import { PageProps, HeadFC } from "gatsby";

import { EmotionProps, Main } from "../components/facade-good/facade-good";
import SiteHeadder from "../components/header/site-header";
import ScrollToTop from "../components/scroll/scroll-to-top";
import AppLayout from "../layout/app-layout";
import { SEO } from "../components/seo";
import AdminPanel from "../components/admin-panel/admin-panel";
import styled from "@emotion/styled";

const Structure = styled("div")<EmotionProps<HTMLDivElement>>``;

const OrderPage: React.FC<PageProps> = ({ location, params }) => {
  const params1 = new URLSearchParams(location.search);
  const parameter1 = params1.get("test");

  return (
    <AppLayout>
      <ScrollToTop />
      <Structure>
        <SiteHeadder stycky />
        <Main>
          <AdminPanel />
        </Main>
        {/* <SiteFooter /> */}
      </Structure>
    </AppLayout>
  );
};

export default OrderPage;

export const Head: HeadFC = () => <SEO title="Facade Good - Админка" />;
