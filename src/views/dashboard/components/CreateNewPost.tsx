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
} from "@mui/joy";
import { SendRounded } from "@mui/icons-material";
import { postService } from "@src/services/postService";
import { containerStyle, newPostStyle, newPostTextAreaStyle } from "./NewPost";

interface CreateNewPostProps {
  userGroups: GroupModel[]; // Array of user groups
  onAddPost: () => void; // Callback function to trigger action in parent component
}

const CreateNewPost: React.FC<CreateNewPostProps> = ({
  userGroups,
  onAddPost,
}) => {
  const [threads, setThreads] = useState<ThreadModel[] | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<string>("");
  const [value, setValue] = React.useState("");
  const userHandle = loginService.getCookie("userHandle") || "";
  const [selectedThread, setSelectedThread] = useState<string>("");

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

  const handleSend = async () => {
    if (value != "") {
      let post: PostModel = {
        text: value,
        userHandle,
        threadId: selectedThread,
      };

      await postService.addPost(post);

      onAddPost();
    }
    setValue("");
  };

  const handleChange = (event: React.FormEvent<HTMLTextAreaElement>) => {
    setValue(event.currentTarget.value);
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
    console.log(threads);
  };

  return (
    <div>
      <Stack direction={"row"} spacing={"10px"} sx={{ marginTop: "30px" }}>
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
    </div>
  );
};

export default CreateNewPost;
