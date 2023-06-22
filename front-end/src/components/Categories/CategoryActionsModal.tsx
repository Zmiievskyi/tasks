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

interface PropsCategoryPage {
  onCreateCategory: (categoryName: any, userId: any) => void | null;
  title: string | null;
  onCloseActionPopup: (state: boolean) => void | null;
  category: any;
}

const validationSchema: yup.Schema<{ name: string }> = yup.object({
  name: yup.string().required("Name is required").label("Name"),
});

export default function CategoryActionsModal({
  onCreateCategory,
  title,
  onCloseActionPopup,
  category,
}: PropsCategoryPage) {
  const [open, setOpen] = useState(false);
  const userId = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  const handleOpen = () => {
    setOpen(true);
    onCloseActionPopup(true);
  };

  const handleClose = () => {
    onCloseActionPopup(false);
    setOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      name: category ? category.name : "",
    },

    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      if (category === "") {
        onCreateCategory(values.name, userId);
      } else {
        CategoriesAPI.updateCategory(category, values.name);
        dispatch(refreshUser());
      }
      resetForm();
      handleClose();
    },
  });

  return (
    <Box>
      <Button onClick={handleOpen}>{title}</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          component="form"
          noValidate
          onSubmit={formik.handleSubmit}
          sx={{
            ...style,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {title}
          </Typography>

          <TextField
            margin="normal"
            required
            autoComplete="Category name"
            fullWidth
            id="name"
            name="name"
            label="name"
            type="text"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            // helperText={formik.touched.name && formik.errors.name ? formik.errors.name : ""}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Button variant="outlined" size="large" onClick={handleClose}>
              Cansel
            </Button>
            <Button type="submit" variant="outlined" size="large">
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
