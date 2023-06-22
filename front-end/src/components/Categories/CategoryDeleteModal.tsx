import { useRef, useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { Box, Button, Typography, TextField, Modal } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux/selectors";
import CategoriesAPI from "../../http/categoriesAPI";
import { refreshUser } from "../../redux/operations";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
type PropsCategoryActions = {
  onCloseActionPopup: (state: boolean) => void;
  category: any;
};

export default function CategoryDeleteModal({
  onCloseActionPopup,
  category,
}: PropsCategoryActions) {
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useAppDispatch();

  const handleOpen = () => {
    setOpenModal(true);
    onCloseActionPopup(true);
  };

  const handleDelete = () => {
    setOpenModal(false);
    CategoriesAPI.deleteCategory(Number(category.id));
    dispatch(refreshUser());
  };

  const handleClose = () => {
    onCloseActionPopup(false);
    setOpenModal(false);
  };

  return (
    <Box>
      <Button onClick={handleOpen}>delete</Button>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            ...style,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            alignItems="center"
          >
            Are you sure you want to delete this category?
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Button
              variant="outlined"
              size="large"
              onClick={handleClose}
            >
              no
            </Button>
            <Button
              type="submit"
              variant="outlined"
              size="large"
              onClick={handleDelete}
            >
              yes
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
