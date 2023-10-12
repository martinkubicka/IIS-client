import { UserDetailModel } from "@src/shared/models/UserDetailModel";
import { UserPrivacySettingsModel } from "@src/shared/models/UserPrivacySettingsModel";
import React, { useState, useEffect } from "react";
import {
  FormControl,
  FormHelperText,
  Box,
  Button,
  Avatar,
  Input,
} from "@mui/joy";
import Dialog from "../../../shared/components/Dialog/Dialog";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { ClickAwayListener, Popper } from "@mui/material";
import { Icon } from "@src/shared/components/Icon/Icon";
import { IconPicker } from "@src/shared/components/IconPicker/IconPicker";
import { userService } from "@src/services/userService";

interface UserSettingsProps {
  userDetailData?: UserDetailModel;
  userPrivacySettingsData?: UserPrivacySettingsModel;
  onSettingsSaved: () => void;
}

export const UserSettings: React.FC<UserSettingsProps> = ({
  userDetailData,
  userPrivacySettingsData,
  onSettingsSaved,
}) => {
  const [open, setOpen] = React.useState(false);
  const [icon, setIconName] = useState(userDetailData?.icon);
  const [validName, setValidName] = useState<boolean>(true);
  const [name, setName] = useState(userDetailData?.name);
  const ref = React.useRef(null);
  const { enqueueSnackbar } = useSnackbar();
  const [valuesChanged, setValuesChanged] = useState<boolean>(true);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleOpenModal = () => {
    setModalOpen(true);
  };
  useEffect(() => {
    handleFieldChange();
  }, [name, icon]);
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleConfirm = () => {
    deleteUser();
    handleCloseModal();
  };
  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  const handleIconSelect = (code: string) => {
    setOpen(false);
    setIconName(code);
  };

  const handleFieldChange = () => {
    if (name?.trim() === "") {
      setValidName(false);
    } else {
      setValidName(true);
    }

    if (
      userDetailData &&
      validName &&
      (userDetailData.name !== name || userDetailData.icon !== icon)
    ) {
      setValuesChanged(false);
    } else {
      setValuesChanged(true);
    }
  };

  const deleteUser = async () => {
    try {
      await userService.deleteUser(userDetailData?.handle);

      localStorage.setItem(
        "snackbarData",
        JSON.stringify({
          message: "User deleted successfully.",
          variant: "success",
          duration: 2000,
          fontFamily: "Arial",
        })
      );

      navigate("/");
    } catch (error) {
      enqueueSnackbar("Error occured while deleting the user.", {
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
  const saveSettings = async () => {
    if (userDetailData) {
      userDetailData.name = name;
      userDetailData.icon = icon;
      userDetailData.password = "password1"; //TODO password change functionality
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

      await userService.updateUser(userDetailData, userPrivacySettingsData);
      await onSettingsSaved();

      enqueueSnackbar("User settings updated successfully.", {
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
      enqueueSnackbar("Error occured while updating the user.", {
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
            setName(e.target.value);
          }}
        />
        {!validName && (
          <FormHelperText>Name field cannot be empty!</FormHelperText>
        )}
      </FormControl>
      <h3>Bio:</h3>
      TODO
      <h3>Password:</h3>
      TODO
      <h3>Visible to:</h3>
      TODO
      {/* <Box sx={{ display: "flex", gap: 3 }}>
        <Checkbox
          label="Registered"
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
        <Checkbox
          label="Group members"
          checked={privacyMember}
          onChange={(e) => {
            setPrivacyMember(e.target.checked);
            e.target.checked ? null : setPrivacyGuest(e.target.checked);
          }}
        />
      </Box> */}
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
        content="Are you sure you want to delete this Profile?"
        onConfirm={handleConfirm}
        textConfirm={userDetailData?.name}
        textUnderConfirm="Insert profile name to confirm deletion"
      />
    </React.Fragment>
  );
};

export default UserSettings;
