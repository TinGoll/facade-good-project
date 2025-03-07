import { HeadFC, navigate } from "gatsby";
import React from "react";
import { SEO } from "../components/seo";
import AppLayout from "../layout/app-layout";
import SiteHeadder from "../components/header/site-header";
import {
  Box,
  CardButton,
  Container,
  HeadText,
  HeadTextWrapper,
  Main,
} from "../components/facade-good/facade-good";
import SiteFooter from "../components/footer/site-footer";
import { FacadeGood } from "../app-types";
import { useQuery } from "@apollo/client";
import {
  GalleryImages,
  GALLERY_GET_ALL,
} from "../gatsby-plugin-apollo/queries/gallery.query";
import GalleryGrid from "../components/image-grid/gallery-grid";
import ScrollToTop from "../components/scroll/scroll-to-top";
import { useImageModal } from "../stores";

const GalleryPage = () => {
  const { data, loading, error } = useQuery<GalleryImages.Root>(
    GALLERY_GET_ALL,
    {
      variables: {
        category: "Галерея",
      },
    }
  );
  const [items, setItems] = React.useState<GalleryImages.Item[]>([]);

  const setImage = useImageModal((store) => store.setImage);

  React.useEffect(() => {
    if (!loading) {
      if (data) {
        const { findAll: arr = [] } = data;
        const sortedArray = [...arr].sort(
          (a, b) => Number(b.id) - Number(a.id)
        );
        setItems(sortedArray);
      }
    }
  }, [loading, data]);

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
            paddingBottom: 100,
          })}
        >
          <Box>
            <CardButton
              onClick={() =>
                navigate("/", {
                  state: { scrollToAnchor: true, hash: "catalog" },
                })
              }
              dir="left"
            >
              Назад
            </CardButton>
          </Box>
          <Box css={{ marginBottom: 60 }}>
            <HeadTextWrapper>
              <HeadText
                css={(theme: FacadeGood.CustomTheme) => ({
                  fontSize: 32,
                  [theme.mq.desktop]: {
                    fontSize: 48,
                  },
                })}
              >
                Галерея наших работ.
              </HeadText>
            </HeadTextWrapper>
          </Box>
          <GalleryGrid setModalItem={setImage} items={items} imagesize={380} />
        </Container>
      </Main>
      <SiteFooter />
    </AppLayout>
  );
};

export default GalleryPage;

export const Head: HeadFC = () => <SEO title="Facade Good - Галерея." />;
