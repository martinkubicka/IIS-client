import { Alert, Stack } from "@mui/joy";
import React from "react";
import { threadStyle } from "./styles/style";
import { NewPost } from "./NewPost";
import { PostModel } from "@src/shared/models/PostModel";
import { postService } from "@src/services/postService";
import { ThreadHeader } from "./ThreadHeader";
import { Posts } from "./Posts";
import { Page } from "@src/shared/components/Page";
import { Link, useParams } from "react-router-dom";
import { threadService } from "@src/services/threadService";
import { ThreadModel } from "@src/shared/models/ThreadModel";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import API_BASE_URL from "@src/apiConfig";
import { UserProfileModel } from "@src/shared/models/UserProfileModel";
import { loginService } from "@src/services/loginService";
import { userService } from "@src/services/userService";
import { InfoRounded } from "@mui/icons-material";
import { useMutation, useQuery } from "react-query";

export const Thread = () => {
  const { threadId } = useParams<{ threadId: string }>();
  const [connection, setConnection] = React.useState<any>();
  const [posts, setPosts] = React.useState<PostModel[]>([]);

  const { mutate: deletePostMutation } = useMutation(async (id: string) => {
    const data = await postService.deletePost(id);
    return data;
  });

  const handleDeletePost = (id?: string) => {
    if (id) {
      deletePostMutation(id, { onError: (error) => console.log(error) });
    }
  };

  const { data: threadData } = useQuery(
    "thread",
    async (): Promise<ThreadModel | undefined> => {
      const data = await threadService.getThread(threadId as string);
      return data;
    }
  );

  const { data: userData } = useQuery(
    "user",
    async (): Promise<UserProfileModel | undefined> => {
      const handle = loginService.getCookie("userHandle");
      if (handle) {
        const data = await userService.getUser(handle as string);
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
          const newPost = await postService.getPost(postId as string);
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
      } catch (error) {
        console.log(error);
      }
      setConnection(connection);
    };

    joinThread();
  }, []);

  return (
    <Page>
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
        {userData ? (
          <NewPost handle={userData.handle} threadId={threadId as string} />
        ) : (
          <Alert startDecorator={<InfoRounded></InfoRounded>} color="primary">
            <Link to={"/login"}>Log in</Link>to write a new post
          </Alert>
        )}
      </Stack>
    </Page>
  );
};
