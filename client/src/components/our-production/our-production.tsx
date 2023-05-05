import styled from "@emotion/styled";
import { StaticImage } from "gatsby-plugin-image";
import React from "react";
import * as styles from "./our-production.module.css";
import {
  SiteSection,
  HeadTextWrapper,
  HeadText,
  Container,
  Box,
  Typography,
  MotionDiv,
} from "../facade-good/facade-good";
import { useTheme } from "@emotion/react";
import { FacadeGood } from "../../app-types";
import useViewport from "../../hooks/use-viewport";

const Item = styled(MotionDiv)((props) => ({
  width: "100%",
  height: "252px",
  backgroundColor: "#362F20",
  position: "relative",
  borderRadius: "900px",
  overflow: "hidden",
  [props.theme.mq.desktop]: {
    width: "333px",
    height: "505px",
  },
}));

const ImgBox = styled(Box)((props) => ({
  width: "100%",
  height: "100%",
  position: "absolute",
  top: 0,
  left: 0,
  opacity: 0.1,
  zIndex: 1,
}));

const ItemText = styled(Box)((props) => ({
  width: "100%",
  height: "100%",
  color: props.theme.colors.white,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  gap: 20,
}));

const Text1 = styled(Typography)((props) => ({
  fontWeight: 400,
  fontSize: "20px",
  lineHeight: "24px",
  fontStyle: "normal",
  textAlign: "center",
  zIndex: 2,
}));
const Text2 = styled(Typography)((props) => ({
  maxWidth: 249,
  fontWeight: 300,
  fontSize: "16px",
  lineHeight: "168%",
  fontStyle: "normal",
  textAlign: "center",
  zIndex: 2,
}));

const Block1Variants = {
  offscreen: {
    x: -80,
  },
  onscreen: {
    x: 0,
    transition: {
      type: "spring",
      bounce: 0.2,
      duration: 0.9,
    },
  },
};
const Block2Variants = {
  offscreen: {
    scale: 0.8,
  },
  onscreen: {
    scale: 1,
    transition: {
      type: "spring",
      bounce: 0.2,
      duration: 0.9,
    },
  },
};
const Block3Variants = {
  offscreen: {
    x: 80,
  },
  onscreen: {
    x: 0,
    transition: {
      type: "spring",
      bounce: 0.2,
      duration: 0.9,
    },
  },
};

const content = [
  {
    title: `С чего все начиналось?`,
    text: `Наше производство берет начало с 1992 года и
    специализировалось на изготовлении накладных мебельных декоров
    и штамповки. С 2000-х начали выпускать черновую мебельную
    заготовку (ЧМЗ). С 2007 настроили изготовление мебельных
    фасадов высокого качества.`,
  },
  {
    title: "Чего мы достигли",
    text: `Опыт нашей работы в сфере мебельной промышленности уже более 20 лет.
    У нас:
    1. Производство фасадов МДФ для всех видов мебели.
    2. Использование разнообразных видов массива: ольха, дуб, ясень.
    3. Использование термированной древесины для обеспечения высшего качества.
    4. Задействуем при производстве немецкие и итальянские материалы. 
    5. Индивидуальная фрезеровка мебели.
    Мы всегда стремимся следить за трендами на мебельном рынке и развивать свое производство.`,
  },
  {
    title: "Стремимся к идеалу",
    text: `Мы не стоим на месте! Находимся всегда в поиске новых
    технологий и решений. Расширяя производство постоянно улучшаем
    качество выпускаемой продукции и используем самые качественные
    материалы. Производитель мебели FACADE-GOOD всегда работает на
    лучший результат для вас!`,
  },
];

const OurProduction = React.memo(() => {
  const theme = useTheme() as FacadeGood.CustomTheme;
  const { width } = useViewport();
  const is_animate = width > 1430;
  return (
    <SiteSection id="our-production" css={{ marginTop: 100 }}>
      <Container>
        <HeadTextWrapper>
          <HeadText>История компании:</HeadText>
        </HeadTextWrapper>
        {is_animate ? (
          <MotionDiv
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: "all" }}
            css={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 56,
              gap: 30,
              alignItems: "center",
              flexDirection: "column",
              [theme.mq.desktop]: {
                flexDirection: "row",
              },
            }}
          >
            <Item variants={Block1Variants}>
              <ItemText>
                <Text1>{content[0].title}</Text1>
                <Text2>{content[0].text}</Text2>
              </ItemText>
              <ImgBox>
                <StaticImage
                  className={styles.Img}
                  alt="Заказать кухню из массива"
                  src="../../images/order-block/order-block-img1.png"
                  quality={60}
                />
              </ImgBox>
            </Item>

            <Item
              variants={Block2Variants}
              css={{
                width: "100%",
                height: "252px",
                backgroundColor: "#394C60",
                [theme.mq.desktop]: {
                  height: 627,
                  width: 413,
                },
              }}
            >
              <ImgBox>
                <StaticImage
                  className={styles.Img}
                  alt="Заказать кухню из массива"
                  src="../../images/order-block/order-block-img1.png"
                  quality={60}
                />
              </ImgBox>
              <ItemText>
                <Text1>{content[1].title}</Text1>
                <Text2>
                  Опыт нашей работы в сфере мебельной промышленности уже более
                  20 лет. <br />У нас: <br />
                  1. Производство фасадов МДФ для всех видов мебели. <br />
                  2. Использование разнообразных видов массива: ольха, дуб,
                  ясень. <br />
                  3. Использование термированной древесины для обеспечения
                  высшего качества. <br />
                  4. Задействуем при производстве немецкие и итальянские
                  материалы. <br />
                  5. Индивидуальная фрезеровка мебели. Мы всегда стремимся
                  следить за трендами на мебельном рынке и развивать свое
                  производство.
                </Text2>
              </ItemText>
            </Item>

            <Item
              variants={Block3Variants}
              css={{
                backgroundColor: "#16191C",
              }}
            >
              <ImgBox>
                <StaticImage
                  className={styles.Img}
                  alt="Заказать кухню из массива"
                  src="../../images/order-block/order-block-img1.png"
                  quality={60}
                />
              </ImgBox>
              <ItemText>
                <Text1>{content[2].title}</Text1>
                <Text2>{content[2].text}</Text2>
              </ItemText>
            </Item>
          </MotionDiv>
        ) : (
          <Box
            css={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 56,
              gap: 30,
              alignItems: "center",
              flexDirection: "column",
              [theme.mq.desktop]: {
                flexDirection: "row",
              },
            }}
          >
            <Item>
              <ItemText>
                <Text1>С чего все начиналось?</Text1>
                <Text2>Наше производство берет начало с 1992 года.</Text2>
              </ItemText>
              <ImgBox>
                <StaticImage
                  className={styles.Img}
                  alt="Заказать кухню из массива"
                  src="../../images/order-block/order-block-img1.png"
                  quality={60}
                />
              </ImgBox>
            </Item>

            <Item
              css={{
                width: "100%",
                height: "252px",
                backgroundColor: "#394C60",
                [theme.mq.desktop]: {
                  height: 627,
                  width: 413,
                },
              }}
            >
              <ImgBox>
                <StaticImage
                  className={styles.Img}
                  alt="Заказать кухню из массива"
                  src="../../images/order-block/order-block-img1.png"
                  quality={60}
                />
              </ImgBox>
              <ItemText>
                <Text1>Чего мы достигли</Text1>
                <Text2>
                  Использование разнообразных видов массива. Выпускаем самые
                  современные фасады МДФ для ваших шкафов и кухонь
                </Text2>
              </ItemText>
            </Item>

            <Item
              css={{
                backgroundColor: "#16191C",
              }}
            >
              <ImgBox>
                <StaticImage
                  className={styles.Img}
                  alt="Заказать кухню из массива"
                  src="../../images/order-block/order-block-img1.png"
                  quality={60}
                />
              </ImgBox>
              <ItemText>
                <Text1>Стремимся к идеалу</Text1>
                <Text2>
                  Мы не стоим на месте! Находимся всегда в поиске новых
                  технологий и решений.
                </Text2>
              </ItemText>
            </Item>
          </Box>
        )}
      </Container>
    </SiteSection>
  );
});

export default OurProduction;
