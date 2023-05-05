import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import React, { FC, memo, useEffect, useState } from "react";
import { FacadeGood } from "../../app-types";
import { formatPhone } from "../../utils/phone-formater";
import {
  Box,
  Button,
  ButtonRoundWrapper,
  Container,
  FacadeGoodLink,
  Header,
  Nav,
  Typography,
} from "../facade-good/facade-good";
import SvgClose from "./svg-close";
import SvgMenu from "./svg-menu";
import SvgPhone from "./svg-phone";
import SvgWhatsapp from "./svg-whatsapp";

// УКАЗЫВАЕМ НУЖНЫЙ НОМЕР ТЕЛЕФОНА В ТАКОМ ФОРМАТЕ:
export const PHONE_NUMBER = "+79189230664";
const formattedPhoneNumber = formatPhone(PHONE_NUMBER);

export const MenuList = [
  { to: "/", text: "Каталог продукции", hash: "catalog" },
  { to: "/", text: "Сделать заказ", hash: "order" },
  { to: "/", text: "О нас", hash: "about-company" },
  { to: "/", text: "Контакты", hash: "contact" },
];

const Logo = styled(FacadeGoodLink)((props) => ({
  cursor: "pointer",
  ...props.theme.typography.logo,
  textDecoration: "none",
  textTransform: "uppercase",
}));

const ItemMenu = styled(FacadeGoodLink)((props) => ({
  ...props.theme.typography.hederMenu,
  position: "relative",
  textDecoration: "none",
  display: "inline-block",
  paddingTop: 5,
  paddingBottom: 5,
  ["&::after"]: {
    content: '""',
    position: "absolute",
    bottom: -2,
    left: 0,
    width: "100%",
    height: "2px",
    borderRadius: "90px",
    backgroundColor: props.theme.colors.secondary,
    opacity: 0,
    transform: "scaleX(0.5)",
    transition:
      "opacity 0.3s ease-in-out, text-shadow 0.5s ease-in-out, transform 0.2s ease-in-out",
  },
  ["&:hover::after"]: {
    opacity: 1,
    transform: "scaleX(1)",
  },
  "&:hover": {
    ...props.theme.typography.hederMenuActive,
    textShadow: "0 0 .9px #F1B84A, 0 0 .9px #F1B84A, 0 0 .9px #F1B84A",
  },
}));

const PhoneBox = React.memo(
  styled(Box)((props) => ({
    display: "flex",
    flexDirection: "row",
    justifyContent: "start",
    alignItems: "center",
    gap: 15,
  }))
);

const PhoneLink = styled("a")((props) => ({
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "18px",
  lineHeight: "21px",
  color: "#FFFFFF",
  textDecoration: "none",
}));

const PhoneText = styled(Typography)((props) => ({
  fontStyle: "normal",
  fontWeight: 300,
  fontSize: "15px",
  lineHeight: "18px",
  color: "#FFFFFF",
  opacity: 0.7,
}));

const IconWrapper = styled(Box)((props) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "rgba(255, 255, 255, 0.3)",
  width: 42,
  height: 42,
  borderRadius: "50%",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  overflow: "hidden",
  color: props.theme.colors.white,
  // [":hover"]: {
  //   background: "rgba(255, 255, 255, 0.1)",
  // },
  ["& svg"]: {
    opacity: 1,
  },
}));

const MobileMenuButton = styled(Button)((props) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  border: "none",
  background: "none",
  cursor: "pointer",
  height: 32,
  width: 32,
  padding: 5,
  borderRadius: "50%",
  [props.theme.mq.desktop]: {
    display: "none",
  },
  ":hover": {
    background: "rgba(128, 128, 128, 0.2)",
  },
  ":active": {
    background: "rgba(128, 128, 128, 0.5)",
  },
}));

const Menu = React.memo(() => {
  const theme = useTheme() as FacadeGood.CustomTheme;

  return (
    <Nav
      css={{
        display: "none",
        flexDirection: "row",
        justifyContent: "start",
        alignItems: "center",
        color: "white",
        gap: 50,
        [theme.mq.desktop]: {
          display: "flex",
        },
      }}
    >
      {MenuList.map((item, index) => (
        <ItemMenu
          key={index}
          to={`${item.to}#${item.hash}`}
          state={{ scrollToAnchor: true, anchorId: item.hash }}
        >
          {item.text}
        </ItemMenu>
      ))}
    </Nav>
  );
});

interface MobileMenuProps {
  open?: boolean;
  onClose?: () => void;
  sticky?: boolean;
}

const MobileMenu: FC<MobileMenuProps> = memo(
  ({ onClose = () => false, open, sticky = false }) => {
    const theme = useTheme() as FacadeGood.CustomTheme;
    return (
      <Box
        css={{
          display: "flex",
          overflow: "hidden",
          zIndex: 2000,
          paddingLeft: 15,
          paddingRight: 15,
          position: "fixed",
          top: 0,
          left: 0,
          inset: "0 5% 0 0",
          background: "rgba(22,27,32,0.8)",
          flexDirection: "column",
          backdropFilter: "blur(0.5rem)",
          fontSize: "1.2em",
          "--gap ": "2em",
          transform: open ? "translateX(0%)" : "translateX(-100%)",
          transitionTimingFunction: "ease",
          transition: "transform 200ms ease-in",
          [theme.mq.desktop]: {
            display: "none",
          },
        }}
      >
        <Box
          css={{
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
            paddingTop: sticky ? 10 : 25,
            paddingBottom: sticky ? 10 : 25,
            transition: "0.7s ease-in-out",
          }}
        >
          <MobileMenuButton onClick={() => onClose()} css={{ zIndex: 9999 }}>
            <SvgClose />
          </MobileMenuButton>
        </Box>

        <Box
          css={{
            position: "absolute",
            top: 87,
            left: 15,
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            gap: 0,
            width: "100%",
          }}
        >
          <PhoneBox css={{ marginBottom: 26 }}>
            <Box>
              <IconWrapper>
                <SvgPhone />
              </IconWrapper>
            </Box>

            <Box>
              <PhoneText>Телефон:</PhoneText>
              <PhoneLink href={`tel:${PHONE_NUMBER}`}>
                {formattedPhoneNumber}
              </PhoneLink>
            </Box>
          </PhoneBox>
          {MenuList.map((item, index) => (
            <FacadeGoodLink
              onClick={() => onClose()}
              key={index}
              css={{
                textDecoration: "none",
                color: "white",
                fontWeight: 400,
                width: "100%",
                textAlign: "left",
                paddingTop: 20,
                paddingBottom: 20,
                paddingLeft: 10,
                // fontSize: 15,
                // lineHeight: "18px",
                ":hover": {
                  color: "#F1B84A",
                  background: "rgba(128,128,128,0.1)",
                },
                ":active": {
                  background: "rgba(256,256,256,0.1)",
                },
              }}
              to={item.to}
            >
              {item.text}
            </FacadeGoodLink>
          ))}
        </Box>
      </Box>
    );
  }
);

const SiteHeadder = React.memo((props: { stycky?: boolean }) => {
  const theme = useTheme() as FacadeGood.CustomTheme;
  const [open, setOpen] = useState(false);
  const [sticky, setSticky] = useState(false || Boolean(props.stycky));

  const bannerHeight = 100; /* высота баннера */

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== "undefined") {
      }

      const verticalPosition =
        typeof window !== "undefined" ? window.scrollY : 0;

      if (
        window?.pageYOffset >= bannerHeight ||
        verticalPosition >= bannerHeight
      ) {
        setSticky(true);
      } else {
        setSticky(false || Boolean(props.stycky));
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  function handleClick() {
    window.open(`tel:${PHONE_NUMBER}`);
  }

  const handleWhatsAppClick = () => {
    const phoneNumber = PHONE_NUMBER.slice(1);
    const message = "Здравствуйте! Я хочу задать Вам несколько вопросов.";

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  return (
    <Header
      css={{
        width: "100%",
        position: "fixed",
        left: 0,
        top: 0,
        display: "flex",
        zIndex: 1000,
        paddingTop: sticky ? 10 : 25,
        paddingBottom: sticky ? 10 : 25,
        gap: 20,
        background: sticky ? "#16212E" : "none",
        boxShadow: sticky ? "0 4px 10px rgba(0, 0, 0, 0.2)" : "none",
        transition: "0.5s ease-in-out",
        borderBottom: sticky ? "1px solid #394C60" : "none",
        [theme.mq.desktop]: {
          paddingTop: sticky ? 10 : 27,
          paddingBottom: sticky ? 10 : 27,
        },
      }}
    >
      <Container
        css={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <MobileMenuButton
          css={{ zIndex: 9999 }}
          onClick={() => setOpen((value) => !value)}
        >
          <SvgMenu />
        </MobileMenuButton>
        <Logo to="/">FACADE-GOOD</Logo>
        <Menu />
        <MobileMenu
          open={open}
          onClose={() => setOpen(false)}
          sticky={sticky}
        />

        <Box
          css={{
            display: "flex",
            flexDirection: "row",
            gap: "15px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ButtonRoundWrapper
            onClick={handleWhatsAppClick}
            css={{
              width: 28,
              height: 28,
              [theme.mq.desktop]: {
                width: 42,
                height: 42,
              },
              [theme.mq.largeDesktop]: {
                display: "none",
              },
            }}
          >
            <SvgWhatsapp style={{ height: 26, width: 26 }} />
          </ButtonRoundWrapper>
          <IconWrapper
            onClick={handleClick}
            css={{
              display: "flex",
              cursor: "pointer",
              width: 26,
              height: 26,
              [":hover"]: {
                background: "rgba(255, 255, 255, 0.1)",
              },
              [theme.mq.desktop]: {
                width: 42,
                height: 42,
              },
              [theme.mq.largeDesktop]: {
                display: "none",
              },
            }}
          >
            <SvgPhone />
          </IconWrapper>
        </Box>

        <PhoneBox
          css={{
            display: "none",
            [theme.mq.largeDesktop]: {
              display: "flex",
            },
          }}
        >
          <Box>
            <ButtonRoundWrapper
              onClick={handleWhatsAppClick}
              css={{ width: 42, height: 42 }}
            >
              <SvgWhatsapp style={{ height: 28, width: 28 }} />
            </ButtonRoundWrapper>
          </Box>

          <Box>
            <ButtonRoundWrapper
              onClick={handleClick}
              css={{ width: 42, height: 42 }}
            >
              <SvgPhone />
            </ButtonRoundWrapper>
            {/* <IconWrapper>
              <SvgPhone />
            </IconWrapper> */}
          </Box>

          <Box>
            <PhoneText>Телефон:</PhoneText>
            <PhoneLink href={`tel:${PHONE_NUMBER}`}>
              {formattedPhoneNumber}
            </PhoneLink>
          </Box>
        </PhoneBox>
      </Container>
    </Header>
  );
});

export default SiteHeadder;
