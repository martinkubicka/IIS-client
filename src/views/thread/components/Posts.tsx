import { Box, CircularProgress, Stack } from "@mui/joy";
import React from "react";
import { postsStyle } from "./styles/style";
import { PostModel } from "@src/shared/models/PostModel";
import { Post } from "@src/shared/components/Post/Post";

interface PostsProps {
  posts: PostModel[];
  loading?: boolean;
}

export const Posts = ({ posts, loading }: PostsProps) => {
  return (
    <Stack alignContent={"space-evenly"} direction={"column"} sx={postsStyle}>
      {loading ? (
        <CircularProgress />
      ) : (
        posts.map((post, index) => (
          <Post lastPost={index == posts.length - 1} key={post.id} {...post} />
        ))
      )}
    </Stack>
  );
};
