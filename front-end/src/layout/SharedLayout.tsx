import { Suspense } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  Container,
  AppBar,
  CssBaseline,
  Button,
  Toolbar,
  Typography,
  Box,
  Skeleton,
} from "@mui/material";

import { useAppSelector, useAppDispatch } from "../redux/selectors";
import { logoutAction } from "../redux/operations";

interface SharedLayoutProps {
  title: string | null;
}

export const SharedLayout = ({ title }: SharedLayoutProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    user: { email },
  } = useAppSelector((state) => state.auth);

  const logoutHandler = () => {
    dispatch(logoutAction());
    localStorage.removeItem("persist:auth");
    navigate("/signin", { replace: true });
  };

  return (
    <Container
      component="main"
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        }}
      >
        <Toolbar sx={{ flexWrap: "wrap" }}>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            {email}
          </Typography>
          <Button
            onClick={logoutHandler}
            variant="outlined"
            sx={{ my: 1, mx: 1.5 }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Suspense fallback={<Box>Loading...</Box>}>
        {title ? (
          <Box>
            <Skeleton variant="rectangular" width="100%" height="100vh">
              <Typography>{title}</Typography>
            </Skeleton>
          </Box>
        ) : (
          <Outlet />
        )}
      </Suspense>
    </Container>
  );
};
