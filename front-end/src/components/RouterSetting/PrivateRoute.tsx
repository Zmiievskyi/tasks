import { Navigate } from "react-router-dom";
import { ComponentType } from "react";

import { useAuth } from "../../hooks/useAuth";

type Props = {
  component: ComponentType<any>;
  redirectTo?: string;
};

export const PrivateRoute = ({
  component: Component,
  redirectTo = "/",
}: Props) => {

  const { isLogin, isRefreshing } = useAuth();
  const shouldRedirect = !isLogin&& !isRefreshing;
  return shouldRedirect ? <Navigate to={redirectTo} /> : <Component />;
};
