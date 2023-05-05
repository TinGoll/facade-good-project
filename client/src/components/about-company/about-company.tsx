import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import React from "react";
import { FacadeGood } from "../../app-types";
import useViewport from "../../hooks/use-viewport";
import {
  SiteSection,
  Container,
  HeadTextWrapper,
  HeadText,
  Box,
  Typography,
  MotionDiv,
  EmotionProps,
} from "../facade-good/facade-good";
import SvgDeal from "./svg-deal";
import SvgFurniture from "./svg-furniture";
import SvgSammill from "./svg-sammill";
import SvgTrophy from "./svg-trophy";

export const AboutCompanyCard = styled(MotionDiv)((props) => ({
  padding: 20,
  width: "100%",
  display: "flex",
  flexDirection: "row",
  gap: 20,
  [props.theme.mq.tablet]: { flexDirection: "column", width: 250 },
}));

export const AboutCompanyIconBox = styled(Box)((props) => ({
  width: 73,
  height: 73,
  padding: 12,
  border: "1px solid #DEDEDE",
  boxShadow: "0px 12px 26px rgba(0, 0, 0, 0.04)",
  backdropFilter: "blur(5px)",
  borderRadius: "10px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginLeft: "auto",
  marginRight: "auto",
  [props.theme.mq.tablet]: { width: 172, height: 172, padding: 37 },
}));

export const AboutCompanyTextBox = styled(Box)((props) => ({
  textAlign: "left",
  [props.theme.mq.tablet]: { textAlign: "center" },
}));

export const MotionTypography = styled(motion.p)<
  EmotionProps<HTMLParagraphElement> &
    React.ClassAttributes<HTMLParagraphElement>
>((props) => ({}));

const cardVariants: VariantsObject = {
  offscreen: {
    y: 100,
  },
  onscreen: {
    y: 0,
    transition: {
      type: "spring",
      bounce: 0.7,
      duration: 0.8,
    },
  },
};

const textVariants = {
  hidden: {
    y: -100, // начальное значение y, за пределами экрана
    opacity: 0,
  },
  onscreen: {
    y: 0, // конечное значение y, на нужной позиции
    opacity: 1,
    transition: {
      delay: 0.4, // задержка перед началом анимации
      type: "spring",
      stiffness: 120,
      damping: 10,
    },
  },
};

const aboutCompanyCards = [
  {
    icon: <SvgTrophy />,
    title: `Почему нас выбирают!`,
    description: `Цена - качество! У нас вы можете купить мебель недорого от производителя. 
    Мы всегда стараемся совершенствовать качество выпускаемой продукции. 
    Мы имеем большой опыт в сфере деревообработки.`,
    variants: {
      ...cardVariants,
      onscreen: {
        ...cardVariants.onscreen,
        transition: {
          ...cardVariants.onscreen.transition,
          delay: 0.1,
        },
      },
    },
  },
  {
    icon: <SvgFurniture />,
    title: "Индивидуальный дизайн!",
    description: `Мебель с фрезеровкой на фасадах и любым оттенком по вашему желанию! 
    Мы очень ценим индивидуальность наших клиентов. Производим именно то, что желает наш клиент.`,
    variants: {
      ...cardVariants,
      onscreen: {
        ...cardVariants.onscreen,
        transition: {
          ...cardVariants.onscreen.transition,
          delay: 0.25,
        },
      },
    },
  },
  {
    icon: <SvgSammill />,
    title: "Качество и возможности!",
    description: `Ваше желание - наши возможности! Благодаря многолетнему опыту в сфере изготовления
    мебельных фасадов из МДФ мы имеем большое количество нужного оборудования, чтобы
    исполнить все ваши желания.`,
    variants: {
      ...cardVariants,
      onscreen: {
        ...cardVariants.onscreen,
        transition: {
          ...cardVariants.onscreen.transition,
          delay: 0.35,
        },
      },
    },
  },
  {
    icon: <SvgDeal />,
    title: "Мы работаем для вас!",
    description: `Мы ценим своих клиентов! Для нас очень важно, чтобы клиент всегда оставался довольным.
    Поэтому всегда стараемся найти максимально удобные условия для вас и учитываем ваши пожелания и интересы.`,
    variants: {
      ...cardVariants,
      onscreen: {
        ...cardVariants.onscreen,
        transition: {
          ...cardVariants.onscreen.transition,
          delay: 0.45,
        },
      },
    },
  },
];

const AboutCompany = React.memo(() => {
  const theme = useTheme() as FacadeGood.CustomTheme;
  const { width } = useViewport();

  const is_animate = width > 1230;

  return (
    <SiteSection id="about-company" css={{ paddingTop: 100 }}>
      <Container>
        <HeadTextWrapper>
          <HeadText>FACADE-GOOD - качество в мельчайших деталях</HeadText>
        </HeadTextWrapper>

        {is_animate ? (
          <MotionDiv
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: "all" }}
            css={{
              marginTop: 56,
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "start",
              flexWrap: "wrap",
              [theme.mq.largeDesktop]: { justifyContent: "space-between" },
            }}
          >
            {aboutCompanyCards.map((item, index) => (
              <AboutCompanyCard key={index} variants={item.variants}>
                <AboutCompanyIconBox>{item.icon}</AboutCompanyIconBox>

                <AboutCompanyTextBox>
                  <Typography
                    css={{
                      fontWeight: 400,
                      fontSize: "20px",
                      lineHeight: "24px",
                    }}
                  >
                    {item.title}
                  </Typography>

                  <MotionTypography
                    variants={textVariants}
                    initial="hidden"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: "all" }}
                    css={{
                      fontWeight: 300,
                      fontSize: "16px",
                      lineHeight: "168%",
                      color: theme.colors.black,
                      marginTop: 15,
                    }}
                  >
                    {item.description}
                  </MotionTypography>
                </AboutCompanyTextBox>
              </AboutCompanyCard>
            ))}
          </MotionDiv>
        ) : (
          <Box
            css={{
              marginTop: 56,
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
              [theme.mq.largeDesktop]: { justifyContent: "space-between" },
            }}
          >
            {aboutCompanyCards.map((item, index) => (
              <AboutCompanyCard key={index}>
                <AboutCompanyIconBox>{item.icon}</AboutCompanyIconBox>
                <AboutCompanyTextBox>
                  <Typography
                    css={{
                      fontWeight: 400,
                      fontSize: "20px",
                      lineHeight: "24px",
                    }}
                  >
                    {item.title}
                  </Typography>

                  <Typography
                    css={{
                      fontWeight: 300,
                      fontSize: "16px",
                      lineHeight: "168%",
                      color: theme.colors.black,
                      marginTop: 15,
                    }}
                  >
                    {item.description}
                  </Typography>
                </AboutCompanyTextBox>
              </AboutCompanyCard>
            ))}
          </Box>
        )}
      </Container>
    </SiteSection>
  );
});

export default AboutCompany;

export interface Offscreen {
  y: number;
}

export interface Transition {
  type: string;
  bounce: number;
  duration: number;
  delay?: number;
}

export interface Onscreen {
  y: number;
  transition: Transition;
}

export interface VariantsObject {
  offscreen: Offscreen;
  onscreen: Onscreen;
}
