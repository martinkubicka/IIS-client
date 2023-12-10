import {
  GifBox,
  GifBoxOutlined,
  InsertEmoticon,
  SendRounded,
} from "@mui/icons-material";
import { Box, Button, IconButton, Stack, Textarea } from "@mui/joy";
import { postService } from "@src/services/postService";
import React from "react";
import { useMutation } from "react-query";
import { newPostStyle, newPostTextAreaStyle } from "./styles/style";
import { Popper, ClickAwayListener } from "@mui/base";
import { IconPicker } from "@src/shared/components/IconPicker/IconPicker";
import { emojisMap } from "@src/assets/emojis";
import GifPicker, { TenorImage } from "gif-picker-react";

interface NewPostProps {
  handle: string;
  threadId: string;
}

export const NewPost = ({ handle, threadId }: NewPostProps) => {
  const [value, setValue] = React.useState("");
  const [emojiOpen, setEmojiOpen] = React.useState(false);
  const [gifOpen, setGifOpen] = React.useState(false);
  const { mutate } = useMutation(async (value: string) => {
    await postService.addPost({ handle, threadId, text: value });
  });

  const emojiRef = React.useRef<HTMLAnchorElement>(null);
  const gifRef = React.useRef<HTMLAnchorElement>(null);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key == "Enter") {
      event.preventDefault();
      handleSend(value);
    }
  };

  const handleSend = (valueToSend: string) => {
    if (valueToSend != "") {
      mutate(valueToSend);
    }
    setValue("");
  };

  const handleChange = (event: React.FormEvent<HTMLTextAreaElement>) => {
    setValue(event.currentTarget.value);
  };

  const handleEmojiClickAway = () => {
    setEmojiOpen(false);
  };

  const handleEmojiPickerClick = () => {
    setEmojiOpen((prev) => !prev);
  };

  const handleEmojiSelect = (emoji: string) => {
    setValue((prev) => prev.concat(emojisMap.get(emoji) as string));
  };

  const handleGifClickAway = () => {
    setGifOpen(false);
  };

  const handleGifPickerClick = () => {
    setGifOpen((prev) => !prev);
  };

  const handleGifSelect = (gif: TenorImage) => {
    handleSend(`<${gif.url}>`);
    setGifOpen(false);
  };

  return (
    <Stack sx={newPostStyle}>
      <Textarea
        placeholder="Write something..."
        sx={newPostTextAreaStyle}
        variant="soft"
        onChange={handleChange}
        value={value}
        onKeyDown={handleKeyDown}
      ></Textarea>
      <Stack
        height={"100%"}
        justifyContent={"flex-end"}
        direction={"row"}
        alignItems={"center"}
      >
        <IconButton onClick={handleGifPickerClick} ref={gifRef}>
          <GifBoxOutlined />
        </IconButton>
        <Popper anchorEl={gifRef.current} open={gifOpen}>
          <ClickAwayListener onClickAway={handleGifClickAway}>
            <GifPicker
              tenorApiKey={"AIzaSyCoA1c1rVZb3qHX3HORc9DpCV0NGvXtaIM"}
              onGifClick={handleGifSelect}
            />
          </ClickAwayListener>
        </Popper>
        <IconButton onClick={handleEmojiPickerClick} ref={emojiRef}>
          <InsertEmoticon />
        </IconButton>
        <Popper anchorEl={emojiRef.current} open={emojiOpen}>
          <ClickAwayListener onClickAway={handleEmojiClickAway}>
            <Box width={"300px"} height={"300px"}>
              <IconPicker onSelect={handleEmojiSelect} />
            </Box>
          </ClickAwayListener>
        </Popper>
        <Button
          onClick={() => handleSend(value)}
          variant="plain"
          startDecorator={<SendRounded />}
        >
          Send
        </Button>
      </Stack>
    </Stack>
  );
};
