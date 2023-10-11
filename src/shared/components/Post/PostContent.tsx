import { Box, Container, Typography } from "@mui/joy";
import React from "react";

interface PostContentProps {
  children: React.ReactNode;
}

export const PostContent = ({ children }: PostContentProps) => {
  return (
    <Box>
      <Typography level={"body-md"}>{children}</Typography>
    </Box>
  );
};
