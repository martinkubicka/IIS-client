import { Avatar, Box, Chip, Divider, Stack, Typography } from "@mui/joy";
import React from "react";
import { threadHeaderStyle } from "./styles/style";
import { Icon } from "@src/shared/components/Icon/Icon";

interface ThreadHeaderProps {
  name: string;
  description?: string;
}

export const ThreadHeader = ({ name, description = "" }: ThreadHeaderProps) => {
  return (
    <Box sx={threadHeaderStyle}>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Box padding={2}>
          <Typography level="h1">{`#${name}`}</Typography>
          <Typography level="body-lg">{description}</Typography>
        </Box>
        <Stack height={"100%"}>
          <Chip
            sx={{
              "--Chip-decoratorChildHeight": "40px",
              "--Chip-paddingInline": "20px",
            }}
            endDecorator={
              <Avatar>
                <Icon />
              </Avatar>
            }
          >
            {"created by:"}
          </Chip>
        </Stack>
      </Stack>

      <Divider />
    </Box>
  );
};
