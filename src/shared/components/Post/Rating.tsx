import {
  KeyboardArrowDownRounded,
  KeyboardArrowUpRounded,
} from "@mui/icons-material";
import { IconButton, Stack, Typography } from "@mui/joy";
import React from "react";

export const Rating = () => {
  return (
    <Stack width={"100px"} direction={"row"}>
      <IconButton>{<KeyboardArrowDownRounded />}</IconButton>
      <Typography>10</Typography>
      <IconButton>{<KeyboardArrowUpRounded />}</IconButton>
    </Stack>
  );
};
