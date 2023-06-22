import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import TextareaAutosize from "@mui/base/TextareaAutosize";

import Modal from "@mui/material/Modal";
import { useAppDispatch } from "../../redux/selectors";
import * as yup from "yup";
import { useFormik } from "formik";
import TasksAPI from "../../http/tasksAPI";
import { refreshUser } from "../../redux/operations";

const validationSchema: yup.Schema<{ name: string; content: string }> =
  yup.object({
    name: yup.string().required("Name is required").label("Name"),
    content: yup.string().required("Content is required").label("Content"),
  });

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

export default function TaskAddModal() {
  const [open, setOpen] = useState(false);
  const { categoryId } = useParams();
  const dispatch = useAppDispatch();
  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      content: "",
    },

    validationSchema: validationSchema,
    onSubmit: (values) => {
      TasksAPI.createTask({
        ...values,
        categoryId,
      }).then(() => {
        handleClose();
        dispatch(refreshUser());
      });
    },
  });

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Button onClick={handleOpen}>Add task</Button>
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
          Create a task
          <TextField
            margin="normal"
            required
            autoComplete="Task title"
            fullWidth
            id="name"
            name="name"
            label="name"
            type="text"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextareaAutosize
            autoComplete="Task content"
            id="content"
            name="content"
            value={formik.values.content}
            onChange={formik.handleChange}
            aria-label="minimum height"
            minRows={3}
            placeholder="Minimum 3 rows"
            style={{ width: "100%" }}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Button>cansel</Button>
            <Button type="submit">save</Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
