/**
 * @file PostFooter.tsx
 * @author { Dominik Petrik (xpetri25) }
 * @date 17.12.2023
 * @brief Definition of PostFooter component
 */

import { Box, Stack } from "@mui/joy";
import { Rating } from "./Rating";
import { footerStyle } from "./style";

interface PostFooterProps {
  postId: string;
  ratingDisabled?: boolean;
}

export const PostFooter = ({
  postId,
  ratingDisabled = false,
}: PostFooterProps) => {
  return (
    <Box sx={footerStyle}>
      <Stack
        justifyContent={"space-between"}
        direction={"row"}
        alignItems={"center"}
      >
        <Rating disabled={ratingDisabled} postId={postId} />
      </Stack>
    </Box>
  );
};
