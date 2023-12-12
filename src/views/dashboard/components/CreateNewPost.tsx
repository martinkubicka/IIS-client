/**
 * @file CreateNewPost.tsx
 * @author { Matěj Macek (xmacek27) }
 * @date 17.12.2023
 * @brief Definition of Component for creating new post
 */

import React, { useState, useEffect } from "react";
import { GroupModel } from "@src/shared/models/GroupModel";
import { ThreadModel } from "@src/shared/models/ThreadModel";
import { threadService } from "@src/services/threadService";
import { loginService } from "@src/services/loginService";
import { PostModel } from "@src/shared/models/PostModel";
import {
  Select,
  Option,
  Box,
  Textarea,
  Stack,
  Button,
  Typography,
  IconButton,
} from "@mui/joy";
import {
  GifBoxOutlined,
  InsertEmoticon,
  SendRounded,
} from "@mui/icons-material";
import { postService } from "@src/services/postService";
import { containerStyle, newPostStyle, newPostTextAreaStyle } from "./NewPost";
import { useSnackbar } from "notistack";
import { ClickAwayListener, Popper } from "@mui/material";
import { IconPicker } from "@src/shared/components/IconPicker/IconPicker";
import { emojisMap } from "@src/assets/emojis";
import GifPicker, { TenorImage } from "gif-picker-react";
import { TENOR_API_KEY } from "@src/apiConfig";
interface CreateNewPostProps {
  userGroups: GroupModel[]; // Array of user groups
  onAddPost: () => void; // Callback function to trigger action in parent component
  isSmallerScreen?: boolean; // Optional boolean to determine if the screen is smaller
}

const CreateNewPost: React.FC<CreateNewPostProps> = ({
  userGroups,
  onAddPost,
  isSmallerScreen = false,
}) => {
  const [threads, setThreads] = useState<ThreadModel[] | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const userHandle = loginService.getCookie("userHandle") || "";
  const [selectedThread, setSelectedThread] = useState<string>("");
  const { enqueueSnackbar } = useSnackbar();
  const marginLeft = isSmallerScreen ? "20px" : "0px";
  const [emojiOpen, setEmojiOpen] = React.useState(false);
  const [gifOpen, setGifOpen] = React.useState(false);
  const emojiRef = React.useRef<HTMLAnchorElement>(null);
  const gifRef = React.useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (selectedGroup) {
      fetchData(selectedGroup);
    }
  }, [selectedGroup]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key == "Enter") {
      event.preventDefault();
      handleSend();
    }
  };

  const handleSend = async (gif?: string) => {
    try {
      if (value != "" || gif != "") {
        let post: PostModel = {
          text: gif ? gif : value,
          handle: userHandle,
          threadId: selectedThread,
        };

        await postService.addPost(post);

        enqueueSnackbar("Add Post successfull.", {
          variant: "success",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "center",
          },
          autoHideDuration: 2000,
          style: {
            fontFamily: "Arial",
          },
        });
        onAddPost();
      }
    } catch (error) {
      enqueueSnackbar(
        "Error occured while posting the post. Please Check you select Group and Thread for new Post.",
        {
          variant: "error",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "center",
          },
          autoHideDuration: 3000,
          style: {
            fontFamily: "Arial",
          },
        }
      );

      console.error("Error adding post:", error);
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

  const fetchData = async (groupHandle: string) => {
    try {
      const groupThreads = await threadService.getGroupThreads(
        groupHandle,
        1,
        30
      );
      setThreads(groupThreads);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  return (
    <div>
      <Stack
        direction={isSmallerScreen ? "column" : "row"}
        spacing={"10px"}
        sx={{ marginTop: "30px" }}
        marginLeft={marginLeft}
      >
        <Typography sx={containerStyle}> Group: </Typography>
        <Select
          color="primary"
          placeholder="Choose Group..."
          size="md"
          variant="plain"
        >
          {userGroups.map((group) => (
            <Option
              key={group.handle}
              value={group.handle}
              onClick={() => setSelectedGroup(group.handle)}
            >
              {group.name}
            </Option>
          ))}
        </Select>
        {threads && (
          <Stack direction={"row"} spacing={"10px"}>
            <Typography sx={containerStyle}> Thread: </Typography>
            <Select
              color="primary"
              placeholder="Choose Thread..."
              size="md"
              variant="plain"
            >
              {threads.map((thread) => (
                <Option
                  key={thread.id}
                  value={thread.id}
                  onClick={() => setSelectedThread(thread.id as string)}
                >
                  {thread.name}
                </Option>
              ))}
            </Select>
          </Stack>
        )}
      </Stack>

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
          alignItems={"end"}
        >
          <IconButton onClick={handleGifPickerClick} ref={gifRef}>
            <GifBoxOutlined />
          </IconButton>
          <Popper anchorEl={gifRef.current} open={gifOpen}>
            <ClickAwayListener onClickAway={handleGifClickAway}>
              <GifPicker
                tenorApiKey={TENOR_API_KEY}
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
            onClick={() => handleSend()}
            variant="plain"
            startDecorator={<SendRounded />}
          >
            Send
          </Button>
        </Stack>
      </Stack>
    </div>
  );
};

export default CreateNewPost;
