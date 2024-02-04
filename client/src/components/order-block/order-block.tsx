import { css, useTheme } from "@emotion/react";
import React from "react";
import { FacadeGood } from "../../app-types";
import {
  Box,
  Container,
  PrimaryButton,
  SiteSection,
  Typography,
} from "../facade-good/facade-good";
import { StaticImage } from "gatsby-plugin-image";
import * as styles from "./order-block.module.css";
import { navigate } from "gatsby";

const OrderBlock = React.memo(() => {
  const theme = useTheme() as FacadeGood.CustomTheme;

  const flexBoxStyles = {
    padding: "15px",
    paddingTop: "60px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "column",
    zIndex: 1,
    gap: 40,
    [theme.mq.tablet]: { gap: 100, padding: "40px" },
  } as any;

  return (
    <>
      <Box id="order" />
      <SiteSection
        css={css`
          width: 100%;
          position: relative;
          margin-top: 60px;
        `}
      >
        <Box
          css={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            [theme.mq.tablet]: { flexDirection: "row" },
          }}
        >
          <Box
            css={{
              backgroundColor: theme.colors.bg1,
              width: "100%",
              height: "100%",
              [theme.mq.tablet]: {
                width: "50%",
                height: "100%",
              },
            }}
          >
            <StaticImage
              className={styles.Img}
              alt="Заказать кухню из массива"
              src="../../images/order-block/order-block-img1.png"
              quality={60}
            />
          </Box>
          <Box
            css={{
              backgroundColor: theme.colors.bg0,
              width: "100%",
              height: "100%",
              [theme.mq.tablet]: {
                width: "50%",
                height: "100%",
              },
            }}
          >
            <StaticImage
              className={styles.Img}
              alt="Заказать кухню из МДФ"
              src="../../images/order-block/order-block-img2.png"
              quality={60}
            />
          </Box>
        </Box>

        <Container
          css={{
            position: "relative",
            height: "100%",
            display: "grid",
            gridTemplateColumns: "1fr",
            gridTemplateRows: "1fr",
            [theme.mq.tablet]: { gridTemplateColumns: "1fr 1fr" },
          }}
        >
          <Box css={flexBoxStyles}>
            <Box>
              <Typography
                css={{
                  ...theme.typography.headerBlockBlack,
                  textAlign: "center",
                  fontSize: "32px",
                  [theme.mq.desktop]: { fontSize: "48px" },
                }}
              >
                Фасады из массива дуба, ясеня, ольхи
              </Typography>
              <Typography
                css={{
                  fontWeight: 400,
                  lineHeight: "36px",
                  fontSize: "18px",
                  textAlign: "center",
                  marginTop: 20,
                  color: theme.colors.white,
                  [theme.mq.desktop]: { fontSize: "28px" },
                }}
              >
                Для тех кто ценит натуральную древесину
              </Typography>
            </Box>
            <Box>
              <PrimaryButton
                onClick={() => navigate("/order")}
                css={(theme) => ({ width: 210 })}
              >
                Сделать заказ
              </PrimaryButton>
            </Box>
          </Box>

          <Box css={flexBoxStyles}>
            <Box>
              <Typography
                css={{
                  ...theme.typography.headerBlockBlack,
                  textAlign: "center",
                  fontSize: "32px",
                  [theme.mq.desktop]: { fontSize: "48px" },
                }}
              >
                Фасады из МДФ – любая фрезеровка
              </Typography>
              <Typography
                css={{
                  fontWeight: 400,
                  lineHeight: "36px",
                  fontSize: "18px",
                  textAlign: "center",
                  marginTop: 20,
                  color: theme.colors.white,
                  [theme.mq.desktop]: { fontSize: "28px" },
                }}
              >
                Изготовим по вашему дизайну, МДФ фасады, панели, декоративные
                элементы интерьера
              </Typography>
            </Box>

            <Box>
              <PrimaryButton
                onClick={() => navigate("/order")}
                css={(theme) => ({ width: 210 })}
              >
                Сделать заказ
              </PrimaryButton>
            </Box>
          </Box>
        </Container>
      </SiteSection>
    </>
  );
});

export default OrderBlock;
