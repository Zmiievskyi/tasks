import { NavLink } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";

import {Avatar, Button, CssBaseline, Typography, Container, TextField, FormControlLabel, Checkbox, Link, Grid, Box} from "@mui/material"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { useAppDispatch } from "../redux/selectors";
import { signinAction } from "../redux/operations";

const validationSchema: yup.Schema<{ email: string; password: string }> =
  yup.object({
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

const defaultTheme = createTheme();




export default function SignIn() {

const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      email: "foobar@example.com",
      password: "12345678",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(signinAction(values)).then((res) => {
        if (res.payload === "Request failed with status code 500") {
          alert("Password or email is incorrect");
        }
      });
    },
  });


  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
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
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                autoComplete="email"
                autoFocus
                name="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
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
             
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <NavLink
                    to="/signup"
                  >
                    {"Don't have an account? Sign Up"}
                  </NavLink>
                </Grid>
              </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

