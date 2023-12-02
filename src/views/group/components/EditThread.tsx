/**
 * @file EditThread.tsx
 * @author { Martin Kubicka (xkubic45) }
 * @date 17.12.2023
 * @brief Definition of edit thread dialog component
 */

import {
  Box,
  Button,
  DialogTitle,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Modal,
  ModalDialog,
  Stack,
  Textarea,
} from "@mui/joy";
import { useEffect, useState } from "react";

export default function AddThread({
  open,
  onClose,
  onSubmit,
  header,
  createUpdateText,
  thread,
}) {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [validName, setValidName] = useState<boolean>(true);
  const [validDescription, setValidDescription] = useState<boolean>(true);
  const [activeUpdateButton, setActiveUpdateButton] = useState<boolean>(true);

  useEffect(() => {
    if (thread !== undefined && thread !== null) {
      setDescription(thread.description);
      setName(thread.name);
    }
  }, [thread]);

  useEffect(() => {
    handleFieldChange();
  }, [name, description]);

  const handleFieldChange = () => {
    if (name?.trim() === "") {
      setValidName(false);
    } else {
      setValidName(true);
    }

    if (description !== "" && description?.trim() === "") {
      setValidDescription(false);
    } else {
      setValidDescription(true);
    }

    if (thread !== undefined && thread !== null) {
      if (name !== thread.name || description !== thread.description) {
        setActiveUpdateButton(true);
      } else {
        setActiveUpdateButton(false);
      }
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog size="lg">
        <DialogTitle>{header}</DialogTitle>
        <Divider />
        <form
          onSubmit={(event) => {
            event.preventDefault();
            onSubmit({ name, description });
          }}
        >
          <Stack spacing={2}>
            <FormControl error={!validName}>
              <FormLabel>Name</FormLabel>
              <Input
                autoFocus
                required
                value={name}
                onChange={(e) => {
                  e.target.value = e.target.value.slice(0, 50);
                  setName(e.target.value);
                }}
                error={!validName}
                sx={{ minWidth: "320px" }}
              />
              {!validName && (
                <FormHelperText>Name field cannot be empty!</FormHelperText>
              )}
            </FormControl>

            <FormControl error={!validDescription}>
              <FormLabel>Description</FormLabel>
              <Textarea
                minRows={1}
                value={description}
                onChange={(e) => {
                  e.target.value = e.target.value.slice(0, 100);
                  setDescription(e.target.value);
                }}
                error={!validDescription}
              />
              {!validDescription && (
                <FormHelperText>
                  Description cannot contains only whitespaces!
                </FormHelperText>
              )}
            </FormControl>
            <Box sx={{ display: "flex", justifyContent: "center", gap: 3 }}>
              <Button size="lg" color="neutral" onClick={onClose}>
                Cancel
              </Button>
              <Button
                size="lg"
                type="submit"
                disabled={!validName || !validDescription || !activeUpdateButton}
              >
                {createUpdateText}
              </Button>
            </Box>
          </Stack>
        </form>
      </ModalDialog>
    </Modal>
  );
}
