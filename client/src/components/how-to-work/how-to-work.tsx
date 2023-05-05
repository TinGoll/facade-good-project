import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import React from "react";
import { FacadeGood } from "../../app-types";

import {
  Box,
  Container,
  HeadText,
  HeadTextWrapper,
  SiteSection,
  Typography,
} from "../facade-good/facade-good";

const HowToWorkCard = styled(Box)(({ theme }) => ({
  maxWidth: 365,
  [theme.mq.desktop]: {
    height: 310,
  },
}));
const HowToWorkMarker = styled(Box)((props) => ({
  width: 54,
  height: 54,
  backgroundColor: props.theme.colors.bg1,
  borderRadius: "0px 15px",
  color: props.theme.colors.white,
  fontWeight: 600,
  fontSize: 30,
  lineHeight: "54px",
  textAlign: "center",
}));

const HowToWorkCardTitle = styled(Box)((props) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "start",
  alignItems: "center",
  gap: 22,
}));

const HowToWorkCardTitleText = styled(Typography)((props) => ({
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "22px",
  lineHeight: "26px",
  color: props.theme.colors.primary,
}));
const HowToWorkCardTitleText2 = styled(Typography)((props) => ({
  fontStyle: "normal",
  fontWeight: 300,
  fontSize: "16px",
  lineHeight: "168%",
  color: props.theme.colors.black,
  marginTop: 30,
}));

const HowToWork = React.memo(() => {
  const theme = useTheme() as FacadeGood.CustomTheme;
  return (
    <SiteSection id="how-to-work" css={{ marginTop: 100 }}>
      <Container>
        <HeadTextWrapper>
          <HeadText>Как работает компания FACADE-GOOD</HeadText>
        </HeadTextWrapper>
        <Box
          css={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 67,
            gap: 36,
            [theme.mq.desktop]: {
              flexDirection: "row",
              justifyContent: "space-between",
              gap: 15,
            },
          }}
        >
          <HowToWorkCard>
            <HowToWorkCardTitle>
              <HowToWorkMarker>
                <Typography>01</Typography>
              </HowToWorkMarker>
              <HowToWorkCardTitleText>
                Оформление <br /> заказа
              </HowToWorkCardTitleText>
            </HowToWorkCardTitle>
            <HowToWorkCardTitleText2>
              Чтобы сделать заказ на производство мбели, предлагаем заполнить и
              отправить удобную форму на нашем сайте. Также вы можете от руки
              написать заказ и отправить его фото на WhatsApp по номеру,
              указанному на сайте, с размерами изделий и конкретным техническим
              заданием.
            </HowToWorkCardTitleText2>
          </HowToWorkCard>
          <HowToWorkCard>
            <HowToWorkCardTitle>
              <HowToWorkMarker>
                <Typography>02</Typography>
              </HowToWorkMarker>
              <HowToWorkCardTitleText>
                Сроки <br /> производства
              </HowToWorkCardTitleText>
            </HowToWorkCardTitle>
            <HowToWorkCardTitleText2>
              Когда заказ поступит, наш менеджер свяжется с вами для уточнения
              деталей. После полного оформления и согласования производство
              корпусной мебели выполняется в течение 3-4 недель в зависимости от
              загрузки. Предоплата составляет 50%.
            </HowToWorkCardTitleText2>
          </HowToWorkCard>
          <HowToWorkCard>
            <HowToWorkCardTitle>
              <HowToWorkMarker>
                <Typography>03</Typography>
              </HowToWorkMarker>
              <HowToWorkCardTitleText>
                Мебель с доставкой <br /> по России
              </HowToWorkCardTitleText>
            </HowToWorkCardTitle>
            <HowToWorkCardTitleText2>
              Когда заказ будет готов с вами свяжется наш менеджер для уточнения
              способа доставки мебели. Мы работаем со всеми транспортными
              компаниями. Вы можете выбрать любую. Также отправляем рейсовым
              частным транспортом по югу России, Москве и Московской области.
              При желании вы можете забрать свой заказ самостоятельно
              самовывозом.
            </HowToWorkCardTitleText2>
          </HowToWorkCard>
        </Box>
      </Container>
    </SiteSection>
  );
});

export default HowToWork;
