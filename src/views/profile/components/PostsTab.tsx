/**
 * @file PostsTab.tsx
 * @author { Matěj Macek (xmacek27) }
 * @date 17.12.2023
 * @brief Definition of Component for displaying user's posts
 */
import { Divider, Stack, Typography } from "@mui/joy";
import { postService } from "@src/services/postService";
import { Post } from "@src/shared/components/Post/Post";
import { PostModel } from "@src/shared/models/PostModel";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

interface PostsTabProps {
  userHandle: string;
}

const PostsTab = ({ userHandle }: PostsTabProps) => {
  const { data: threads } = useQuery(`postsTab${userHandle}`, async () => {
    const data = await postService.getPostsGroupedByThread(userHandle, 10, 10);
    return data;
  });

  return (
    <>
      {threads &&
        Object.entries(threads).map((thread) => {
          const threadId = (thread[1] as PostModel[])[0].threadId;
          return (
            <Stack sx={{ marginTop: 5 }}>
              <Typography>
                Posted to{" "}
                <Link to={`/thread/${threadId}`}>{`#${thread[0]}`}</Link>
              </Typography>
              {(thread[1] as PostModel[]).map((post) => {
                return (
                  <Post
                    deletable={false}
                    editable={false}
                    key={post.id}
                    showIcon
                    {...post}
                  />
                );
              })}

              <Divider sx={{ marginTop: 5 }} />
            </Stack>
          );
        })}
    </>
  );
};

export default PostsTab;
