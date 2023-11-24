import React, { useState, useEffect } from "react";
import {
  Card,
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
import { Icon } from "@src/shared/components/Icon/Icon";
import { ClickAwayListener, Popper } from "@mui/material";
import { IconPicker } from "@src/shared/components/IconPicker/IconPicker";
import { groupService } from "@src/services/groupService";
import { loginService } from "@src/services/loginService";
import { useSnackbar } from "notistack";
import { memberService } from "@src/services/memberService";
import { userService } from "@src/services/userService";
import { MemberModel } from "@src/shared/models/MemberModel";
import { GroupModel } from "@src/shared/models/GroupModel";
import GroupMemberCompositeModel from "@src/shared/models/GroupMemberCompositeModel";
import { UserProfileModel } from "@src/shared/models/UserProfileModel";

interface CardProps {
  onGroupCreated: () => void;
}

const NewGroup: React.FC<CardProps> = ({ onGroupCreated }) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [icon, setIconName] = useState("doughnut");
  const ref = React.useRef(null);
  const [openIcons, setOpenIcons] = React.useState(false);
  const [name, setName] = useState<string>("");
  const [handle, setHandle] = useState<string>("");
  const [validHandle, setValidHandle] = useState<boolean>(true);
  const [description, setDescription] = useState<string>("");
  const [validName, setValidName] = useState<boolean>(true);
  const [validDescription, setValidDescription] = useState<boolean>(true);
  const userEmail = loginService.getCookie("userEmail") ?? "";
  const { enqueueSnackbar } = useSnackbar();
  const userHandle = loginService.getCookie("userHandle") ?? "";

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

  useEffect(() => {
    handleFieldChange();
  }, [name, description, handle]);

  const handleFieldChange = async () => {
    if (name?.trim() === "") {
      setValidName(false);
    } else {
      setValidName(true);
    }

    if (handle?.trim() === "") {
      setValidHandle(false);
    } else {
      // Check if the handle is already taken
      try {
        await groupService.getGroup(handle);
        setValidHandle(false);
      } catch (error) {
        setValidHandle(true);
      }
    }

    if (description !== "" && description?.trim() === "") {
      setValidDescription(false);
    } else {
      setValidDescription(true);
    }
  };
  [name, description, handle];

  const SubmitClicked = async () => {
    try {
      enqueueSnackbar("Creating New Group..", {
        variant: "info",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "center",
        },
        autoHideDuration: 2000,
        style: {
          fontFamily: "Arial",
        },
      });

      const groupData: GroupModel = {
        handle: handle,
        name: name,
        description: description,
        icon: icon,
        email: userEmail,
      };

      var userData: UserProfileModel = await userService.getUser(userHandle);

      const memberData: MemberModel = {
        handle: handle, // or get the handle from wherever it's needed
        email: userEmail, // assuming userEmail is available in scope
        role: 0, // set the appropriate role
        icon: userData.icon,
        name: userData.name,
      };

      const compositeModel: GroupMemberCompositeModel = {
        group: groupData,
        member: memberData,
      };

      await groupService.addGroup(compositeModel);

      // restore value of name and description
      setName("");
      setDescription("");
      setHandle("");
      setOpen(false);

      // Trigger a callback function to indicate that a new group has been created
      if (onGroupCreated) {
        onGroupCreated();
      }

      enqueueSnackbar("Group created successfully.", {
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
    } catch (error) {
      enqueueSnackbar("Error occured while creating new group.", {
        variant: "error",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "center",
        },
        autoHideDuration: 2000,
        style: {
          fontFamily: "Arial",
        },
      });
    }
  };

  return (
    <Card
      sx={{
        width: 300,
        height: 200,
        alignItems: "center",
        boxShadow: "0px 0px 8px 5px rgba(0,0,0,0.1)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Button
          variant="solid"
          color="primary"
          onClick={() => setOpen(true)}
          sx={{
            minWidth: 120,
            "&:hover": {
              backgroundColor: "primary", // Change the background color on hover
              color: "white", // Change the text color on hover
            },
          }}
        >
          + Create Group
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
                  placement="right-start"
                  open={openIcons}
                  style={{ zIndex: 1500 }}
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
                <FormControl error={!validHandle}>
                  <FormLabel>Handle</FormLabel>
                  <Input
                    autoFocus
                    required
                    value={handle}
                    onChange={(e) => setHandle(e.target.value)}
                    error={!validHandle}
                    sx={{ minWidth: "320px" }}
                  />
                  {!validHandle && (
                    <FormHelperText>
                      Handle field cannot be empty! Or the handle is already
                      taken.
                    </FormHelperText>
                  )}
                </FormControl>
                <FormControl error={!validDescription}>
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    error={!validDescription}
                    minRows={1}
                    value={description}
                    onChange={(e) => {
                      e.target.value = e.target.value.slice(0, 100);
                      setDescription(e.target.value);
                    }}
                  />
                  {!validDescription && (
                    <FormHelperText>
                      Description cannot contains only whitespaces!
                    </FormHelperText>
                  )}
                </FormControl>
                <Button
                  type="submit"
                  disabled={!validName || !validDescription || !validHandle}
                  onClick={SubmitClicked}
                >
                  Submit
                </Button>
                <Button
                  variant="plain"
                  color="neutral"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
              </Stack>
            </form>
          </ModalDialog>
        </Modal>
      </Box>
    </Card>
  );
};

export default NewGroup;
