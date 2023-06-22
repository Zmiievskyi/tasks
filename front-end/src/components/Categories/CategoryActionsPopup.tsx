import React from "react";
import { Box, Button, Popover, Typography } from "@mui/material";
import CategoryEditPopup from "./CategoryEditPopup";
import CategoryDeleteModal from "./CategoryDeleteModal";
import { StringSchema } from "yup";
import CategoryActionsModal from "./CategoryActionsModal";

// import CategoryDeletePopup from "./CategoryDeletePopup";
// import CategoryEditPopup from "./CategoryEditPopup";

export default function CategoryActionsPopup({
  title,
  category,
}: {
  title: string;
  category: any;
}) {


  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [hidden, setHidden] = React.useState<boolean>(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onClosePopup = (state: any):void => {
    setHidden(state as boolean);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <div>
      <Button aria-describedby={id} variant="text" onClick={handleClick}>
        {title}
      </Button>
      <Popover
        sx={{ display: `${hidden ? "none" : "block"}` }}
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Typography sx={{ p: 2 }}>What are you goin to do?</Typography>
        <Box sx={{ display: "flex", justifyContent: "space-around" }}>
          <CategoryDeleteModal onCloseActionPopup={onClosePopup} category={category}/>
          <CategoryActionsModal onCloseActionPopup={onClosePopup} onCreateCategory={()=>null} title='Edit' category={category}/>
        </Box>
      </Popover>
    </div>
  );
}
