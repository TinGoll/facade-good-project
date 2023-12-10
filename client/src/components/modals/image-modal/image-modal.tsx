import React from "react";
import AppModal from "../app-modal/app-modal";
import { useImageModal } from "../../../stores";
import * as styles from "./image-modal.module.css";
import {
  GATSBY_API_HOST,
  GATSBY_API_PORT,
} from "../../../settings/api.settings";

const ImageModal: React.FC = () => {
  const { open, imageName, reset } = useImageModal((store) => ({
    open: Boolean(store.imageName),
    imageName: store.imageName,
    reset: store.reset,
  }));

  return (
    <AppModal
      css={{
        background: "none transparent",
        boxShadow: "none",
      }}
      isOpen={open}
      onClose={reset}
    >
      <img
        className={styles.image}
        src={`${GATSBY_API_HOST}:${GATSBY_API_PORT}/images/${imageName}.webp`}
        alt={String(imageName)}
      />
    </AppModal>
  );
};

export default ImageModal;
