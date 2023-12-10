import { css, useTheme } from "@emotion/react";
import React, { FC, useEffect, useState } from "react";
import { FacadeGood } from "../../app-types";
import {
  Box,
  ButtonArrowDown,
  Container,
  EmotionProps,
} from "../facade-good/facade-good";
import { StaticImage } from "gatsby-plugin-image";
import styled from "@emotion/styled";
import { motion } from "framer-motion";

const H1 = styled(motion.h1)((props: EmotionProps<HTMLHeadingElement>) => ({
  ...props.theme?.typography.heading,
  fontSize: 40,
  margin: 0,
  padding: 0,
  lineHeight: "54px",
  textAlign: "center",
  [props.theme!.mq.desktop]: {
    fontSize: 90,
    lineHeight: "121px",
  },
}));

const H2 = styled(motion.h2)((props: EmotionProps<HTMLHeadingElement>) => ({
  ...props.theme?.typography.heading2,
  fontSize: 20,
  margin: 0,
  marginTop: 10,
  maxWidth: 569,
  textAlign: "center",
  [props.theme!.mq.desktop]: {
    fontSize: 32,
    marginTop: 25,
  },
}));

const Section = styled(motion.div)(
  (props: EmotionProps<HTMLHeadingElement>) => ({})
);

interface TextBoxProps {
  titleValue: number;
}
const TextBox: FC<TextBoxProps> = React.memo(({ titleValue }) => {
  const bannerVariants = {
    initial: {
      opacity: 1,
      filter: "blur(0px)",
      transform: "scale(1)",
    },
    animate: {
      opacity: 1 - Number(titleValue),
      filter: `blur(${Number(titleValue) * 10}px)`,
      transform: `scale(${1 + titleValue / 4})`,
    },
  };

  return (
    <Box
      css={css`
        margin-bottom: auto;
        margin-top: auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      `}
    >
      <H1
        initial="initial"
        animate="animate"
        variants={bannerVariants}
        transition={{ duration: 0.05, stiffness: 100, damping: 0 }}
      >
        FACADE-GOOD
      </H1>
      <H2
        initial="initial"
        animate="animate"
        variants={bannerVariants}
        transition={{ duration: 0.05, stiffness: 100, damping: 0 }}
      >
        Ваш дизайн – наша работа. Фасады для мебели из массива и МДФ
      </H2>
    </Box>
  );
});

const Banner = React.memo(() => {
  const theme = useTheme() as FacadeGood.CustomTheme;

  const bannerHeight = 500; /* высота баннера */
  const [titleValue, setTitleValue] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== "undefined") {
        setTitleValue(
          window.pageYOffset / bannerHeight > 1
            ? 1
            : window.pageYOffset / bannerHeight
        );
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  return (
    <Section
      id="banner"
      css={css`
        height: ${theme.bannerSize}vh;
        width: 100%;
        position: fixed;
        z-index: -2;
        ::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          display: block;
          width: 100%;
          height: 100%;
          background: ${theme.colors.bg0};
          opacity: 0.7;
          z-index: -2;
        }
      `}
    >
      <Container
        css={css`
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          height: ${theme.bannerSize}vh;
          margin: 0 auto;
          color: white;
          display: flex;
          flex-direction: column;
          justify-content: end;
          align-items: center;
          z-index: 1;
        `}
      >
        <TextBox titleValue={titleValue} />
        <ButtonArrowDown
          css={{ marginBottom: 100, zIndex: 1000, pointerEvents: "auto" }}
          onClick={
            () =>
              document
                ?.querySelector("#catalog") // выбираем нужный элемент, к которому нужно прокрутить
                ?.scrollIntoView({ behavior: "smooth" }) // прокручиваем к элементу с плавной анимацией
          }
        />
      </Container>

      <StaticImage
        src="../../images/background/facade-good-bg2.jpg"
        alt="Hero Image"
        style={{
          width: "100vw",
          height: `${theme.bannerSize}vh`,
          zIndex: -3,
          objectPosition: "bottom",
        }}
        quality={80}
        formats={["auto", "webp", "avif"]}
        objectFit="cover"
        objectPosition="left"
      />
    </Section>
  );
});

export default Banner;
