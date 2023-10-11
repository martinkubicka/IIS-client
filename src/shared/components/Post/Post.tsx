import { Avatar, Box, Card, CardContent, Divider, Stack } from "@mui/joy";
import { PostUser } from "./PostUser";
import { PostHeader } from "./PostHeader";
import { PostContent } from "./PostContent";
import { postStyle } from "./style";
import { Icon } from "../Icon/Icon";
import { PostFooter } from "./PostFooter";
import { PostModel } from "@src/shared/models/PostModel";
import { userService } from "@src/services/userService";
import React from "react";
import { UserProfileModel } from "@src/shared/models/UserProfileModel";

interface PostProps extends PostModel {
  lastPost?: boolean;
}

export const Post = ({
  id,
  threadId,
  handle,
  text,
  date,
  lastPost = false,
}: PostProps) => {
  const [user, setUser] = React.useState<UserProfileModel>();

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await userService.getUser(handle);

        setUser(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <Stack
      paddingTop={"20px"}
      direction={"row"}
      width={"95%"}

      /*  sx={postStyle} */
    >
      <Stack minWidth={"70px"} flexDirection={"column"} alignItems={"center"}>
        <Avatar>
          <Icon iconName={user?.icon} />
        </Avatar>
        <Box flexGrow={"1"}>
          {!lastPost && (
            <Divider
              sx={{ height: "calc(100% + 20px)", width: "1px" }}
              orientation={"vertical"}
            />
          )}
        </Box>
      </Stack>
      <Stack width={"100%"} spacing={1}>
        <PostHeader icon={user?.icon} handle={user?.handle} name={user?.name} />
        <Box>{text}</Box>
      </Stack>
    </Stack>
  );
};
