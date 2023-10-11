import { FormatBold } from "@mui/icons-material";
import { Box, IconButton, Textarea, ToggleButtonGroup } from "@mui/joy";
import React from "react";
import { newPostStyle, newPostTextAreaStyle } from "./styles/style";
import { NewPostTextArea } from "./NewPostTextArea";

export const NewPost = () => {
  return (
    <Box sx={newPostStyle}>
      <NewPostTextArea />
    </Box>
  );
};
