import { Box, Typography } from "@mui/joy";
import React from "react";
import { threadHeaderStyle } from "./styles/style";

interface ThreadHeaderProps {
  name: string;
  description?: string;
}

export const ThreadHeader = ({ name, description = "" }: ThreadHeaderProps) => {
  return (
    <Box sx={threadHeaderStyle}>
      <Box padding={2}>
        <Typography level="h1">{`#${name}`}</Typography>
        <Typography level="body-lg">{description}</Typography>
      </Box>
    </Box>
  );
};
