import React, { FC } from "react";
import GalleryModal, { ModalImg } from "./gallery-modal";
import { GalleryImages } from "../../gatsby-plugin-apollo/queries/gallery.query";

interface GalleryModalWrapperProps {
  item?: GalleryImages.Item | null;
  onClose?: () => void;
}

const GalleryModalWrapper: FC<GalleryModalWrapperProps> = ({
  item,
  onClose = () => null,
}) => {
  const images = item?.images?.filter((i) => i.index === 0) || [];

  return (
    <GalleryModal
      isOpen={Boolean(item) && Boolean(images.length)}
      onClose={onClose}
    >
      <ModalImg
        src={`https://facade-good.ru:3000/images/${images[0]?.filename}.webp`}
        alt={item?.title}
      />
    </GalleryModal>
  );
};

export default GalleryModalWrapper;
