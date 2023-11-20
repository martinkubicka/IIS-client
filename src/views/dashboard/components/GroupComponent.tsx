import React, { useState, useEffect } from "react";

import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  Modal,
  ModalDialog,
  DialogTitle,
  DialogContent,
  Divider,
  DialogActions,
} from "@mui/joy";
import { Icon } from "@src/shared/components/Icon/Icon";
import { Link } from "react-router-dom";
import { memberService } from "@src/services/memberService";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";

interface CardProps {
  handle: string;
  UserEmail: string;
  imageSrc: string;
  title: string;
  description: string;
  buttonText: string;
  name: string;
  onAction: () => void; // Add the onAction prop
}

const GroupComponent: React.FC<CardProps> = ({
  handle,
  UserEmail,
  imageSrc,
  title,
  description,
  buttonText,
  name,
  onAction, // Destructure the onAction prop
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const handleClick = () => {
    if (buttonText === "Join") {
      // Join action
      memberService.addMember(handle, UserEmail, 1, name).then(() => {
        onAction(); // Notify the parent component that an action has been taken
      });
    } else {
      // Leave action
      setOpen(true); // Open the dialog
    }
  };

  const handleLeaveGroup = () => {
    setOpen(false); // Close the dialog
    memberService.deleteMember(UserEmail, handle).then(() => {
      onAction(); // Notify the parent component that an action has been taken
    });
  };

  return (
    <Card
      variant="outlined"
      sx={{
        width: 250,
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
      <CardContent>
        <Typography level="title-lg">{title}</Typography>
        <Typography level="body-sm">
          {description.length > 110
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
            {buttonText}
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
      </CardActions>
    </Card>
  );
};

export default GroupComponent;
