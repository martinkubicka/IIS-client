/**
 * @file GroupSettings.tsx
 * @author { Martin Kubicka (xkubic45) }
 * @date 17.12.2023
 * @brief Deifinition of group settings component
 */

import {
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormHelperText,
  Input,
  Textarea,
} from "@mui/joy";
import { ClickAwayListener, Popper } from "@mui/material";
import { groupService } from "@src/services/groupService";
import { Icon } from "@src/shared/components/Icon/Icon";
import { IconPicker } from "@src/shared/components/IconPicker/IconPicker";
import { GroupModel } from "@src/shared/models/GroupModel";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Dialog from "../../../shared/components/Dialog/Dialog";

interface GroupSettingsProps {
  groupData?: GroupModel;
  onSettingsSaved: () => void;
}

export const GroupSettings: React.FC<GroupSettingsProps> = ({
  groupData,
  onSettingsSaved,
}) => {
  const [name, setName] = useState(groupData?.name);
  const [description, setDescription] = useState(groupData?.description);
  const [icon, setIconName] = useState(groupData?.icon);
  const [privacyMember, setPrivacyMember] = useState(
    groupData?.visibilityMember
  );
  const [privacyGuest, setPrivacyGuest] = useState(groupData?.visibilityGuest);
  const [valuesChanged, setValuesChanged] = useState<boolean>(true);
  const [validName, setValidName] = useState<boolean>(true);
  const [validDescription, setValidDescription] = useState<boolean>(true);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);

  const handleIconSelect = (code: string) => {
    setOpen(false);
    setIconName(code);
  };

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  useEffect(() => {
    handleFieldChange();
  }, [name, description, icon, privacyGuest, privacyMember]);

  const saveSettings = async () => {
    if (groupData) {
      groupData.name = name;
      groupData.description = description;
      groupData.icon = icon;
      groupData.visibilityGuest = privacyGuest;
      groupData.visibilityMember = privacyMember;
    }

    try {
      enqueueSnackbar("Loading..", {
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

      await groupService.updateGroup(groupData);
      await groupService.updateGroupPolicy(groupData);
      await onSettingsSaved();

      enqueueSnackbar("Group settings updated successfully.", {
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

      setValuesChanged(true);
    } catch (error) {
      enqueueSnackbar("Error occured while updating the group.", {
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

  const deleteGroup = async () => {
    try {
      await groupService.deleteGroup(groupData?.handle);

      localStorage.setItem(
        "snackbarData",
        JSON.stringify({
          message: "Group deleted successfully.",
          variant: "success",
          duration: 2000,
          fontFamily: "Arial",
        })
      );

      navigate("/");
    } catch (error) {
      enqueueSnackbar("Error occured while deleting the group.", {
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

    if (
      groupData &&
      validName &&
      validDescription &&
      (groupData.name !== name ||
        groupData.description !== description ||
        groupData.icon !== icon ||
        groupData.visibilityGuest !== privacyGuest ||
        groupData.visibilityMember !== privacyMember)
    ) {
      setValuesChanged(false);
    } else {
      setValuesChanged(true);
    }
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleConfirm = () => {
    deleteGroup();
    handleCloseModal();
  };

  return (
    <React.Fragment>
      <h3>Icon</h3>
      <Avatar ref={ref} onClick={handleClick}>
        <Icon iconName={icon ? icon : "doughnut"} />
      </Avatar>
      <Popper anchorEl={ref.current} placement="left-start" open={open}>
        <ClickAwayListener onClickAway={handleClickAway}>
          <Box width={"300px"} height={"300px"}>
            <IconPicker onSelect={handleIconSelect} />
          </Box>
        </ClickAwayListener>
      </Popper>

      <h3>Name</h3>
      <FormControl error={!validName}>
        <Input
          error={!validName}
          value={name}
          onChange={(e) => {
            e.target.value = e.target.value.slice(0, 20);
            setName(e.target.value);
          }}
        />
        {!validName && (
          <FormHelperText>Name field cannot be empty!</FormHelperText>
        )}
      </FormControl>

      <h3>Description</h3>
      <FormControl error={!validDescription}>
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
      <h3>Group members visibility</h3>
      <Box sx={{ display: "flex", gap: 3 }}>
        <Checkbox
          label="Members"
          checked={privacyMember}
          onChange={(e) => {
            setPrivacyMember(e.target.checked);
            e.target.checked ? null : setPrivacyGuest(e.target.checked);
          }}
        />
        <Checkbox
          label="Guests"
          checked={privacyGuest}
          onChange={(e) => {
            setPrivacyGuest(e.target.checked);
            e.target.checked ? setPrivacyMember(e.target.checked) : null;
          }}
        />
      </Box>

      <Box sx={{ display: "flex", gap: 3, paddingTop: "40px" }}>
        <Button size="lg" onClick={saveSettings} disabled={valuesChanged}>
          Save
        </Button>
        <Button color="danger" size="lg" onClick={handleOpenModal}>
          Delete
        </Button>
      </Box>

      <Dialog
        open={modalOpen}
        onClose={handleCloseModal}
        title="Confirmation"
        content="Are you sure you want to delete this group?"
        onConfirm={handleConfirm}
        textConfirm={groupData?.name}
      />
    </React.Fragment>
  );
};
