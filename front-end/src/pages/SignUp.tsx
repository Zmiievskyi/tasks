import * as React from "react";
import { NavLink } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";

import {Avatar, Button, TextField, FormControlLabel, Checkbox, Container, Link, Grid, Box, Typography} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import { useAppDispatch } from "../redux/selectors";
import { signupAction } from "../redux/operations";

const validationSchema: yup.Schema<{ email: string; password: string }> =
  yup.object({
    firstName: yup
      .string()
      .required("First name is required")
      .label("First name"),
    lastName: yup.string().required("Last name is required").label("Last name"),
    email: yup
      .string()
      .required("Email is required")
      .email("Enter a valid email")
      .label("Email"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password should be of minimum 8 characters length")
      .label("Password"),
  });

export default function SignUp() {
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "foobar@example.com",
      password: "12345678",
    },

    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(signupAction(values)).then((result) => {
        if (result.payload === "Request failed with status code 400") {
          alert("User already exist");
        }
      });
    },
  });
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={formik.handleSubmit}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={formik.values.firstName}
                onChange={formik.handleChange}
                error={
                  formik.touched.firstName && Boolean(formik.errors.firstName)
                }
                helperText={formik.touched.firstName && formik.errors.firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.lastName)
                }
                helperText={formik.touched.lastName && formik.errors.lastName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                name="email"
                autoComplete="email"
                margin="normal"
                autoFocus
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="normal"
                required
                autoComplete="current-password"
                fullWidth
                id="password"
                name="password"
                label="Password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
            </Grid>
           
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <NavLink
                to="/signin"
              >
                Already have an account? Sign in
              </NavLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
