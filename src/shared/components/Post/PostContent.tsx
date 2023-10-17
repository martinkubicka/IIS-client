import { ClickAwayListener } from "@mui/base";
import { Box, Button, Textarea, Stack, Typography } from "@mui/joy";
import React, { useEffect, useRef } from "react";

interface PostContentProps {
  editing?: boolean;
  text: string;
  onPostUpdate?: (newValue: string) => void;
  onEditCancel?: () => void;
  updateLoading?: boolean;
}

export const PostContent = ({
  editing = false,
  onPostUpdate = () => {},
  onEditCancel = () => {},
  text,
  updateLoading = false,
}: PostContentProps) => {
  const [editValue, setEditValue] = React.useState(text);

  const ref = useRef<HTMLDivElement | null>(null);

  const handleCancelEditing = () => {
    setEditValue(text);
    onEditCancel();
  };

  const handleUpdate = () => {
    if (editValue != "") {
      onPostUpdate(editValue);
    }
  };

  const handleChange = (event: React.FormEvent<HTMLTextAreaElement>) => {
    setEditValue(event.currentTarget.value);
  };

  useEffect(() => {
    if (editing && ref.current) {
      ref.current.focus();
      console.log("focused");
    }
  }, [editing]);

  return (
    <Box>
      {editing ? (
        <>
          <Textarea ref={ref} onChange={handleChange} value={editValue} />

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
        <Typography sx={{ whiteSpace: "pre-line" }} level={"body-md"}>
          {text}
        </Typography>
      )}
    </Box>
  );
};
