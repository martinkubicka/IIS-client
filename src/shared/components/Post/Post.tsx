import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Stack,
  Textarea,
  Typography,
} from "@mui/joy";
import { PostUser } from "./PostUser";
import { PostHeader } from "./PostHeader";
import { postStyle } from "./style";
import { Icon } from "../Icon/Icon";
import { PostFooter } from "./PostFooter";
import { PostModel } from "@src/shared/models/PostModel";
import { userService } from "@src/services/userService";
import React from "react";
import { UserProfileModel } from "@src/shared/models/UserProfileModel";
import { postService } from "@src/services/postService";
import { PostContent } from "./PostContent";
import { useMutation } from "react-query";

interface PostProps extends PostModel {
  lastPost?: boolean;

  onDelete?: (id?: string) => void;
}

export const Post = ({
  id,
  threadId,
  handle,
  text,
  date,
  lastPost = false,
  onDelete = () => {},
}: PostProps) => {
  const [user, setUser] = React.useState<UserProfileModel>();
  const [rating, setRating] = React.useState(0);
  const [editing, setEditing] = React.useState(false);

  const { mutate: updatePostMutation, isLoading: updateLoading } = useMutation(
    async ({ id, text }: { id: string; text: string }) => {
      const data = await postService.updatePost(id, text);
      return data;
    },
    {
      onSuccess: () => {
        setEditing(false);
      },
    }
  );

  const handleEditing = () => {
    setEditing(true);
  };

  const handleCancelEditing = () => {
    setEditing(false);
  };

  const handleUpdatePost = (text: string) => {
    if (id) {
      updatePostMutation({ id, text });
    }
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await userService.getUser(handle);

        setUser(data);
      } catch (error) {
        console.log(error);
      }
      try {
        const data = await postService.calculateRating(id as string);
        setRating(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <Stack paddingTop={"30px"} direction={"row"} width={"95%"} sx={postStyle}>
      <Stack minWidth={"70px"} flexDirection={"column"} alignItems={"center"}>
        <Avatar>
          <Icon iconName={user?.icon} />
        </Avatar>
        <Box flexGrow={"1"}>
          {!lastPost && (
            <Divider
              sx={{ height: "calc(100% + 30px)", width: "1px" }}
              orientation={"vertical"}
            />
          )}
        </Box>
      </Stack>
      <Stack width={"100%"} spacing={1}>
        <PostHeader
          id={id}
          timestamp={date}
          icon={user?.icon}
          handle={user?.handle}
          name={user?.name}
          onUpdate={handleEditing}
          onDelete={onDelete}
        />
        <PostContent
          editing={editing}
          text={text as string}
          onPostUpdate={handleUpdatePost}
          onEditCancel={handleCancelEditing}
          updateLoading={updateLoading}
        />
        <PostFooter onRatingChange={() => {}} initialRating={rating} />
      </Stack>
    </Stack>
  );
};
