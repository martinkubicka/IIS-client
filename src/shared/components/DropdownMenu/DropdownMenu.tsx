import { MoreVert, Edit, DeleteForever } from "@mui/icons-material";
import {
  IconButton,
  ListItemDecorator,
  ListDivider,
  Dropdown,
  MenuButton,
  Menu,
  MenuItem,
} from "@mui/joy";
import React from "react";

export const DropdownMenu = () => {
  return (
    <Dropdown>
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{ root: { variant: "plain", color: "neutral" } }}
      >
        <MoreVert />
      </MenuButton>
      <Menu placement="bottom-end">
        <MenuItem>
          <ListItemDecorator>
            <Edit />
          </ListItemDecorator>{" "}
          Edit post
        </MenuItem>
        <MenuItem disabled>
          <ListItemDecorator />
          Draft post
        </MenuItem>
        <MenuItem variant="soft" color="danger">
          <ListItemDecorator sx={{ color: "inherit" }}>
            <DeleteForever />
          </ListItemDecorator>{" "}
          Delete
        </MenuItem>
      </Menu>
    </Dropdown>
  );
};
