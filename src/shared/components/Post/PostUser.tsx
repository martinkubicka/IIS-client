import { Avatar, Link, Stack, Typography, VariantProp } from "@mui/joy";
import React from "react";
import { useNavigate } from "react-router-dom";
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
  const [variant, setVariant] = React.useState<VariantProp>("soft");
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/profile/${handle}`);
  };

  const handleMouseOver = () => {
    setVariant("outlined");
  };

  const handleMouseOut = () => {
    setVariant("soft");
  };

  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
      height={"100%"}
      width={width}
    >
      {showIcon && (
        <Avatar
          variant={variant}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          onClick={handleClick}
        >
          <Icon iconName={icon}></Icon>
        </Avatar>
      )}

      <Stack spacing={-0.5} direction={"column"}>
        {username && <Typography level="title-sm">{username}</Typography>}
        {handle && (
          <Link onClick={handleClick} fontSize={14}>{`@${handle}`}</Link>
        )}
      </Stack>
    </Stack>
  );
};
