import { Box, Button, CircularProgress, IconButton, Stack } from "@mui/joy";
import React from "react";
import { fabStyle, postsContainerStyle, postsStyle } from "./styles/style";
import { PostModel } from "@src/shared/models/PostModel";
import { Post } from "@src/shared/components/Post/Post";
import { KeyboardDoubleArrowDown } from "@mui/icons-material";
import { LoadingOverlay } from "@src/shared/components/LoadingOverlay/LoadingOverlay";

interface PostsProps {
  posts?: PostModel[];
  loading?: boolean;
  onScrollTop?: () => {};
  firstFetch?: boolean;
  onUpdatePost?: (id?: string) => void;
  onDeletePost?: (id?: string) => void;
}

export const Posts = ({
  posts,
  loading,
  onScrollTop,
  onDeletePost = () => {},
  onUpdatePost = () => {},
}: PostsProps) => {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [scrollFlag, setScrollFlag] = React.useState(false);
  const [postsLength, setPostsLength] = React.useState(0);

  React.useEffect(() => {
    const element = ref.current;
    if (element && posts && posts.length > 0 && !scrollFlag) {
      element.scrollTop = element.scrollHeight;
      setScrollFlag(true);
    }
    if (
      posts &&
      posts.length - postsLength === 1 &&
      element &&
      element.scrollHeight - (element.scrollTop + element.clientHeight) <
        element.clientHeight + 300
    ) {
      element.scrollTop = element.scrollHeight;
    }

    setPostsLength(posts ? posts.length : 0);
  }, [posts]);

  React.useEffect(() => {
    if (ref.current) {
      const element = ref.current;
      ref.current.onscroll = () => {
        if (element.scrollTop < 500) {
          if (onScrollTop) {
            onScrollTop();
          }
        }
      };
    }
  }, []);

  return (
    <Box ref={ref} sx={postsContainerStyle}>
      <Stack direction={"column-reverse"} sx={postsStyle}>
        {loading && <LoadingOverlay />}
        {posts?.map((post, index) => (
          <Post
            onDelete={onDeletePost}
            lastPost={index == 0}
            key={post.id}
            {...post}
          />
        ))}
      </Stack>
    </Box>
  );
};
