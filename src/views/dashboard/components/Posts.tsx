/**
 * @file Posts.tsx
 * @author { Matěj Macek (xmacek27) }
 * @date 17.12.2023
 * @brief Definition of Component for displaying posts and creating new posts
 */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Assuming you're using React Router
import { Divider, Stack, Typography } from "@mui/joy";
import { ThreadModel } from "@src/shared/models/ThreadModel";
import { postService } from "@src/services/postService";
import { Post } from "@src/shared/components/Post/Post";
import { PostModel } from "@src/shared/models/PostModel";
import CreateNewPost from "@src/views/dashboard/components/CreateNewPost";
import { GroupModel } from "@src/shared/models/GroupModel";
interface Props {
  threads: ThreadModel[];
  userGroups: GroupModel[];
}

const Posts: React.FC<Props> = ({ threads, userGroups }) => {
  const [allPosts, setAllPosts] = useState<PostModel[]>([]);

  useEffect(() => {
    fetchData();
  }, [threads]);

  const fetchData = async () => {
    try {
      const postsPromises = threads.map(async (thread) => {
        if (thread.id) {
          const posts = await postService.getPostsByThread(thread.id, 30, 0);
          return posts;
        }
        return [];
      });

      const resolvedPosts = await Promise.all(postsPromises);
      const mergedPosts = resolvedPosts.flat().sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });

      setAllPosts(mergedPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const onAddPost = () => {
    fetchData();
  };

  return (
    <>
      <Typography level="h1" fontSize="x2" marginBottom="10px" marginTop="50px">
        Posts
      </Typography>
      <CreateNewPost userGroups={userGroups ?? []} onAddPost={onAddPost} />
      {allPosts.map((post) => (
        <div key={post.id}>
          <Typography>
            Posted to{" "}
            <Link to={`/thread/${post.threadId}`}>
              {threads.find((thread) => thread.id === post.threadId)?.name ||
                `#${post.threadId}`}
            </Link>
          </Typography>
          <Post deletable={false} editable={false} showIcon {...post} />
          <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
        </div>
      ))}
    </>
  );
};

export default Posts;
