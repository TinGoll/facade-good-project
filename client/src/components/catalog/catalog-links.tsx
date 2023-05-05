import React, { useEffect, useState } from "react";
import {
  Box,
  EmotionProps,
  FacadeGoodLink,
  Typography,
} from "../facade-good/facade-good";
import { useTheme } from "@emotion/react";
import { FacadeGood } from "../../app-types";
import styled from "@emotion/styled";
import SvgTrophy from "../about-company/svg-trophy";

export type CatalogCategory = "Массив" | "МДФ" | "Комплектующие";

const CatalogLink = styled(FacadeGoodLink)((props) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: 10,
  gap: 20,
  textDecoration: "none",
  color: props.theme.colors.cardTextPrimary,
  "&:hover > div": {
    boxShadow: "0px 3px 10px rgba(0, 0, 0, 0.08)",
  },
  "&:hover > p": {
    color: props.theme.colors.secondary,
  },
}));

const IconBox = styled(Box)((props) => ({
  width: 73,
  height: 73,
  padding: 12,
  border: "1px solid #DEDEDE",
  // boxShadow: "0px 12px 26px rgba(0, 0, 0, 0.04)",
  backdropFilter: "blur(5px)",
  borderRadius: "10px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const Text = styled(Typography)((props) => ({
  fontWeight: 400,
  fontSize: "18px",
  lineHeight: "24px",
  width: 150,
  textAlign: "center",
}));

const CatalogLinks = ({
  linkNames = [],
  ...props
}: EmotionProps<HTMLDivElement> &
  React.ClassAttributes<HTMLDivElement> & {
    linkNames?: string[];
  }) => {
  const theme = useTheme() as FacadeGood.CustomTheme;
  const [isMassive, setIsMassive] = useState<boolean>(false);
  const [isMDF, setIsMDF] = useState<boolean>(false);
  const [isAccessories, setIsAccessories] = useState<boolean>(false);

  useEffect(() => {
    const flag1 = Boolean(
      linkNames.find((item) => item.toUpperCase() === "Массив".toUpperCase())
    );
    const flag2 = Boolean(
      linkNames.find((item) => item.toUpperCase() === "МДФ".toUpperCase())
    );
    const flag3 = Boolean(
      linkNames.find(
        (item) => item.toUpperCase() === "Комплектующие".toUpperCase()
      )
    );
    setIsMassive(flag1);
    setIsMDF(flag2);
    setIsAccessories(flag3);
  }, [linkNames]);

  return (
    <Box
      {...props}
      css={[
        {
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: 10,
        },
        ...(Array.isArray(props.css) ? props.css : [props.css]),
      ]}
    >
      {isMassive && (
        <CatalogLink to="/catalog/massive" state={{ scrollToAnchor: true }}>
          <IconBox>
            <SvgTrophy />
          </IconBox>
          <Text>Фасады массив</Text>
        </CatalogLink>
      )}
      {isMDF && (
        <CatalogLink to="/catalog/mdf" state={{ scrollToAnchor: true }}>
          <IconBox>
            <SvgTrophy />
          </IconBox>
          <Text>Фасады МДФ</Text>
        </CatalogLink>
      )}
      {isAccessories && (
        <CatalogLink to="/catalog/accessories" state={{ scrollToAnchor: true }}>
          <IconBox>
            <SvgTrophy />
          </IconBox>
          <Text>Комплектующие</Text>
        </CatalogLink>
      )}
    </Box>
  );
};

export default CatalogLinks;
