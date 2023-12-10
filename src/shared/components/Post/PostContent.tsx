import { Box, Button, Stack, Textarea, Typography } from "@mui/joy";
import React, { useEffect, useRef } from "react";

interface PostContentProps {
  editing?: boolean;
  text: string;
  onPostUpdate?: (newValue: string) => void;
  onEditCancel?: () => void;
  onImageLoad?: () => void;
  updateLoading?: boolean;
}

export const PostContent = ({
  editing = false,
  onPostUpdate = () => {},
  onEditCancel = () => {},
  onImageLoad = () => {},
  text,
  updateLoading = false,
}: PostContentProps) => {
  const [textValue, setTextValue] = React.useState(text);
  const [editValue, setEditValue] = React.useState(textValue);
  const [isPreprocessed, setIsPreprocessed] = React.useState(false);
  const [type, setType] = React.useState("text");

  const ref = useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    setTextValue(text);
  }, [text]);

  React.useEffect(() => {
    preProccessText();
  }, [textValue]);

  const handleCancelEditing = () => {
    setEditValue(text);
    onEditCancel();
  };

  const handleUpdate = () => {
    const value = editValue.trim();
    if (value != "") {
      onPostUpdate(value);
    }
  };

  const handleChange = (event: React.FormEvent<HTMLTextAreaElement>) => {
    setEditValue(event.currentTarget.value);
  };

  const handleKeyDownWhenEditing = (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (event.key == "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleUpdate();
    }
  };

  const preProccessText = () => {
    const regex = /^<https:\/\/media.tenor.com\/.+\/.+.gif>$/g;
    const matches = textValue.match(regex);
    if (matches) {
      matches.forEach((match) => {
        setType("gif");
      });
    }
    setIsPreprocessed(true);
  };

  useEffect(() => {
    if (editing && ref.current) {
      ref.current.focus();
    }
  }, [editing]);
  let display;
  if (type == "text") {
    display = (
      <Typography sx={{ whiteSpace: "pre-line" }} level={"body-md"}>
        {textValue}
      </Typography>
    );
  } else {
    display = (
      <img
        height={200}
        width={200}
        style={{ borderRadius: "10px" }}
        src={textValue.substring(1, textValue.length - 1)}
        onLoad={onImageLoad}
      />
    );
  }

  return (
    <Box>
      {editing ? (
        <>
          <Textarea
            autoFocus
            ref={ref}
            onChange={handleChange}
            value={editValue}
            onKeyDown={handleKeyDownWhenEditing}
          />

          <Stack direction={"row"} width={"100%"} justifyContent={"flex-end"}>
            <Button
              onClick={handleCancelEditing}
              color="neutral"
              variant="plain"
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpdate}
              disabled={editValue === ""}
              variant="plain"
              loading={updateLoading}
            >
              Send
            </Button>
          </Stack>
        </>
      ) : (
        isPreprocessed && display
      )}
    </Box>
  );
};
