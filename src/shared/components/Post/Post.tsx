import { Avatar, Box, Divider, Stack } from "@mui/joy";
import GroupRole from "@src/enums/GroupRole";
import Role from "@src/enums/Role";
import { loginService } from "@src/services/loginService";
import { memberService } from "@src/services/memberService";
import { postService } from "@src/services/postService";
import { userService } from "@src/services/userService";
import { PostModel } from "@src/shared/models/PostModel";
import { UserProfileModel } from "@src/shared/models/UserProfileModel";
import React from "react";
import { useMutation, useQuery } from "react-query";
import { Icon } from "../Icon/Icon";
import { PostContent } from "./PostContent";
import { PostFooter } from "./PostFooter";
import { PostHeader } from "./PostHeader";
import { postStyle } from "./style";

interface PostProps extends PostModel {
  lastPost?: boolean;
  showIcon?: boolean;
  deletable?: boolean;
  editable?: boolean;
  onDelete?: (id?: string) => void;
}

export const Post = ({
  id,
  threadId,
  handle,
  text,
  date,
  deletable = true,
  editable = true,
  showIcon = false,
  lastPost = false,
  onDelete = () => {},
}: PostProps) => {
  const [user, setUser] = React.useState<UserProfileModel>();
  const [editing, setEditing] = React.useState(false);
  const [canDelete, setCanDelete] = React.useState(false);
  const [canEdit, setCanEdit] = React.useState(false);
  const [ratingDisabled, setRatingDisabled] = React.useState(true);
  const currentLoginHandle = loginService.getCookie("userHandle");
  const currentLoginEmail = loginService.getCookie("userEmail");
  const currentLoginRole = loginService.getCookie("userRole");
  const { data: currentMemberRole } = useQuery({
    queryKey: `postHeaderGroupRole${threadId}`,
    queryFn: async (): Promise<GroupRole | undefined> => {
      if (id) {
        const groupHandle = await postService.getGroupHandleByPostId(id);
        const data = await memberService.getMemberRole(
          currentLoginEmail,
          groupHandle
        );

        if (!data && data !== GroupRole.admin) {
          return undefined;
        }
        return data;
      }
      return undefined;
    },
  });

  React.useEffect(() => {
    setCanDelete(
      (currentMemberRole != undefined &&
        currentMemberRole === GroupRole.admin) ||
        currentMemberRole === GroupRole.moderator ||
        currentLoginRole === Role.admin ||
        (handle != null && currentLoginHandle === handle)
    );

    setCanEdit(handle != null && currentLoginHandle === handle);

    setRatingDisabled(currentMemberRole === undefined);
  }, [handle, currentLoginHandle, currentLoginRole, currentMemberRole]);

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
      } catch (error) {}
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
          {!lastPost && !showIcon && (
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
          threadId={threadId as string}
          canDelete={deletable && canDelete}
          canEdit={editable && canEdit}
        />
        <PostContent
          editing={editing}
          text={text as string}
          onPostUpdate={handleUpdatePost}
          onEditCancel={handleCancelEditing}
          updateLoading={updateLoading}
        />
        <PostFooter ratingDisabled={ratingDisabled} postId={id as string} />
      </Stack>
    </Stack>
  );
};
