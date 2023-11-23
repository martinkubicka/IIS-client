import { Box, Stack } from "@mui/joy";
import React from "react";
import { footerStyle } from "./style";
import { Rating } from "./Rating";
import { Timestamp } from "../Timestamp/Timestamp";

interface PostFooterProps {
  postId: string;
  ratingDisabled?: boolean;
}

export const PostFooter = ({
  postId,
  ratingDisabled = false,
}: PostFooterProps) => {
  return (
    <Box sx={footerStyle}>
      <Stack
        justifyContent={"space-between"}
        direction={"row"}
        alignItems={"center"}
      >
        <Rating disabled={ratingDisabled} postId={postId} />
      </Stack>
    </Box>
  );
};
