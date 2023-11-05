import { Box, Stack } from "@mui/joy";
import React from "react";
import { footerStyle } from "./style";
import { Rating } from "./Rating";
import { Timestamp } from "../Timestamp/Timestamp";

interface PostFooterProps {
  postId: string;
}

export const PostFooter = ({ postId }: PostFooterProps) => {
  return (
    <Box sx={footerStyle}>
      <Stack
        justifyContent={"space-between"}
        direction={"row"}
        alignItems={"center"}
      >
        <Rating postId={postId} />
      </Stack>
    </Box>
  );
};
