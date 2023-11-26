import { SendRounded } from "@mui/icons-material";
import { Box, Button, Stack, Textarea } from "@mui/joy";
import { postService } from "@src/services/postService";
import React from "react";
import { useMutation } from "react-query";
import { newPostStyle, newPostTextAreaStyle } from "./styles/style";

interface NewPostProps {
  handle: string;
  threadId: string;
}

export const NewPost = ({ handle, threadId }: NewPostProps) => {
  const [value, setValue] = React.useState("");
  const { mutate } = useMutation(async (value: string) => {
    await postService.addPost({ handle, threadId, text: value });
  });

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key == "Enter") {
      event.preventDefault();
      handleSend();
    }
  };

  const handleSend = () => {
    if (value != "") {
      mutate(value);
    }
    setValue("");
  };

  const handleChange = (event: React.FormEvent<HTMLTextAreaElement>) => {
    setValue(event.currentTarget.value);
  };
  return (
    <Box sx={newPostStyle}>
      <Textarea
        placeholder="Write something..."
        sx={newPostTextAreaStyle}
        variant="soft"
        onChange={handleChange}
        value={value}
        onKeyDown={handleKeyDown}
        endDecorator={
          <Stack width={"100%"} height={"30px"} justifyContent={"flex-end"}>
            <Button
              onClick={handleSend}
              variant="plain"
              startDecorator={<SendRounded />}
              sx={{ ml: "auto" }}
            >
              Send
            </Button>
          </Stack>
        }
      ></Textarea>
    </Box>
  );
};
