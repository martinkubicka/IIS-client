import { Box, Container, Divider, Stack } from "@mui/joy";
import React from "react";
import { threadStyle } from "./styles/style";
import { Post } from "@src/shared/components/Post/Post";
import { NewPost } from "./NewPost";
import { PostModel } from "@src/shared/models/PostModel";
import { postService } from "@src/services/postService";
import { ThreadHeader } from "./ThreadHeader";
import { Posts } from "./Posts";
import { Page } from "@src/shared/components/Page";
import { useParams } from "react-router-dom";
import { threadService } from "@src/services/threadService";
import { ThreadModel } from "@src/shared/models/ThreadModel";

export const Thread = () => {
  const { threadId } = useParams<{ threadId: string }>();
  const [thread, setThread] = React.useState<ThreadModel | undefined>(
    undefined
  );
  const [posts, setPosts] = React.useState<PostModel[]>([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await postService.getPostsByThread(threadId as string);
        setPosts(data);
      } catch (error) {
        console.log(error);
      }

      try {
        const data = await threadService.getThread(threadId as string);
        setThread(data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <Page>
      <Stack spacing={2} direction={"column"} sx={threadStyle}>
        <ThreadHeader
          name={thread?.name as string}
          description={thread?.description as string}
        />
        <Posts loading={loading} posts={posts} />
        <NewPost />
      </Stack>
    </Page>
  );
};
