import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, MotionProps } from "framer-motion";
import styled from "@emotion/styled";
import { EmotionProps } from "../../facade-good/facade-good";

import CloseIconOutline from "../../../assets/icons/CloseIconOutline";

const ModalBox = styled(motion.div)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
`;

const BackroundBox = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(4px);
  z-index: 9998;
`;

const ButtonBox = styled("div")<{ visible?: string }>`
  position: absolute;
  top: -28px;
  right: -28px;
  scale: ${({ visible }) => (visible === "true" ? 1 : 0)};
  opacity: ${({ visible }) => (visible === "true" ? 1 : 0)};
  transition: scale 0.2s ease-out, opasity 0.2s ease-out;
`;

const Button = styled("button")<EmotionProps<HTMLButtonElement>>`
  height: 46px;
  width: 46px;
  border-radius: 50%;
  overflow: hidden;
  background-color: rgba(255, 180, 33, 0.8);
  outline: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
  :hover {
    background-color: #ffac2a;
  }

  :active {
    background-color: #fbcf38;
  }

  svg {
    width: 2em;
    height: 2em;
    fill: ${({ theme }) => theme.colors.primary};
  }
`;

const AppModal: React.FC<Props & MotionProps> = ({
  isOpen,
  onClose,
  children,
  closeIcon,
  ...props
}) => {
  const [buttonVisible, setButtonVisible] = useState<string>("false");

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isOpen) {
      timer = setTimeout(() => setButtonVisible("true"), 100);
    } else {
      setButtonVisible("false");
    }
    return () => clearTimeout(timer);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <ModalBox
            key="modal"
            initial={{ opacity: 0, scale: 0.8, y: "-50%", x: "-50%" }}
            animate={{ opacity: 1, scale: 1, y: "-50%", x: "-50%" }}
            exit={{ opacity: 0, scale: 0.8, y: "-50%", x: "-50%" }}
            transition={{
              duration: 0.3,
              type: "spring",
            }}
            {...props}
          >
            <ButtonBox visible={buttonVisible}>
              <Button onClick={onClose}>
                {closeIcon || <CloseIconOutline />}
              </Button>
            </ButtonBox>

            {children}
          </ModalBox>
          <BackroundBox
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />
        </>
      )}
    </AnimatePresence>
  );
};

export default AppModal;

interface Props extends EmotionProps<HTMLDivElement> {
  isOpen?: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
  closeIcon?: React.ReactElement;
}
