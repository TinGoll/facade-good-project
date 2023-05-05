import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import React from "react";
import { FacadeGood } from "../../app-types";
import { Box, Container, Footer, Typography } from "../facade-good/facade-good";
import { MenuList } from "../header/site-header";
import { Link } from "gatsby";

const ItemBlock = styled(Box)((props) => ({
  width: 192,
}));

const MenuLink = styled(Link)((props) => ({
  textDecoration: "none",
  color: "white",
  " & p:hover": {
    color: (props.theme as FacadeGood.CustomTheme).colors.secondary,
  },
}));

const SiteFooter = React.memo(() => {
  const theme = useTheme() as FacadeGood.CustomTheme;
  return (
    <Footer
      css={{
        backgroundColor: "#16212E",
      }}
    >
      <Container
        css={{
          paddingTop: 35,
          paddingBottom: 35,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "start",
          gap: 30,
          [theme.mq.tablet]: {
            flexDirection: "row",
            gap: 50,
          },
        }}
      >
        <ItemBlock>
          <Typography
            css={{
              fontStyle: "normal",
              fontWeight: 400,
              fontSize: "24px",
              lineHeight: "28px",
              color: "#F1B84A",
            }}
          >
            FACADE-GOOD
          </Typography>
          <Typography
            css={{
              fontStyle: "normal",
              fontWeight: 300,
              fontSize: "11px",
              lineHeight: "141.5%",
              color: "#FFFFFF",
              opacity: 0.7,
              marginTop: 14,
            }}
          >
            Наша компания Facade Good - это производитель высококачественных
            мебельных фасадов из массива и МДФ. Мы предлагаем нашим клиентам
            широкий выбор фасадов из массива и МДФ, а также комплектующих для
            мебели.
          </Typography>
        </ItemBlock>


        <ItemBlock
          css={{
            display: "block",
            [theme.mq.desktop]: {
              display: "block",
            },
          }}
        >

          <Typography
            css={{
              fontStyle: "normal",
              fontWeight: 400,
              fontSize: "18px",
              lineHeight: "21px",
              color: "white",
            }}
          >
            Навигация
          </Typography>

          {MenuList.map((item, index) => (
            <MenuLink
              key={index}
              to={`${item.to}#${item.hash}`}
              state={{ scrollToAnchor: true, anchorId: item.hash }}
            >
              <Typography
                css={{
                  fontWeight: 400,
                  fontSize: "12px",
                  lineHeight: "12px",
                  color: "#B9B9B9",
                  marginTop: 14,
                }}
              >
                {item.text}
              </Typography>
            </MenuLink>
          ))}
        </ItemBlock>
      </Container>
      <Box
        css={{
          backgroundColor: "#111B25",
          height: 65,
        }}
      >
        <Typography
          css={{
            textAlign: "center",
            fontЫtyle: "normal",
            fontWeight: 300,
            fontSize: "14px",
            lineHeight: "65px",
            color: "white",
            marginTop: "auto",
          }}
        >
          {`Все права защищены. ${new Date().getFullYear()}`}
        </Typography>
      </Box>
    </Footer>
  );
});

export default SiteFooter;
