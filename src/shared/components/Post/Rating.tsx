import {
  KeyboardArrowDownRounded,
  KeyboardArrowUpRounded,
} from "@mui/icons-material";
import { IconButton, Stack, Typography } from "@mui/joy";
import React from "react";

interface RatingProps {
  rating: number;
  onRatingChange: (direction: number) => void;
}

export const Rating = ({ rating, onRatingChange }: RatingProps) => {
  const [upvoted, setUpvoted] = React.useState(false);
  const [downvoted, setDownvoted] = React.useState(false);

  const handleClick = (direction: number) => {
    onRatingChange(direction);
    if (direction === 1) {
      setUpvoted(true);
    } else {
      setDownvoted(true);
    }
  };

  return (
    <Stack
      justifyContent={"space-between"}
      alignItems={"center"}
      minWidth={"100px"}
      width={"min-content"}
      direction={"row"}
    >
      <IconButton
        onClick={() => handleClick(1)}
        color={"primary"}
        variant={upvoted ? "solid" : "plain"}
      >
        {<KeyboardArrowUpRounded />}
      </IconButton>
      <Typography>{rating}</Typography>
      <IconButton
        onClick={() => handleClick(-1)}
        color={"primary"}
        variant={downvoted ? "solid" : "plain"}
      >
        {<KeyboardArrowDownRounded />}
      </IconButton>
    </Stack>
  );
};
