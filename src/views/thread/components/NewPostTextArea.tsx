import { Box, Stack, Textarea, Button } from "@mui/joy";
import React from "react";
import { newPostTextAreaStyle } from "./styles/style";
import { SendRounded } from "@mui/icons-material";

export const NewPostTextArea = () => {
  return (
    <Textarea
      placeholder="Write something..."
      sx={newPostTextAreaStyle}
      endDecorator={
        <Stack width={"100%"} height={"30px"} justifyContent={"flex-end"}>
          <Button startDecorator={<SendRounded />} sx={{ ml: "auto" }}>
            Send
          </Button>
        </Stack>
      }
    ></Textarea>
  );
};
