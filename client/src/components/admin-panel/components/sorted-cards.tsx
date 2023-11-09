import React, { useState } from "react";
import { Box, EmotionProps, Typography } from "../../facade-good/facade-good";
import { GalleryImages } from "../../../gatsby-plugin-apollo/queries/gallery.query";
import styled from "@emotion/styled";
import { SortedItem, SortedList } from "../../sorted-list";
import {
  GATSBY_API_HOST,
  GATSBY_API_PORT,
} from "../../../settings/api.settings";
import { sortedAndGetFirstElement } from "../../../utils/sorted-and-get-first";

const getColorByCategory = (category?: string) => {
  if (!category) return "grey";
  switch (category) {
    case "Массив":
      return "success";
    case "МДФ":
      return "link";
    case "Комплектующие":
      return "warning";
    default:
      return "grey";
  }
};

const indexFilter = (images: GalleryImages.Image[], index: 0 | 1 = 0) => {
  return images.filter((item) => item.index === index);
};

const comparator = (item: GalleryImages.Image) => Number(item.id);

const ImageBox = styled(Box)`
  width: 250px;
  height: 20px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 6px;
  overflow: hidden;
`;

const Image = styled("img")<EmotionProps<HTMLImageElement>>`
  width: 100%;
  height: auto;
`;

const CardContainer = styled(Box)``;

const Button = styled("button")<EmotionProps<HTMLButtonElement>>`
  position: relative;
  background: none;
  border: none;
  padding: 8px;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 500;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  text-transform: uppercase;
  background: rgba(0, 0, 0, 0.05);
  color: ${({ theme }) => theme.colors.bg1};
  &:hover {
    background: #e0c182;
    color: ${({ theme }) => theme.typography.cardPrice.color};
  }
  &:active {
    background: ${({ theme }) => theme.colors.button.active};
  }
`;

const MenuContainer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  padding: 6px 16px;
  background-color: ${({ theme }) => theme.colors.bg3};
`;

const ButtonContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
`;

const Chip = styled("p")<EmotionProps<HTMLParagraphElement>>`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.colors.bg1};
  width: 22px;
  height: 22px;
  border-radius: 50%;
  font-size: 0.6em;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.bg3};
  flex: 0 0 auto;
`;

const TitleText = styled("p")<EmotionProps<HTMLParagraphElement>>(
  ({ theme }) => ({
    display: "inline-block",
    width: 250,
    ...theme.typography.buttonText,
  })
);

const MaterialName = styled("p")<
  EmotionProps<HTMLParagraphElement> & { category?: string }
>(({ theme, category }) => ({
  display: "inline-block",
  width: 120,
  borderRadius: 8,
  background: theme.colors[getColorByCategory(category)],
  textAlign: "center",
  ...theme.typography.cardParam,
  fontSize: 14,
  color: theme.colors.white,
}));

const MenuText = styled(Typography)(({ theme }) => ({
  ...theme.typography.cardName,
}));

interface Props extends EmotionProps<HTMLDivElement> {
  sorted?: boolean;
  setSorted?: (value: boolean) => void;
  onReorder?: (newArray: GalleryImages.Item[]) => void;
  cards: GalleryImages.Item[];
}

const SortedCards: React.FC<Props> = ({
  sorted,
  setSorted,
  cards,
  onReorder,
  ...props
}) => {
  const [items, setItems] = useState<GalleryImages.Item[]>(() => cards);

  const onCancel = () => {
    typeof setSorted === "function" && setSorted(false);
  };

  const okHandle = (): void => {
    if (sorted) {
      typeof onReorder === "function" && onReorder(items);
      onCancel();
    }
  };

  const cancelHandle = (): void => {
    onCancel();
  };

  return (
    <Box {...props}>
      <MenuContainer>
        <MenuText>Сортировка карточек</MenuText>
        <ButtonContainer>
          <Button onClick={okHandle}>Сохранить сортировку</Button>
          <Button onClick={cancelHandle}>Отменить</Button>
        </ButtonContainer>
      </MenuContainer>
      <CardContainer>
        <SortedList<GalleryImages.Item>
          values={items}
          onReorder={setItems}
          axis="y"
          css={{
            padding: 16,
          }}
        >
          {items.map((item, index) => {
            const filteredArray = indexFilter(item.images);

            const filename = sortedAndGetFirstElement<GalleryImages.Image>(
              filteredArray,
              comparator
            ).filename;

            const src = `${GATSBY_API_HOST}:${GATSBY_API_PORT}/images/${filename}.webp`;
            return (
              <SortedItem<GalleryImages.Item>
                key={item.id}
                id={item.id}
                value={item}
                contentCss={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 16,
                }}
              >
                <Chip>{index + 1}</Chip>
                <Box
                  css={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Box
                    css={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <TitleText>{item.title}</TitleText>
                    <MaterialName category={item.category}>
                      {item.category}
                    </MaterialName>
                  </Box>
                  <ImageBox>
                    <Image src={src} alt={item.title} />
                  </ImageBox>
                </Box>
              </SortedItem>
            );
          })}
        </SortedList>
      </CardContainer>
    </Box>
  );
};

export default SortedCards;
