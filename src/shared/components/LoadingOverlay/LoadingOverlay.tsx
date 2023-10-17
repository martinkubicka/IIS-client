import { CircularProgress, Sheet, Stack } from "@mui/joy";
import React from "react";
import { overlayStyle } from "./style";

export const LoadingOverlay = () => {
  return (
    <Stack justifyContent={"center"} alignItems={"center"} sx={overlayStyle}>
      <CircularProgress />
    </Stack>
  );
};
