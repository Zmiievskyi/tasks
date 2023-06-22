import { useParams, NavLink } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";

import {
  Box,
  TextField,
  Card,
  TextareaAutosize,
  Container,
  Button,
  Typography,
} from "@mui/material";
import Input from "@mui/base/Input";

import TasksAPI from "../http/tasksAPI";
import { useAppDispatch, useAppSelector } from "../redux/selectors";
import { refreshUser } from "../redux/operations";

const validationSchema: yup.Schema<{ name: string; content: string }> =
  yup.object({
    name: yup.string().required("Title is required").label("Title"),
    content: yup.string().required("Content is required").label("Content"),
  });

export default function Task() {
  const dispatch = useAppDispatch();
  const url = useParams();
  const task = useAppSelector((state) => state.auth.task);

  const formik = useFormik({
    initialValues: {
      name: task.name,
      content: task.content && task.content,
    },

    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      TasksAPI.updateTask({
        ...values,
        id: task.id,
        categoryId: undefined,
      }).then(() => {
        dispatch(refreshUser());
      });
      resetForm();
    },
  });

  return (
    <Container
      sx={{
        backgroundColor: "#e9e9e9",
        height: "100vh",
        display: "flex",
        justifyContent: "flex-start",
      }}
      
    >
      <Box>
        <Typography color="blue">
          CATEGORIES/{url.categoryName?.toUpperCase()}/TASK
        </Typography>
        <NavLink to={`/categories/${url.categoryName}/${url.categoryId}`}>back</NavLink>
      </Box>

      <Card
        sx={{ width: "50%", height: "50%", marginTop: "100px", padding: "15px" }}
      >
        Edit task
        <Box
          component="form"
          noValidate
          onSubmit={formik.handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "baseline",
            mb: 2,
          }}
        >
          <TextField
            margin="normal"
            required
            autoComplete="Task title"
            fullWidth
            id="title"
            name="title"
            label="Name"
            type="text"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
          />
          <TextareaAutosize
            required
            autoComplete="Task content"
            id="content"
            name="content"
            minRows={4}
            placeholder="Discription"
            style={{ width: "100%", marginTop: "20px", marginBottom: "20px" }}
            value={formik.values.content}
            onChange={formik.handleChange}
          />
          <label htmlFor="startDay" style={{ display: "flex" }}>
            Start date:
            <Input type="date" style={{ marginLeft: "20px" }} />
          </label>
          <label
            htmlFor="endDay"
            style={{ display: "flex", marginTop: "10px" }}
          >
            End date:
            <Input type="date" style={{ marginLeft: "27px" }} />
          </label>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              width: "100%",
              marginTop: "15px",
            }}
          >
            <NavLink to={`/categories/${url.categoryName}/${url.categoryId}`}>
              <Button>Cansel</Button>
            </NavLink>
            <Button>Save</Button>
          </Box>
        </Box>
      </Card>
    </Container>
  );
}
