import { Box, Stack } from "@mui/joy";
import React from "react";
import { footerStyle } from "./style";
import { Rating } from "./Rating";
import { Timestamp } from "../Timestamp/Timestamp";

interface PostFooterProps {
  initialRating: number;
  onRatingChange: (direction: number) => void;
}

export const PostFooter = ({
  initialRating,
  onRatingChange,
}: PostFooterProps) => {
  return (
    <Box sx={footerStyle}>
      <Stack
        justifyContent={"space-between"}
        direction={"row"}
        alignItems={"center"}
      >
        <Rating onRatingChange={onRatingChange} rating={initialRating} />
      </Stack>
    </Box>
  );
};
