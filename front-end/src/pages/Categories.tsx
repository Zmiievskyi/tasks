import React, { useEffect } from "react";
// import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/selectors";
import CategoryActionsModal from "../components/Categories/CategoryActionsModal";
import CategoriesAPI from "../http/categoriesAPI";
import CategoryList from "../components/Categories/CategoryList";
import { Container, Box, Typography } from "@mui/material";
import { useAuth } from "../hooks/useAuth";

type Category = {
  id: number;
  name: string;
  createdAt: number;
  created: string;
};

export default function Categories() {
  const [categories, setCategories] = React.useState<Category[]>([]);
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.auth.user);
  const { isRefreshing } = useAuth();

  useEffect(() => {
    CategoriesAPI.getCategories().then((res) => {
      setCategories(res);
    });
  }, [dispatch, isRefreshing]);

  const handleCreateCategory = (categoryName: string, user: any) => {
    CategoriesAPI.createCategory(categoryName, Number(user.id)).then(
      (res) => {
        setCategories([...categories, res]);
      }
    );
  };

  return !status.token ? (
    <Container sx={{ backgroundColor: "#e9e9e9", height: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography>Refreshing...</Typography>
      </Box>
    </Container>
  ) : (
    <Container sx={{ backgroundColor: "#e9e9e9", height: "100%" }}>
      <Typography color="blue">CATEGORIES/</Typography>
      <Box sx={{ display: "flex", justifyContent: "center", marginTop:"20px"}}>
        <CategoryActionsModal
          title="Create category"
          onCreateCategory={handleCreateCategory}
          onCloseActionPopup={() => null}
          category={""}
        />
      </Box>
      <CategoryList categories={categories} />
    </Container>
  );
}
