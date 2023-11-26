import { DeleteForever, Edit } from "@mui/icons-material";
import { Box, IconButton, Stack } from "@mui/joy";
import GroupRole from "@src/enums/GroupRole";
import React from "react";
import Dialog from "../Dialog/Dialog";
import { Timestamp } from "../Timestamp/Timestamp";
import { PostUser } from "./PostUser";

interface PostHeaderProps {
  id?: string;
  name?: string;
  handle?: string;
  icon?: string;
  role?: GroupRole;
  showIcon?: boolean;
  timestamp?: Date;
  threadId: string;
  canDelete?: boolean;
  canEdit?: boolean;
  onUpdate?: (id?: string) => void;
  onDelete?: (id?: string) => void;
}

export const PostHeader = ({
  id,
  handle,
  name,
  icon,
  timestamp,
  canDelete = false,
  canEdit = false,
  showIcon = false,
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
          showIcon={showIcon}
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
        {canEdit && (
          <IconButton onClick={() => onUpdate(id)}>
            <Edit />
          </IconButton>
        )}
        {canDelete && (
          <IconButton onClick={handleDelete} variant="plain" color="danger">
            <DeleteForever />
          </IconButton>
        )}
      </Box>
    </Stack>
  );
};
