import { Box } from "@mui/joy";
import React from "react";
import { footerStyle } from "./style";
import { Rating } from "./Rating";

interface PostFooterProps {
  initialRating: number;
  onRatingChange: (positive: boolean) => void;
}

export const PostFooter = (/* {initialRating,rating}: PostFooterProps */) => {
  return (
    <Box sx={footerStyle}>
      <Rating />
    </Box>
  );
};
