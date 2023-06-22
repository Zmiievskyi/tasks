import {List, ListItem} from "@mui/material";
import CategoryItem from "./CategoryItem";

type Category = {
  id: number;
  name: string;
  createdAt: number;
  created: string;
};


export default function CategoryList({categories}: {categories: Category[]}) {

    return (
      <List >
        {categories && categories.map((category: Category, index: number) => (
          <ListItem key={index}>
            <CategoryItem item={category}/>
          </ListItem>
        ))}
      </List>
    );
  }