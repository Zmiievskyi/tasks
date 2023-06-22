import { useAppSelector } from "../redux/selectors";

export const useAuth = () => {
  const {
    status: { isLogin, isRefreshing },
    user,
  } = useAppSelector((state) => state.auth);

  return {
    isLogin,
    user,
    isRefreshing
  };
};
