import {
  Box,
  Dropdown,
  IconButton,
  ListDivider,
  ListItemDecorator,
  Menu,
  MenuButton,
  MenuItem,
  Stack,
} from "@mui/joy";
import { PostUser } from "./PostUser";
import { Timestamp } from "../Timestamp/Timestamp";
import { MoreVert, Edit, DeleteForever } from "@mui/icons-material";
import React from "react";
import Dialog from "../Dialog/Dialog";

interface PostHeaderProps {
  id?: string;
  name?: string;
  handle?: string;
  icon?: string;
  role?: string;
  timestamp?: Date;
  onUpdate?: (id?: string) => void;
  onDelete?: (id?: string) => void;
}

export const PostHeader = ({
  id,
  handle,
  name,
  icon,
  timestamp,
  onUpdate = () => {},
  onDelete = () => {},
}: PostHeaderProps) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);

  const handleDelete = () => {
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    setDeleteDialogOpen(false);
    onDelete(id);
  };

  return (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Stack
        alignItems={"center"}
        justifyContent={"space-evenly"}
        direction={"row"}
      >
        <PostUser
          showIcon={false}
          handle={handle as string}
          username={name as string}
          width={"120px"}
          icon={icon}
        />
        {timestamp && (
          <Timestamp relative includeDate={false} timestamp={timestamp} />
        )}
      </Stack>

      <Dialog
        onConfirm={handleConfirmDelete}
        onClose={() => setDeleteDialogOpen(false)}
        content={"Are you sure you want to delete the post?"}
        open={deleteDialogOpen}
        title={"Delete post"}
      />

      <Box sx={{ marginRight: { xs: 0, md: 10 } }}>
        <IconButton onClick={() => onUpdate(id)}>
          <Edit />
        </IconButton>
        <IconButton onClick={handleDelete} variant="plain" color="danger">
          <DeleteForever />
        </IconButton>
      </Box>
    </Stack>
  );
};
