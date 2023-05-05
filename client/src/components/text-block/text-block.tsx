import { css, useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { StaticImage } from "gatsby-plugin-image";
import React, { useEffect, useRef } from "react";
import * as styles from "./text-block.module.css";

import {
  Box,
  EmotionProps,
  HeadText,
  MotionDiv,
  SiteSection,
  Typography,
} from "../facade-good/facade-good";
import { FacadeGood } from "../../app-types";
import { useInView, useAnimation } from "framer-motion";

const Ul: React.FC<EmotionProps<HTMLUListElement>> = ({ css, ...props }) => (
  //@ts-ignore
  <ul css={css} {...props} />
);

const HeadTextWrapper: React.FC<
  EmotionProps<HTMLDivElement> & { margin?: string }
> = ({ children, margin }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start({
        width: "163px",
        transition: { duration: 0.4, delay: 0.4 },
      });
    }
  }, [controls, inView]);

  return (
    <MotionDiv
      ref={ref}
      style={{
        position: "relative",
        textAlign: "center",
      }}
    >
      {children}
      <MotionDiv
        css={(theme: FacadeGood.CustomTheme) => ({
          position: "absolute",
          bottom: "-30px",
          left: 0,
          transform: "translateX(0)",
          height: "6px",
          backgroundColor: theme.colors.button.hover,
          display: "inline-block",
        })}
        animate={controls}
      />
    </MotionDiv>
  );
};

// const HeadTextWrapper1 = styled(Box)((props) => ({
//   position: "relative",
//   textAlign: "center",
//   "::after": {
//     content: '""',
//     position: "absolute",
//     bottom: -30,
//     left: "50%",
//     transform: "translateX(-50%)",
//     [props.theme.mq.desktop]: {
//       left: 0,
//       transform: "translateX(0)",
//     },
//     width: "163px",
//     height: "6px",
//     backgroundColor: props!.theme?.colors.button.hover,
//     display: "inline-block",
//   },
// }));

const Container = styled(Box)((props) => ({
  paddingLeft: 15,
  paddingRight: 15,
  maxWidth: "100%",
  [props.theme.mq.desktop]: {
    maxWidth: props.theme.container.container_width / 2,
  },
}));

const TextBlock = React.memo(() => {
  const theme = useTheme() as FacadeGood.CustomTheme;
  return (
    <SiteSection
      id="text-block"
      css={{
        width: "100%",
        position: "relative",
        marginTop: "100px",
        display: "grid",
        gridTemplateColumns: "1fr",
        gridTemplateRows: "1fr auto",
        gridTemplateAreas: `
          "first"
          "second"
        `,
        [theme.mq.desktop]: {
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "1fr",
          gridTemplateAreas: `
            "second first"
          `,
        },
      }}
    >
      <Box css={{ gridArea: "first" }}>
        <Container>
          <HeadTextWrapper>
            <HeadText
              css={{
                textAlign: "center",
                [theme.mq.desktop]: {
                  textAlign: "left",
                },
              }}
            >
              Что мы производим
            </HeadText>
          </HeadTextWrapper>

          <Typography
            css={css`
              font-weight: 300;
              font-size: 16px;
              line-height: 168%;
              margin-top: 56px;
              text-align: justify;
            `}
          >
            У нас:
          </Typography>

          <Ul
            css={{
              listStyle: "none",
              padding: 0,
              "& li": {
                paddingLeft: 10,
                position: "relative",
                ":before": {
                  content: "''",
                  position: "absolute",
                  top: 9,
                  left: 0,
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: theme.colors.secondary,
                  boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.2)",
                },
              },
            }}
          >
            <li>
              <Typography
                css={css`
                  font-weight: 300;
                  font-size: 16px;
                  line-height: 168%;
                `}
              >
                Фасады для мебели из МДФ, кухонь, прихожих, спален, и т.д. Имеем
                опыт в работе с массивом более 15 лет.
              </Typography>
            </li>
            <li>
              <Typography
                css={css`
                  font-weight: 300;
                  font-size: 16px;
                  line-height: 168%;
                `}
              >
                Фасады всех самых популярных моделей таких как: Комо, Берта,
                Инфинити, Уника, Бостон из массива ольхи, дуба, ясеня.
              </Typography>
            </li>

            <li>
              <Typography
                css={css`
                  font-weight: 300;
                  font-size: 16px;
                  line-height: 168%;
                `}
              >
                Делаем фрезеровку мебельных фасадов МДФ.
              </Typography>
            </li>
          </Ul>

          <Typography
            css={css`
              font-weight: 300;
              font-size: 16px;
              line-height: 168%;
              margin-top: 20px;
            `}
          >
            Фасады производятся из массива термированной древесины или МДФ, что
            является залогом высокого и стабильного качества! Отделка мебельных
            фасадов производится только качественными немецкими и итальянскими
            материалами! Покрасим мебельные фасады МДФ в более чем 2000 цветов!
            Работаем с такими каталогами цветов как: RAL, WCP, NCS, CS. Так же
            сделаем индивидуальный подбор цвета по вашему образцу.
          </Typography>
          <Typography
            css={css`
              font-weight: 300;
              font-size: 16px;
              line-height: 168%;
              margin-top: 20px;
            `}
          >
            Полный контроль качества! На каждом этапе производства мебели из
            дерева мы проводим полный контроль на соответствие всем нормативным
            требованиям. Благодаря этому мы полностью уверены в высоком качестве
            нашей продукции. За счет высокотехнологичного оборудования мы
            выпускаем мебель по всем современным требованиям.
          </Typography>
        </Container>
      </Box>
      <Box css={{ gridArea: "second" }}>
        <StaticImage
          className={styles.Img}
          alt="Заказать кухню из МДФ"
          src="../../images/text-block/decor-img.png"
          quality={80}
        />
      </Box>
    </SiteSection>
  );
});

export default TextBlock;
