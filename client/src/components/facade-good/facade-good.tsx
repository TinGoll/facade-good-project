import { css, Interpolation } from "@emotion/react";
import styled from "@emotion/styled";
import { GatsbyLinkProps, Link } from "gatsby";

import React, { useEffect, useRef } from "react";
import { FacadeGood } from "../../app-types";
import SvgArrowDown from "./svg/svg-arrow-down";
import SvgArrowRight from "./svg/svg-arrow-right";
import SvgPaginationLeft from "./svg/svg-pagination-left";
import SvgPaginationRight from "./svg/svg-pagination-right";
import { motion, useAnimation, useInView } from "framer-motion";
import Select from "./form-components/select";

export interface EmotionProps<T> extends React.HTMLAttributes<T> {
  css?: Interpolation<any>;
  theme?: FacadeGood.CustomTheme;
  children?: React.ReactNode;
}

export const Box: React.FC<
  EmotionProps<HTMLDivElement> & React.ClassAttributes<HTMLDivElement>
> = ({ css, ...props }) => (
  //@ts-ignore
  <div css={css} {...props} />
);

export const Header: React.FC<EmotionProps<HTMLElement>> = ({
  css,
  ...props
}) => (
  //@ts-ignore
  <header css={css} {...props} />
);

export const Nav: React.FC<EmotionProps<HTMLElement>> = ({ css, ...props }) => (
  //@ts-ignore
  <nav css={css} {...props} />
);

export const FacadeGoodLink = ({
  css,
  ...props
}: GatsbyLinkProps<unknown> & {
  css?: Interpolation<any>;
  theme?: FacadeGood.CustomTheme;
}) => (
  //@ts-ignore
  <Link css={css} {...props} />
);

export const Footer: React.FC<EmotionProps<HTMLElement>> = ({
  css,
  ...props
}) => (
  //@ts-ignore
  <footer css={css} {...props} />
);

export const Section = styled("section")(
  (props: EmotionProps<HTMLElement>) => ({
    margin: 0,
    padding: 0,
  })
);

export const IFrame: React.FC<
  EmotionProps<HTMLIFrameElement> & { src: string; loading: string }
> = ({ css, ...props }) => (
  //@ts-ignore
  <iframe css={css} {...props} />
);

export const Main = styled("main")((props: EmotionProps<HTMLElement>) => ({}));

export const Typography: React.FC<EmotionProps<HTMLParagraphElement>> = ({
  css,
  ...props
}) => (
  //@ts-ignore
  <p css={css} {...props} />
);

export const Button: React.FC<
  EmotionProps<HTMLButtonElement> & { disabled?: boolean; loading?: boolean }
> = ({ css, disabled, loading, ...props }) => (
  //@ts-ignore
  <button disabled={disabled || loading} css={css} {...props} />
);

export const Span: React.FC<EmotionProps<HTMLSpanElement>> = ({
  css,
  ...props
}) => (
  //@ts-ignore
  <span css={css} {...props} />
);

export const HorizontalList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    margin-right: 35px;

    svg {
      fill: #000000;
    }
  }

  li:last-child {
    margin-right: 0;
  }
`;

export const SvgСircle = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width={9}
      height={9}
      viewBox="0 0 9 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx={4.5} cy={4.5} r={4.5} fill="#A38970" />
    </svg>
  );
};

export const Container = styled(Box)(({ theme }) => ({
  ...theme.container,
}));

export const PrimaryButton = styled(Button)<{
  disabled?: boolean;
  loading?: boolean;
}>(({ theme, disabled, loading }) => ({
  ...theme.typography.buttonText,
  color:
    disabled || loading ? theme.colors.bg2 : theme.typography.buttonText.color,
  boxShadow: "0px 4px 13px rgba(0, 0, 0, 0.05)",
  padding: "0.5rem 1rem",
  borderRadius: "90px",
  border: "none",
  backgroundColor:
    disabled || loading ? theme.colors.bg3 : theme.colors.button.normal,
  cursor: disabled || loading ? (loading ? "progress" : "auto") : "pointer",
  outline: "none",
  textAlign: "center",
  width: 297,
  height: 64,
  ["&:hover"]: {
    backgroundColor:
      disabled || loading ? theme.colors.bg3 : theme.colors.button.hover,
  },
  [":active"]: {
    backgroundColor:
      disabled || loading ? theme.colors.bg3 : theme.colors.button.active,
  },
}));

export const ButtonRoundWrapper = styled(Button)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  background: "rgba(255, 255, 255, 0.3)",
  borderRadius: "50%",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  overflow: "hidden",
  color: theme.colors.white,
  [":hover"]: {
    background: "rgba(255, 255, 255, 0.1)",
  },
  ["& svg"]: {
    opacity: 1,
  },
}));

export const ButtonRound = ({
  children,
  css,
  ...props
}: EmotionProps<HTMLButtonElement>) => {
  return (
    <ButtonRoundWrapper
      css={[
        {
          width: 60,
          height: 60,
        },
        ...(Array.isArray(css) ? css : [css]),
      ]}
      {...props}
    >
      {children}
    </ButtonRoundWrapper>
  );
};

export const ButtonArrowDown = (props: EmotionProps<HTMLButtonElement>) => {
  return (
    <ButtonRound
      css={{
        [":active"]: {
          backgroundColor: "rgba(256,256,256, 0.3)",
        },
      }}
      {...props}
    >
      <SvgArrowDown />
    </ButtonRound>
  );
};

export const ButtonArrowRight = (props: EmotionProps<HTMLButtonElement>) => {
  return (
    <ButtonRound
      css={(theme: FacadeGood.CustomTheme) => ({
        width: 37,
        height: 37,
        backgroundColor: theme.colors.button.normal,
        [":hover"]: {
          backgroundColor: theme.colors.button.hover,
        },
        [":active"]: {
          backgroundColor: theme.colors.button.active,
        },
      })}
      {...props}
    >
      <SvgArrowRight />
    </ButtonRound>
  );
};

// Пагинация

export const ButtonPaginationRight = (
  props: EmotionProps<HTMLButtonElement>
) => {
  return (
    <ButtonRound
      css={(theme: FacadeGood.CustomTheme) => ({
        width: 60,
        height: 60,
        backgroundColor: "rgba(239, 236, 231, 0.2)",
        border: "1px solid #7B7B7B",
        boxShadow: "0px 4px 13px rgba(0, 0, 0, 0.05)",
        [":hover"]: {
          backgroundColor: "rgba(123,123,123, 0.2)",
        },
        [":active"]: {
          backgroundColor: "rgba(256,256,256, 0.3)",
        },
        ["& svg"]: {
          opacity: 1,
        },
      })}
      {...props}
    >
      <SvgPaginationRight />
    </ButtonRound>
  );
};

export const ButtonPaginationLeft = (
  props: EmotionProps<HTMLButtonElement>
) => {
  return (
    <ButtonRound
      css={(theme: FacadeGood.CustomTheme) => ({
        width: 60,
        height: 60,
        backgroundColor: "rgba(239, 236, 231, 0.2)",
        border: "1px solid #7B7B7B",
        boxShadow: "0px 4px 13px rgba(0, 0, 0, 0.05)",
        [":hover"]: {
          backgroundColor: "rgba(123,123,123, 0.2)",
        },
        [":active"]: {
          backgroundColor: "rgba(256,256,256, 0.3)",
        },
        ["& svg"]: {
          opacity: 1,
        },
      })}
      {...props}
    >
      <SvgPaginationLeft />
    </ButtonRound>
  );
};

export const Divider = styled(Box)<
  EmotionProps<HTMLDivElement> & { width?: number; my?: number }
>(({ my, theme, width }) => ({
  marginTop: my ? my : 0,
  marginBottom: my ? my : 0,
  width,
  height: 0,
  opacity: 0.2,
  borderBottom: "1px solid #000000",
  borderTop: "1px solid #fff",
}));

// Карта

export const Card = styled(Box)(({ theme }) => ({
  minWidth: 345,
  height: 656,
  background: theme.colors.white,
  border: "1px solid #DEDEDE",
  // boxShadow: "0px 12px 26px rgba(0, 0, 0, 0.18)",
  backdropFilter: "blur(5px)",
  borderRadius: "10px",
  boxSizing: "border-box",
  position: "relative",
  padding: "15px",
  paddingBottom: 67,
}));

export const CardFooter = styled(Box)(({ theme }) => ({
  position: "absolute",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  height: 67,
  left: 0,
  bottom: 0,
  background: "rgba(57,76,96,0.05)",
}));

export const CardTitle = ({
  children,
  ...props
}: EmotionProps<HTMLParagraphElement>) => {
  return (
    <Typography
      css={(theme) => [
        {
          textAlign: "left",
          marginBottom: 10,
          maxHeight: 42,
          lineHeight: '0.9em',
          ...theme.typography.cardName,
        },
        ...(Array.isArray(props.css) ? props.css : [props.css]),
      ]}
      {...props}
    >
      {children}
    </Typography>
  );
};

export const CardImgBox = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  height: 456,
  borderRadius: "5px",
  background: theme.colors.white,
  overflow: "hidden",
}));

export const CardSchemeBox = styled(Box)<{ schemeheight?: number }>(
  ({ theme, schemeheight = 100 }) => ({
    // position: 'relative',
    width: "100%",
    height: schemeheight,
    borderRadius: "5px",
    background: theme.colors.white,
    overflow: "hidden",
    "& img": {
      objectFit: "cover",
    },
  })
);

export const CardDescription = styled(Typography)(({ theme }) => ({
  ...theme.typography.cardDescription,
  textAlign: "left",
  marginTop: 10,
  marginBottom: 10,
}));

export const CardParams = ({
  children,
  ...props
}: EmotionProps<HTMLUListElement>) => {
  return (
    <HorizontalList
      //@ts-ignore
      css={(theme) => [
        {},
        ...(Array.isArray(props.css) ? props.css : [props.css]),
      ]}
      {...props}
    >
      {children}
    </HorizontalList>
  );
};

export const CardParamItem = ({
  children,
  ...props
}: EmotionProps<HTMLLIElement>) => {
  return (
    <li
      //@ts-ignore
      css={(theme) => [
        {
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 7,
          ...theme.typography.cardParam,
        },
        ...(Array.isArray(props.css) ? props.css : [props.css]),
      ]}
      {...props}
    >
      <SvgСircle />
      {children}
    </li>
  );
};

export const CardPrice = styled(Typography)(({ theme }) => ({
  ...theme.typography.cardPrice,
  textAlign: "right",
  marginLeft: 15,
  marginRight: 15,
  flexGrow: 1,
}));

export const CardButton = ({
  children,
  dir = "right",
  ...props
}: EmotionProps<HTMLButtonElement> & { dir?: "left" | "right" }) => {
  return (
    <Button
      {...props}
      css={(theme: FacadeGood.CustomTheme) => [
        {
          display: "flex",
          flexDirection: dir === "right" ? "row" : "row-reverse",
          justifyContent: "end",
          alignItems: "center",
          cursor: "pointer",
          height: "100%",
          flexGrow: 1,
          gap: 14,
          background: "none",
          marginLeft: 15,
          marginRight: 15,
          border: "none",
          ...theme.typography.cardButton,
          ["&:hover p"]: {
            color: theme.colors.button.hover,
          },
          ["&:active p"]: {
            color: theme.colors.button.active,
          },
          ["&:hover div"]: {
            backgroundColor: theme.colors.button.hover,
          },
          ["&:active div"]: {
            backgroundColor: theme.colors.button.active,
          },
        },
        ...(Array.isArray(props.css) ? props.css : [props.css]),
      ]}
    >
      <Typography>{children}</Typography>
      <Box
        css={(theme: FacadeGood.CustomTheme) => ({
          width: 37,
          height: 37,
          borderRadius: "50%",
          backgroundColor: theme.colors.button.normal,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        })}
      >
        {dir === "right" ? (
          <SvgArrowRight />
        ) : (
          <SvgArrowRight
            style={{
              display: "inline-block",
              transform: "scaleX(-1)",
            }}
          />
        )}
      </Box>
    </Button>
  );
};

export const SiteSection = styled(Section)((props) => ({
  width: "100%",
}));

export const MotionDiv = styled(motion.div)<
  EmotionProps<HTMLDivElement> & React.ClassAttributes<HTMLDivElement>
>((props) => ({}));

// export const HeadTextWrapper = styled.div`
//   position: relative;
//   text-align: center;
//   &::after {
//     content: "";
//     position: absolute;
//     bottom: -30px;
//     left: 50%;
//     transform: translateX(-50%);
//     width: 163px;
//     height: 6px;
//     background-color: ${(props: EmotionProps<HTMLDivElement>) =>
//       props!.theme?.colors.button.hover};
//     display: inline-block;
//   }
// `;

export const HeadTextWrapper: React.FC<
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
          left: "50%",
          transform: "translateX(-50%)",
          height: "6px",
          backgroundColor: theme.colors.button.hover,
          display: "inline-block",
        })}
        animate={controls}
      />
    </MotionDiv>
  );
};

export const HeadText = styled(Typography)(({ theme }) => ({
  ...theme.typography.headerBlockLight,
}));

const facadeGood = {
  Box,
  Button,
  Container,
  PrimaryButton,
  ButtonRound,
  ButtonArrowDown,
  ButtonPaginationRight,
  ButtonPaginationLeft,
  Divider,
};
export default facadeGood;
