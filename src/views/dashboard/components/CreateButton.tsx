import React, { useState, useEffect } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalDialog,
  DialogTitle,
  DialogContent,
  Stack,
  Avatar,
  Box,
  Textarea,
  FormHelperText,
} from "@mui/joy";
import { Add } from "@mui/icons-material";
import { Icon } from "@src/shared/components/Icon/Icon";
import { ClickAwayListener, Popper } from "@mui/material";
import { IconPicker } from "@src/shared/components/IconPicker/IconPicker";
import { memberService } from "@src/services/memberService";
import { groupService } from "@src/services/groupService";

export default function BasicModalDialog() {
  const [open, setOpen] = React.useState<boolean>(false);
  const [icon, setIconName] = useState("doughnut");
  const ref = React.useRef(null);
  const [openIcons, setOpenIcons] = React.useState(false);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [validName, setValidName] = useState<boolean>(true);
  const [validDescription, setValidDescription] = useState<boolean>(true);

  const handleClick = () => {
    setOpenIcons((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpenIcons(false);
  };

  const handleIconSelect = (code: string) => {
    setOpenIcons(false);
    setIconName(code);
  };

  // useEffect(() => {
  //   if (thread !== undefined && thread !== null) {
  //     setDescription(thread.description);
  //     setName(thread.name);
  //   }
  // }, [thread]);

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
  };

  const SubmitClicked = () => {
    groupService.addGroup({
      handle: name,
      name: name,
      description: description,
      icon: icon,
      email: "john.doe@example.com", //todo remove specific email
    });

    // join the group
    memberService.addMember(name, "john.doe@example.com"); //todo remove specific email

    // restore value of name and description
    setName("");
    setDescription("");
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button
        variant="outlined"
        color="neutral"
        startDecorator={<Add />}
        onClick={() => setOpen(true)}
      >
        New Group
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <DialogTitle>Create new Group</DialogTitle>
          <DialogContent>Fill in the information of the group.</DialogContent>
          <form
            onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              setOpen(false);
            }}
          >
            <Stack spacing={2}>
              <Avatar ref={ref} onClick={handleClick}>
                <Icon iconName={icon ? icon : "doughnut"} />
              </Avatar>
              <Popper
                anchorEl={ref.current}
                placement="left-start"
                open={openIcons}
              >
                <ClickAwayListener onClickAway={handleClickAway}>
                  <Box width={"300px"} height={"300px"}>
                    <IconPicker onSelect={handleIconSelect} />
                  </Box>
                </ClickAwayListener>
              </Popper>
              <FormControl error={!validName}>
                <FormLabel>Name</FormLabel>
                <Input
                  autoFocus
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                  onChange={(e) => setDescription(e.target.value)}
                  error={!validDescription}
                />
                {!validDescription && (
                  <FormHelperText>
                    Description cannot contains only whitespaces!
                  </FormHelperText>
                )}
              </FormControl>
              <Button
                type="submit"
                disabled={!validName || !validDescription}
                onClick={SubmitClicked}
              >
                Submit
              </Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
