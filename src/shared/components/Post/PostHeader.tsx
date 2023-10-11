import { Box, Stack } from "@mui/joy";
import { PostUser } from "./PostUser";
import { DropdownMenu } from "../DropdownMenu/DropdownMenu";
import { Timestamp } from "../Timestamp/Timestamp";

interface PostHeaderProps {
  name?: string;
  handle?: string;
  icon?: string;
  role?: string;
  timestamp?: Date;
}

export const PostHeader = ({
  handle,
  name,
  icon,
  timestamp,
}: PostHeaderProps) => {
  return (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Stack
        alignItems={"center"}
        justifyContent={"space-evenly"}
        direction={"row"}
      >
        <PostUser
          showIcon={false}
          handle={handle as string}
          username={name as string}
          width={"120px"}
          icon={icon}
        />
        {timestamp && (
          <Timestamp relative includeDate={false} timestamp={timestamp} />
        )}
      </Stack>

      <Box>
        <DropdownMenu />
      </Box>
    </Stack>
  );
};
