import * as React from "react";
import { NavLink, useParams } from "react-router-dom";

import { Box, Container, Button, Typography } from "@mui/material";

import TasksAPI from "../http/tasksAPI";
import Task from "../models/task";
import TaskAddModal from "../components/Tasks/TaskAddModal";
import TaskList from "../components/Tasks/TaskList";

export default function Tasks() {
  const { categoryId, categoryName } = useParams();
  const [tasks, setTasks] = React.useState<Task[]>([]);

  React.useEffect(() => {
    TasksAPI.getTasks(categoryId).then((data) => setTasks([...data]));
  }, [categoryId]);

  return (
    <Container sx={{ backgroundColor: "#e9e9e9", height: "100%" }}>
      <Typography color="blue">CATEGORIES/{categoryName?.toUpperCase()}</Typography>
      <NavLink to={`/categories`}>back</NavLink>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Button
          variant="outlined"
          size="medium"
          style={{ width: "200px", marginTop: "20px", marginBottom: "20px" }}
        >
          <TaskAddModal />
        </Button>
        <TaskList tasks={tasks} />
      </Box>
    </Container>
  );
}
