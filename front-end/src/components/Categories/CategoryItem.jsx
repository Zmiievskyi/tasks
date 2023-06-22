import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import moment from "moment";
import { Box, Typography, Button } from "@mui/material";

import TasksAPI from "../../http/tasksAPI";
import CategoryActionsPopup from "./CategoryActionsPopup";

export default function CategoryItem({ item }) {
  const [tasks, setTasks] = useState([]);
  const actualDate = new Date();
  const date = moment(actualDate).format("DD.MM.YYYY");

  useEffect(() => {
    TasksAPI.getTasks(item.id).then((data) => setTasks([...data]));
  }, [item.id]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-around",
        flexDirection: { xs: "column", sm: "row", md: "row" },
        border: "1px solid black",
        width: "100%",
        alignItems: "center",
      }}
    >
      <Box sx={{ width: "33%", display: "flex", justifyContent: "center" }}>
        <Typography>{item.name}</Typography>
      </Box>
      <Box
        sx={{
          width: "33%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <NavLink
          to={`/categories/${item.name.toLowerCase()}/${item.id}`}
          style={{
            // display: "flex",
            // justifyContent: {xs:"space-between", md:"space-around", lg:"space-around"},
            margin: "20px",
            textDecoration: "none",
          }}
        >
          <Typography>{tasks.length} Tasks</Typography>
        </NavLink>
        <Typography>{date}</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          flexDirection: "row",
          width: "33%",
        }}
      >
        <CategoryActionsPopup title="Actions" category={item}/>
        <Button>More</Button>
      </Box>
    </Box>
  );
}
