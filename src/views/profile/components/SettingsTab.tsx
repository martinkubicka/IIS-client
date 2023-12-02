import {
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormHelperText,
  Input,
} from "@mui/joy";
import { ClickAwayListener, Popper } from "@mui/material";
import { loginService } from "@src/services/loginService";
import { userService } from "@src/services/userService";
import { Icon } from "@src/shared/components/Icon/Icon";
import { IconPicker } from "@src/shared/components/IconPicker/IconPicker";
import { UserDetailModel } from "@src/shared/models/UserDetailModel";
import { UserPrivacySettingsModel } from "@src/shared/models/UserPrivacySettingsModel";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Dialog from "../../../shared/components/Dialog/Dialog";
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
  const [registeredChecked, setRegisteredChecked] = useState(
    userPrivacySettingsData?.visibilityRegistered
  );
  const [guestChecked, setGuestChecked] = useState(
    userPrivacySettingsData?.visibilityGuest
  );
  const [groupChecked, setGroupChecked] = useState(
    userPrivacySettingsData?.visibilityGroup
  );
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState<boolean>(true);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  useEffect(() => {
    handleFieldChange();
  }, [name, icon, registeredChecked, guestChecked, groupChecked, password]);

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
      password?.length >= 8 &&
      /[A-Z]/.test(password) &&
      /\d/.test(password) &&
      /[^A-Za-z0-9]/.test(password)
    ) {
      setValidPassword(true);
    } else if (password === "") {
      setValidPassword(true);
    } else {
      setValidPassword(false);
    }

    if (
      validPassword &&
      userDetailData &&
      validName &&
      (userDetailData.name !== name ||
        userDetailData.icon !== icon ||
        userPrivacySettingsData?.visibilityGroup !== groupChecked ||
        userPrivacySettingsData?.visibilityGuest !== guestChecked ||
        userPrivacySettingsData?.visibilityRegistered !== registeredChecked ||
        (password !== "" && password?.length >= 8))
    ) {
      setValuesChanged(false);
    } else {
      setValuesChanged(true);
    }
  };

  const deleteUser = async () => {
    try {
      await userService.deleteUser(userDetailData?.email);
      await loginService.logout();

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
      userDetailData.password = password;
    }

    if (userPrivacySettingsData) {
      userPrivacySettingsData.visibilityRegistered = registeredChecked || false;
      userPrivacySettingsData.visibilityGuest = guestChecked || false;
      userPrivacySettingsData.visibilityGroup = groupChecked || false;
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
      if (userDetailData?.password === "") {
        await userService.updateUserWithoutPassword(
          userDetailData,
          userPrivacySettingsData
        );
      } else {
        await userService.updateUser(userDetailData, userPrivacySettingsData);
      }
      await onSettingsSaved();
      //setValuesChanged(true);

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
      <h3>Password:</h3>
      <Input
        error={!validPassword}
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      {!validPassword && (
        <FormHelperText>
          Password must be at least 8 characters long, contain at least one
          uppercase letter, one number, and one special character.
        </FormHelperText>
      )}

      <h3>Visible to:</h3>
      <Checkbox
        label="Registered"
        variant="solid"
        defaultChecked={registeredChecked}
        onChange={(e) => {
          setRegisteredChecked(e.target.checked);
        }}
        style={{ margin: "10px" }}
      />
      <Checkbox
        label="Guest"
        variant="solid"
        defaultChecked={guestChecked}
        onChange={(e) => {
          setGuestChecked(e.target.checked);
        }}
        style={{ margin: "10px" }}
      />
      <Checkbox
        label="Group"
        variant="solid"
        defaultChecked={groupChecked}
        onChange={(e) => {
          setGroupChecked(e.target.checked);
        }}
        style={{ margin: "10px" }}
      />
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
