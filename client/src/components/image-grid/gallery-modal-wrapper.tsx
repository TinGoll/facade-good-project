import React, { FC } from "react";
import GalleryModal, { ModalImg } from "./gallery-modal";
import { GalleryImages } from "../../gatsby-plugin-apollo/queries/gallery.query";
import { GATSBY_API_HOST, GATSBY_API_PORT } from "../../settings/api.settings";

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
        src={`${GATSBY_API_HOST}:${GATSBY_API_PORT}/images/${images[0]?.filename}.webp`}
        alt={item?.title}
      />
    </GalleryModal>
  );
};

export default GalleryModalWrapper;
