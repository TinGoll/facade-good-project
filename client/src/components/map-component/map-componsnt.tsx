import React from "react";
import { css, useTheme } from "@emotion/react";
import {
  Box,
  Container,
  HeadText,
  IFrame,
  PrimaryButton,
  SiteSection,
  Typography,
} from "../facade-good/facade-good";
import { FacadeGood } from "../../app-types";
import styled from "@emotion/styled";
import SvgContactPhone from "./svg-phone";
import SvgLocation from "./svg-location";
import SvgContactTime from "./svg-time";
import { formatPhone } from "../../utils/phone-formater";
import { PHONE_NUMBER } from "../header/site-header";
import { navigate } from "gatsby";

const formattedPhoneNumber = formatPhone(PHONE_NUMBER);

const MapBox = styled(Box)((props) => ({
  width: "100%",
  height: "55%",
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  zIndex: 0,
  [props.theme.mq.desktop]: {
    height: "100%",
    top: 0,
  },
}));

const ContactBox = styled(Box)((props) => ({
  position: "absolute",
  top: 0,
  left: 15,
  zIndex: 1,
  height: 403,
  width: "calc(100% - 110px)",
  backgroundColor: props.theme.colors.white,
  borderEndEndRadius: "10px",
  WebkitBorderBottomLeftRadius: "10px",
  padding: 40,
  boxShadow: "0px 15px 15px -15px rgba(0, 0, 0, 0.2)",
  [props.theme.mq.desktop]: {
    top: 64,
    width: 403,
    borderRadius: "10px",
    boxShadow: "0px 24px 35px rgba(0, 0, 0, 0.11)",
  },
}));

const MapContainer = styled(Container)((props) => ({
  position: "relative",
}));

const HeadTextWrapper = styled(Box)((props) => ({
  position: "relative",
  textAlign: "left",
  "::after": {
    content: '""',
    position: "absolute",
    bottom: -30,
    left: 0,
    transform: "translateX(0)",
    width: "163px",
    height: "6px",
    backgroundColor: props!.theme?.colors.button.hover,
    display: "inline-block",
  },
}));

const ContactItem = styled(Box)((props) => ({
  display: "flex",
  flexDirection: "row",
  gap: 14,
  marginTop: 20,
}));

const Text1 = styled(Typography)((props) => ({
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "13px",
  lineHeight: "15px",
  opacity: 0.5,
  color: "#000",
}));
const Text2 = styled(Typography)((props) => ({
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "15px",
  lineHeight: "18px",
  color: "#000",
  marginTop: 5,
  maxWidth: 250,
}));

const ContactTextBox = styled(Box)((props) => ({}));

const MapComponent = React.memo(() => {
  const theme = useTheme() as FacadeGood.CustomTheme;
  return (
    <SiteSection
      css={{
        position: "relative",
        marginTop: 100,
        height: 900,
        [theme.mq.desktop]: {
          height: 629,
        },
      }}
      id="contact"
    >
      <MapBox>
        <IFrame
          title="map"
          css={{ width: "100%", height: "100%", border: 0, zIndex: 0 }}
          src="https://yandex.ru/map-widget/v1/?z=12&ol=biz&oid=18885992984&scroll=false"
          loading="lazy"
        ></IFrame>
      </MapBox>
      <MapContainer>
        <ContactBox>
          <HeadTextWrapper css={{ marginBottom: 67 }}>
            <HeadText>Контакты</HeadText>
          </HeadTextWrapper>
          <ContactItem>
            <SvgContactPhone />
            <ContactTextBox>
              <Text1>Номер телефона:</Text1>
              <Text2>{formattedPhoneNumber}</Text2>
            </ContactTextBox>
          </ContactItem>
          <ContactItem>
            <SvgLocation />
            <ContactTextBox>
              <Text1>Мы находимся по адресу:</Text1>
              <Text2>Майкопской р-н, ст. Курджипская, ул. Набережная, 3</Text2>
            </ContactTextBox>
          </ContactItem>
          <ContactItem>
            <SvgContactTime />
            <ContactTextBox>
              <Text1>График работы:</Text1>
              <Text2>Понедельник - пятница с 9:00 до 17:00</Text2>
            </ContactTextBox>
          </ContactItem>
          <PrimaryButton
            onClick={() => navigate("/order")}
            css={{ marginTop: 30 }}
          >
            Сделать заказ
          </PrimaryButton>
        </ContactBox>
      </MapContainer>
    </SiteSection>
  );
});

export default MapComponent;
