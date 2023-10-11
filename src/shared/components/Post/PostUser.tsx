import { Avatar, Link, Stack, Typography } from "@mui/joy";
import React from "react";
import { Icon } from "../Icon/Icon";

interface PostUserProps {
  icon?: string;
  handle: string;
  username: string;
  width?: string | number;
  showIcon?: boolean;
}

export const PostUser = ({
  icon,
  handle,
  username,
  width,
  showIcon = true,
}: PostUserProps) => {
  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
      height={"100%"}
      width={width}
    >
      {showIcon && (
        <Avatar>
          <Icon iconName={icon}></Icon>
        </Avatar>
      )}

      <Stack direction={"column"}>
        <Typography level="title-md">{username}</Typography>
        <Link>{`@${handle}`}</Link>
      </Stack>
    </Stack>
  );
};
