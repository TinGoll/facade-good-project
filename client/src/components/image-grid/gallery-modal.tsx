import styled from "@emotion/styled";
import React, { useEffect } from "react";
import { Box, Button } from "../facade-good/facade-good";
import SvgClose from "../header/svg-close";

const ModalWrapper = styled(Box)<{ isopen: number }>((props) => ({
  position: "fixed",
  zIndex: 9999,
  top: "50%",
  left: "50%",
  transform: `translate(-50%, -50%) scale(1)`,
  opacity: props.isopen ? 1 : 0,
  background: "white",
  borderRadius: "10px",
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)",
  padding: "20px",
  transition: "opacity 0.3s ease-in-out",
  transitionDelay: props.isopen ? "0.1s" : "0s",
  maxHeight: "90vh",
  maxWidth: "90%",
  overflowY: "auto", // добавленный стиль
}));

const ModalBackdrop = styled.div`
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(2px);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(190, 190, 190, 0.2);
  font-size: 36px;
  color: #5a5a5a;
  line-height: 1;
  cursor: pointer;
  height: 48px;
  width: 48px;
  padding: 0px;
  border-radius: 50%;
  border: none;
  :hover {
    background: rgba(128, 128, 128, 0.4);
  }
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalImg = styled("img")((props) => ({
  objectFit: "contain",
  maxHeight: "84vh",
  maxWidth: "90vw",
}));

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

const GalleryModal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <>
          <ModalBackdrop onClick={onClose} />
          <ModalWrapper isopen={isOpen? 1 : 0}>
            <CloseButton onClick={onClose}>×</CloseButton>
            {children}
          </ModalWrapper>
        </>
      )}
    </>
  );
};

export default GalleryModal;
