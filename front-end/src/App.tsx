import { useEffect, ComponentType } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { SharedLayout } from "./layout/SharedLayout";
import { Categories, SignIn, SignUp, Tasks, Task } from "./pages";
import { useAppDispatch, useAppSelector } from "./redux/selectors";
import { refreshUser } from "./redux/operations";
import { RestrictedRoute } from "./components/RouterSetting/RestrictedRouter";
import { PrivateRoute } from "./components/RouterSetting/PrivateRoute";
import { useAuth } from "./hooks/useAuth";
import { Skeleton } from "@mui/material";

const CategoriesComponent: ComponentType<any> = Categories;
const SigninComponent: ComponentType<any> = SignIn;
const SignUpComponent: ComponentType<any> = SignUp;
const TasksComponent: ComponentType<any> = Tasks;
const TaskComponent: ComponentType<any> = Task;

function App() {
  const dispatch = useAppDispatch();
  const { isRefreshing } = useAuth();
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <SharedLayout title="Refreshing" />
  ) : (
    <Routes>
      <Route path="/" element={<SharedLayout title={null} />}>
        <Route
          index
          element={
            <RestrictedRoute
              redirectTo="/categories"
              component={() => <SigninComponent />}
            />
          }
        />
        <Route
          path="/signin"
          element={
            <RestrictedRoute
              redirectTo="/categories"
              component={() => <SigninComponent />}
            />
          }
        />
        <Route
          path="/signup"
          element={
            <RestrictedRoute
              redirectTo="/categories"
              component={() => <SignUpComponent />}
            />
          }
        />
        <Route
          path="/categories"
          element={
            <PrivateRoute
              redirectTo="/signin"
              component={() => <CategoriesComponent />}
            />
          }
        />
        <Route
          path="/categories/:categoryName/:categoryId"
          element={
            <PrivateRoute
              redirectTo="/signin"
              component={() => <TasksComponent />}
            />
          }
        />
        <Route
            path="/categories/:categoryName/:categoryId/task/:taskId"
            element={
              <PrivateRoute
                redirectTo="/signin"
                component={() => <TaskComponent />}
              />
            }
          />
      </Route>
    </Routes>
  );
}

export default App;
