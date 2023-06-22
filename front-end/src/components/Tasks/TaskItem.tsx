import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  Typography,
  Box
} from "@mui/material";
import { NavLink, useParams } from "react-router-dom";
import StarIcon from "@mui/icons-material/StarBorder";
import TasksAPI from "../../http/tasksAPI";
import { refreshUser } from "../../redux/operations";
import { useAppDispatch } from "../../redux/selectors";

const moment = require("moment");

export default function TaskItem({ task: t }: { task: any }) {
  const dispatch = useAppDispatch();
  const { categoryName, categoryId } = useParams();

  const handleDelete = () => {
    TasksAPI.deleteTask(t.id).then(() => {
      dispatch(refreshUser());
    });
  };

  return (
    <Card>
      <CardHeader
        title={t.name}
        titleTypographyProps={{ align: "center" }}
        subheaderTypographyProps={{ align: "center" }}
        action={
          <StarIcon
            sx={{ color: "black" }}
            onClick={() => console.log("click")}
          />
        }
        sx={{ backgroundColor: "#e9e9e9" }}
      />
      <CardContent>
        <Typography variant="body1" color="inherit" noWrap>
          Start date:
          <span style={{ marginLeft: "10px" }}>
            {moment(t.createdAt).format("DD/MM/YYYY")}
          </span>
        </Typography>
        <Typography variant="body1" color="inherit" noWrap>
          End date:{" "}
          <span style={{ marginLeft: "12px" }}>
            {moment().add(10, "days").calendar()}
          </span>
        </Typography>
      </CardContent>
      <CardActions>
        <Box sx={{display:"flex", justifyContent: "space-around", width: "100%"}}>
        <NavLink to={`/categories/${categoryName}/${categoryId}/task/${t.id}`}>
          <Button >
            Edit
          </Button>
        </NavLink>
        <Button  onClick={handleDelete}>
          Delete
        </Button>
        </Box>
        
      </CardActions>
    </Card>
  );
}
