import { Box, Stack } from "@mui/joy";
import { PostUser } from "./PostUser";
import { DropdownMenu } from "../DropdownMenu/DropdownMenu";

interface PostHeaderProps {
  name?: string;
  handle?: string;
  icon?: string;
  role?: string;
}

export const PostHeader = ({ handle, name, icon }: PostHeaderProps) => {
  return (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <PostUser
        showIcon={false}
        handle={handle as string}
        username={name as string}
        width={"150px"}
        icon={icon}
      />
      <Box>
        <DropdownMenu />
      </Box>
    </Stack>
  );
};
