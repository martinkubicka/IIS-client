/**
 * @file Group.tsx
 * @author { Martin Kubicka (xkubic45) }
 * @date 17.12.2023
 * @brief Definition of group page base component
 */

import Add from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { Button, Typography } from "@mui/joy";
import Avatar from "@mui/joy/Avatar";
import { StyledEngineProvider } from "@mui/material/styles";
import GroupRole from "@src/enums/GroupRole";
import { groupService } from "@src/services/groupService";
import { loginService } from "@src/services/loginService";
import { memberService } from "@src/services/memberService";
import Dialog from "@src/shared/components/Dialog/Dialog";
import { Icon } from "@src/shared/components/Icon/Icon";
import { Page } from "@src/shared/components/Page";
import { PageHeader } from "@src/shared/components/PageHeader";
import { GroupModel } from "@src/shared/models/GroupModel";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Group.css";
import { TabMenu } from "./TabMenu";

export const Group = () => {
  const { handle } = useParams<{ handle: string }>();
  const [groupData, setGroupData] = useState<GroupModel | null>(null);
  const [joinLeaveText, setJoinLeaveText] = useState<string>("Join");
  const [moderatorText, setModeratorText] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalModeratorOpen, setModalModeratorOpen] = useState<boolean>(false);
  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleConfirm = () => {
    if (joinLeaveText == "Cancel join request") {
      cancelJoinRequest();
    } else {
      leave();
    }
    handleCloseModal();
  };

  const handleOpenModalModerator = () => {
    setModalModeratorOpen(true);
  };

  const handleCloseModalModerator = () => {
    setModalModeratorOpen(false);
  };

  const handleConfirmModerator = () => {
    cancelRequestModerator();
    handleCloseModalModerator();
  };

  const cancelJoinRequest = async () => {
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
      setJoinLeaveText("Join");
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

  const join = async () => {
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
      setJoinLeaveText("Cancel join request");
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

  const requestModerator = async () => {
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

      await memberService.createModeratorRequest(
        handle,
        loginService.getCookie("userEmail")
      );

      enqueueSnackbar("Moderator request sent successfully.", {
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

      setModeratorText("Cancel moderator request");
    } catch (error) {
      enqueueSnackbar("Error occured while sending moderator request.", {
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

  const cancelRequestModerator = async () => {
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

      await memberService.deleteModeratorRequest(
        loginService.getCookie("userEmail"),
        handle
      );

      enqueueSnackbar("Moderator request cancelled successfully.", {
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

      setModeratorText("Request moderator role");
    } catch (error) {
      enqueueSnackbar("Error occured while cancelling moderator request.", {
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

  const leave = async () => {
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

      await memberService.deleteMember(
        loginService.getCookie("userEmail"),
        handle
      );

      enqueueSnackbar("The group left successfully.", {
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
      setModeratorText(null);
      setJoinLeaveText("Join");
    } catch (error) {
      if (error?.response?.status == 403) {
        enqueueSnackbar("Error: You are the only group admin.", {
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
      } else {
        enqueueSnackbar("Error occured while leaving the group.", {
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
    }
  };

  const onSettingsSaved = async () => {
    const groupDataResponse = await groupService.getGroup(handle);
    const groupPolicyData = await groupService.getGroupPolicy(handle);
    const updatedGroupData = {
      ...groupDataResponse,
      visibilityGuest: groupPolicyData.visibilityGuest,
      visibilityMember: groupPolicyData.visibilityMember,
    };

    setGroupData(updatedGroupData);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const groupDataResponse = await groupService.getGroup(handle);
        setGroupData(groupDataResponse);

        const groupPolicyData = await groupService.getGroupPolicy(handle);

        if (groupDataResponse) {
          const updatedGroupData = {
            ...groupDataResponse,
            visibilityGuest: groupPolicyData.visibilityGuest,
            visibilityMember: groupPolicyData.visibilityMember,
          };

          setGroupData(updatedGroupData);

          const groupRole = await memberService.getMemberRole(
            loginService.getCookie("userEmail"),
            groupDataResponse.handle
          );
          const joinRequested = await memberService.joinRequested(
            groupDataResponse.handle,
            loginService.getCookie("userEmail")
          );
          const moderatorRequested = await memberService.moderatorRequested(
            groupDataResponse.handle,
            loginService.getCookie("userEmail")
          );

          if (loginService.getCookie("userEmail") !== null) {
            if (groupRole !== "" && groupRole != undefined) {
              setJoinLeaveText("Leave");
            } else if (joinRequested) {
              setJoinLeaveText("Cancel join request");
            } else {
              setJoinLeaveText("Join");
            }
          }

          if (loginService.getCookie("userEmail") !== null) {
            if (moderatorRequested) {
              setModeratorText("Cancel moderator request");
            } else if (groupRole == GroupRole.member) {
              setModeratorText("Request moderator role");
            } else {
              setModeratorText(null);
            }
          }
        }
      } catch (error) {}
    };

    fetchData();
  }, []);

  return (
    <Page>
      <div className="contentPadding">
        <StyledEngineProvider injectFirst>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingRight: "10px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <Avatar>
                <Icon iconName={groupData?.icon ? groupData.icon : ""} />
              </Avatar>
              <PageHeader text={groupData?.name} />
            </div>
            <div style={{ marginLeft: "auto" }}>
              {loginService.getCookie("userEmail") && moderatorText !== null ? (
                <Button
                  className="modButton"
                  color={
                    moderatorText == "Cancel moderator request"
                      ? "danger"
                      : "primary"
                  }
                  onClick={
                    moderatorText == "Cancel moderator request"
                      ? handleOpenModalModerator
                      : requestModerator
                  }
                  variant="outlined"
                  startDecorator={
                    moderatorText == "Cancel moderator request" ? (
                      <CloseIcon />
                    ) : (
                      <Add />
                    )
                  }
                >
                  {moderatorText}
                </Button>
              ) : null}
              {loginService.getCookie("userEmail") ? (
                <Button
                  className="joinButton"
                  color={joinLeaveText == "Join" ? "primary" : "danger"}
                  onClick={joinLeaveText == "Join" ? join : handleOpenModal}
                  variant="outlined"
                  startDecorator={
                    joinLeaveText == "Join" ? <Add /> : <CloseIcon />
                  }
                >
                  {joinLeaveText}
                </Button>
              ) : null}
            </div>
          </div>

          <Typography
            className="groupDescription"
            level="body-md"
            style={{
              whiteSpace: "normal",
              overflowWrap: "break-word",
              wordWrap: "break-word",
              maxWidth: "100%",
            }}
          >
            {groupData?.description}
          </Typography>
          <TabMenu
            groupData={groupData}
            onSettingsSaved={onSettingsSaved}
            triggerUseEffect={joinLeaveText}
          />
        </StyledEngineProvider>
      </div>

      <Dialog
        open={modalOpen}
        onClose={handleCloseModal}
        title="Confirmation"
        content={
          joinLeaveText == "Cancel join request"
            ? "Are you sure you want to cancel join request?"
            : "Are you sure you want to leave this group?"
        }
        onConfirm={handleConfirm}
      />

      <Dialog
        open={modalModeratorOpen}
        onClose={handleCloseModalModerator}
        title="Confirmation"
        content="Are you sure you want to cancel moderator request?"
        onConfirm={handleConfirmModerator}
      />
    </Page>
  );
};
