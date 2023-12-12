/**
 * @file Thread.tsx
 * @author { Dominik Petrik (xpetri25) }
 * @date 17.12.2023
 * @brief Definition of Thread component
 */

import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { InfoRounded } from "@mui/icons-material";
import { Alert, Stack } from "@mui/joy";
import API_BASE_URL from "@src/apiConfig";
import Role from "@src/enums/Role";
import { loginService } from "@src/services/loginService";
import { memberService } from "@src/services/memberService";
import { postService } from "@src/services/postService";
import { threadService } from "@src/services/threadService";
import { userService } from "@src/services/userService";
import { Page } from "@src/shared/components/Page";
import { PostModel } from "@src/shared/models/PostModel";
import { ThreadModel } from "@src/shared/models/ThreadModel";
import { UserProfileModel } from "@src/shared/models/UserProfileModel";
import React from "react";
import { useMutation, useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { NewPost } from "./NewPost";
import { Posts } from "./Posts";
import { ThreadHeader } from "./ThreadHeader";
import { loginAlert, threadStyle } from "./styles/style";

export const Thread = () => {
  const { threadId } = useParams<{ threadId: string }>();
  const [connection, setConnection] = React.useState<any>();
  const [posts, setPosts] = React.useState<PostModel[]>([]);
  const currentLoginRole = loginService.getCookie("userRole");

  const { mutate: deletePostMutation } = useMutation(async (id: string) => {
    const data = await postService.deletePost(id);
    return data;
  });

  const handleDeletePost = (id?: string) => {
    if (id) {
      deletePostMutation(id);
    }
  };

  const { data: threadData } = useQuery(
    threadId as string,
    async (): Promise<ThreadModel | undefined> => {
      const data = await threadService.getThread(threadId as string);
      return data;
    }
  );

  const { data: userData, isFetched: userFetched } = useQuery(
    "user",
    async (): Promise<UserProfileModel | undefined> => {
      const handle = loginService.getCookie("userHandle");
      if (handle) {
        const data = await userService.getUser(handle as string);
        return data;
      }
    }
  );

  const { data: isUserMember, isFetched: isMemberFetched } = useQuery(
    ["isUserMember", threadData?.handle],
    async (): Promise<boolean | undefined> => {
      const email = loginService.getCookie("userEmail");
      if (email) {
        const data = await memberService.userInGroup(
          email,
          threadData?.handle as string
        );
        return data;
      }
    }
  );

  const { isFetching: postsLoading, refetch: fetchMore } = useQuery({
    queryKey: "posts",
    queryFn: async (): Promise<PostModel[] | undefined> => {
      const data = await postService.getPostsByThread(
        threadId as string,
        10,
        posts.length
      );
      return data;
    },
    onSuccess: (data) => {
      setPosts((rest) => [...rest, ...data]);
    },
  });

  React.useEffect(() => {
    const joinThread = async () => {
      try {
        const connection = new HubConnectionBuilder()
          .withUrl(`${API_BASE_URL}/realtime`)
          .configureLogging(LogLevel.Information)
          .build();

        connection.on("NewPost", async (postId) => {
          const newPost: PostModel = await postService.getPost(
            postId as string
          );
          setPosts((prev) => [newPost, ...prev]);
        });

        connection.on("DeletePost", async (postId) => {
          setPosts((prev) => prev.filter((post) => post.id !== postId));
        });

        connection.on("UpdatePost", async (postId, text) => {
          setPosts((prev) =>
            prev.map((post) =>
              post.id === postId ? { ...post, text: text } : post
            )
          );
        });

        await connection.start();
        await connection.invoke("JoinRoom", threadId);
      } catch (error) {}
      setConnection(connection);
    };

    joinThread();
  }, []);

  let newPost;
  if (userFetched && userData?.handle) {
    if ((isMemberFetched && isUserMember) || currentLoginRole === Role.admin) {
      newPost = (
        <NewPost handle={userData.handle} threadId={threadId as string} />
      );
    } else {
      newPost = (
        <Alert sx={loginAlert} startDecorator={<InfoRounded />} color="primary">
          <Link to={"/dashboard"}>Join group</Link>to write a new post
        </Alert>
      );
    }
  } else {
    newPost = (
      <Alert sx={loginAlert} startDecorator={<InfoRounded />} color="primary">
        <Link to={"/login"}>Log in</Link>to write a new post
      </Alert>
    );
  }
  return (
    <Page isPadded={false}>
      <Stack spacing={2} direction={"column"} sx={threadStyle}>
        <ThreadHeader
          name={threadData?.name as string}
          description={threadData?.description as string}
        />
        <Posts
          onDeletePost={handleDeletePost}
          onScrollTop={fetchMore}
          loading={postsLoading}
          posts={posts}
        />
        {newPost}
      </Stack>
    </Page>
  );
};
