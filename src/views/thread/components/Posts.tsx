import { Box, Stack } from "@mui/joy";
import { LoadingOverlay } from "@src/shared/components/LoadingOverlay/LoadingOverlay";
import { Post } from "@src/shared/components/Post/Post";
import { PostModel } from "@src/shared/models/PostModel";
import React from "react";
import { postsContainerStyle, postsStyle } from "./styles/style";

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

  const handleLastImageLoad = (id: string) => {
    const element = ref.current;
    if (element && posts && id == posts[0].id) {
      element.scrollTop = element.scrollHeight;
    }
  };

  return (
    <Box ref={ref} sx={postsContainerStyle}>
      <Stack direction={"column-reverse"} sx={postsStyle}>
        {posts?.map((post, index) => (
          <Post
            onDelete={onDeletePost}
            lastPost={index == 0}
            key={post.id}
            onImageLoad={handleLastImageLoad}
            {...post}
          />
        ))}
      </Stack>
    </Box>
  );
};
