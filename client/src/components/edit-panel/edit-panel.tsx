import React, { useState } from "react";
import styled from "@emotion/styled";
import { Box, EmotionProps } from "../facade-good/facade-good";
import CloseIcon from "../../assets/icons/CloseIcon";
import OkIcon from "../../assets/icons/OkIcon";
import EditIcon from "../../assets/icons/EditIcon copy";
import DeleteIcon from "../../assets/icons/DeleteIcon";

const Container = styled(Box)(() => {
  return {
    display: "flex",
    justifyContent: "flex-end",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  };
});

const Button = styled("button")<EmotionProps<"button">>(({ theme }) => {
  return {
    width: 34,
    height: 34,
    background: "none",
    border: "none",
    borderRadius: "30%",
    lineHeight: 0,
    color: theme.colors.cardTextPrimary,
    ":hover": {
      background: "#c8c8c8",
    },
    ":active": {
      color: "#c86464",
    },
    ":disabled": {
      color: "#ccc",
      background: "none",
    },
  };
});

interface Props extends EmotionProps<HTMLDivElement> {
  onDelete?: () => void;
  onConfirm?: () => void;
  onCancel?: () => void;
  setEditMode: (value: boolean) => void;
  editMode: boolean;
}

const EditPanel: React.FC<Props> = ({
  onDelete,
  onConfirm,
  onCancel,
  setEditMode,
  editMode,
  ...props
}) => {
  const handleConfirm = () => {
    setEditMode(false);
    if (onConfirm && typeof onConfirm === "function") {
      onConfirm();
    }
  };

  const handleCancel = () => {
    setEditMode(false);
    if (onCancel && typeof onCancel === "function") {
      onCancel();
    }
  };

  const handleDelete = () => {
    if (onDelete && typeof onDelete === "function") {
      onDelete();
    }
  };

  return (
    <Container {...props}>
      <Button hidden={!editMode} onClick={handleConfirm}>
        <OkIcon width={32} height={32} color="#00b400" />
      </Button>

      <Button hidden={!editMode} onClick={handleCancel}>
        <CloseIcon width={32} height={32} color="#c80000" />
      </Button>

      <Button onClick={() => setEditMode(true)} hidden={editMode}>
        <EditIcon width={32} height={32} />
      </Button>

      <Button disabled={editMode} onClick={handleDelete}>
        <DeleteIcon width={32} height={32} />
      </Button>
    </Container>
  );
};
export default EditPanel;
