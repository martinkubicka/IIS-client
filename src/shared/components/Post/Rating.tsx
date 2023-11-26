import {
  KeyboardArrowDownRounded,
  KeyboardArrowUpRounded,
} from "@mui/icons-material";
import {
  CircularProgress,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/joy";
import { loginService } from "@src/services/loginService";
import { postService } from "@src/services/postService";
import { RatingModel } from "@src/shared/models/RatingModel";
import React from "react";
import { useQuery, useMutation } from "react-query";
import { Link } from "react-router-dom";

interface RatingProps {
  postId: string;
  disabled?: boolean;
}

export const Rating = ({ postId, disabled = false }: RatingProps) => {
  const [upvoted, setUpvoted] = React.useState(false);
  const [downvoted, setDownvoted] = React.useState(false);
  const handle = loginService.getCookie("userHandle");
  const userEmail = loginService.getCookie("userEmail");

  useQuery(
    `Rating${postId}`,
    async (): Promise<number> => {
      const data = await postService.getRatingByPostAndUser(
        postId as string,
        userEmail as string
      );
      return data;
    },
    {
      onSuccess: (data: number) => {
        if (data == 1) {
          setUpvoted(true);
        } else if (data == -1) {
          setDownvoted(true);
        }
      },
    }
  );

  const {
    data: rating,
    isLoading,
    refetch: recalculateRating,
  } = useQuery(`CalculateRating${postId}`, async (): Promise<number> => {
    const data = await postService.calculateRating(postId as string);
    return data;
  });

  const { mutate: changeRating } = useMutation(
    async (ratingChange: number) => {
      const data = await postService.updateRating(
        postId,
        userEmail as string,
        ratingChange
      );
      return data;
    },
    { onSuccess: recalculateRating }
  );

  const handleUpvote = () => {
    if (userEmail) {
      changeRating(upvoted ? 0 : 1);
    }
    setDownvoted(false);
    setUpvoted((prev) => !prev);
  };

  const handleDownvote = () => {
    if (userEmail) {
      changeRating(downvoted ? 0 : -1);
    }
    setUpvoted(false);
    setDownvoted((prev) => !prev);
  };

  return (
    <Tooltip
      title={
        !disabled ? (
          ""
        ) : handle == undefined ? (
          <>
            <Link to={"/login"}>Log in</Link> to rate this post
          </>
        ) : (
          <>Join the group to rate this post</>
        )
      }
    >
      <Stack
        justifyContent={"space-between"}
        alignItems={"center"}
        minWidth={"100px"}
        width={"min-content"}
        direction={"row"}
      >
        <IconButton
          color={"primary"}
          disabled={disabled}
          onClick={handleUpvote}
          variant={upvoted ? "solid" : "plain"}
        >
          {<KeyboardArrowUpRounded />}
        </IconButton>

        {isLoading ? (
          <CircularProgress size={"sm"} />
        ) : (
          <Typography>{rating}</Typography>
        )}
        <IconButton
          color={"primary"}
          onClick={handleDownvote}
          disabled={disabled}
          variant={downvoted ? "solid" : "plain"}
        >
          {<KeyboardArrowDownRounded />}
        </IconButton>
      </Stack>
    </Tooltip>
  );
};
