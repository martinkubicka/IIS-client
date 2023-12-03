import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Modal,
  ModalDialog,
  Typography,
  IconButton,
} from "@mui/joy";
import { loginService } from "@src/services/loginService";
import { memberService } from "@src/services/memberService";
import { Icon } from "@src/shared/components/Icon/Icon";
import { useSnackbar } from "notistack";
import { Link } from "react-router-dom";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { groupService } from "@src/services/groupService";

interface CardProps {
  handle: string;
  UserEmail: string;
  imageSrc: string;
  title: string;
  description: string;
  buttonText: string;
  name: string;
  onAction: () => void;
}

const GroupComponent: React.FC<CardProps> = ({
  handle,
  UserEmail,
  imageSrc,
  title,
  description,
  buttonText,
  name,
  onAction,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const { enqueueSnackbar } = useSnackbar();
  const [currentButtonText, setCurrentButtonText] =
    useState<string>(buttonText);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [openDeleteGroup, setOpenDeleteGroup] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkIfAdmin = async () => {
      try {
        const role = await memberService.getMemberRole(
          loginService.getCookie("userEmail"),
          handle
        );
        if (role === 0) {
          setIsAdmin(true);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    const fetchData = async () => {
      if (currentButtonText === "Join") {
        try {
          const joinRequested = await memberService.joinRequested(
            handle,
            loginService.getCookie("userEmail")
          );

          if (joinRequested) {
            setCurrentButtonText("Requested");
          }
        } catch (error) {
          console.error("Error:", error);
        }
      }
    };

    checkIfAdmin();
    fetchData();
  }, [handle, openDeleteGroup]);

  const handleDeleteGroup = async () => {
    try {
      enqueueSnackbar("Loading...", {
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

      await groupService.deleteGroup(handle);
      onAction();

      enqueueSnackbar("Delete Group request successfull .", {
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

    setOpenDeleteGroup(false);
  };

  const handleClick = () => {
    if (currentButtonText === "Join") {
      // Join action
      handleJoinGroup();
    } else if (currentButtonText === "Leave") {
      // Leave action
      setOpen(true);
    } else if (currentButtonText === "Requested") {
      // Cancel join request
      handleCancelJoinRequestGroup();
    }
  };

  const handleCancelJoinRequestGroup = async () => {
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

      await memberService.deleteJoinRequest(
        loginService.getCookie("userEmail"),
        handle
      );

      enqueueSnackbar("Join request cancelled successfully.", {
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
      setCurrentButtonText("Join");
    } catch (error) {
      enqueueSnackbar("Error occured while canceling join request.", {
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
  const handleJoinGroup = async () => {
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

      await memberService.createJoinRequest(
        handle,
        loginService.getCookie("userEmail")
      );

      enqueueSnackbar("Join request sent successfully.", {
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
      setCurrentButtonText("Requested");
    } catch (error) {
      enqueueSnackbar("Error occured while joining the group.", {
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

  const handleLeaveGroup = async () => {
    setOpen(false); // Close the dialog
    try {
      await memberService.deleteMember(UserEmail, handle);
      onAction(); // Notify the parent component that an action has been taken
      enqueueSnackbar("Group leaved successfully.", {
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
      enqueueSnackbar(
        "Error occurred while leaving the group. You might be the only admin.",
        {
          variant: "error",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "center",
          },
          autoHideDuration: 2000,
          style: {
            fontFamily: "Arial",
          },
        }
      );
    }
  };

  return (
    <Card
      variant="outlined"
      sx={{
        width: 200,
        height: 200,
        backgroundColor: "#EEF1FF",
        boxShadow: "0px 0px 8px 5px rgba(0,0,0,0.1)",
        transition: "transform 0.3s ease-in-out", // Add transition for smooth animation
        "&:hover": {
          transform: "scale(1.20)", // Apply scale transformation on hover
        },
      }}
    >
      <Box
        sx={{
          width: 250,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Avatar src={imageSrc} size="lg">
          {" "}
          <Icon iconName={imageSrc} />
        </Avatar>
      </Box>
      {isAdmin === true && (
        <IconButton
          onClick={() => setOpenDeleteGroup(true)}
          variant="plain"
          color="neutral"
          size="sm"
          sx={{ position: "absolute", top: "0.875rem", right: "0.5rem" }}
        >
          <DeleteForeverIcon />
        </IconButton>
      )}

      <CardContent>
        <Typography level="title-lg">{title}</Typography>
        <Typography level="body-sm">
          {description.length > 66
            ? `${description.slice(0, 55)}...`
            : description}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "center" }} buttonFlex="0 1 120px">
        <Link to={`/group/${handle}`} style={{ textDecoration: "none" }}>
          <Button
            variant="solid"
            color="primary"
            sx={{ boxShadow: "0px 0px 8px 5px rgba(0,0,0,0.1)" }}
          >
            View
          </Button>
        </Link>
        {buttonText === "" ? null : (
          <Button
            onClick={handleClick}
            variant="outlined"
            color="primary"
            sx={{ boxShadow: "0px 0px 8px 5px rgba(0,0,0,0.1)" }}
          >
            {currentButtonText}
          </Button>
        )}
        <Modal open={open} onClose={() => setOpen(false)}>
          <ModalDialog variant="outlined" role="alertdialog">
            <DialogTitle>
              <WarningRoundedIcon />
              Confirmation
            </DialogTitle>
            <Divider />
            <DialogContent>Are you sure you want to leave Group?</DialogContent>
            <DialogActions>
              <Button variant="solid" color="danger" onClick={handleLeaveGroup}>
                Leave Group
              </Button>
              <Button
                variant="plain"
                color="neutral"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
            </DialogActions>
          </ModalDialog>
        </Modal>

        <Modal open={openDeleteGroup} onClose={() => setOpenDeleteGroup(false)}>
          <ModalDialog variant="outlined" role="alertdialog">
            <DialogTitle>
              <WarningRoundedIcon />
              Confirmation
            </DialogTitle>
            <Divider />
            <DialogContent>
              Are you sure you want to Delete Group?
            </DialogContent>
            <DialogActions>
              <Button
                variant="solid"
                color="danger"
                onClick={handleDeleteGroup}
              >
                Delete Group
              </Button>
              <Button
                variant="plain"
                color="neutral"
                onClick={() => setOpenDeleteGroup(false)}
              >
                Cancel
              </Button>
            </DialogActions>
          </ModalDialog>
        </Modal>
      </CardActions>
    </Card>
  );
};

export default GroupComponent;
