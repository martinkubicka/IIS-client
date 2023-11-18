import { ThreadModel } from "@src/shared/models/ThreadModel";
import {
  AspectRatio,
  Card,
  CardContent,
  Typography,
  Dropdown,
  MenuItem,
  Menu,
  MenuButton,
  IconButton,
} from "@mui/joy";
import AccountTreeRoundedIcon from "@mui/icons-material/AccountTreeRounded";
import MoreVert from "@mui/icons-material/MoreVert";
import { Link, useNavigate } from "react-router-dom";
import Dialog from "../Dialog/Dialog";
import { useEffect, useState } from "react";
import { threadService } from "@src/services/threadService";
import { enqueueSnackbar } from "notistack";
import AddEditThread from "@src/views/group/components/AddEditThread";
import { loginService } from "@src/services/loginService";
import Role from "@src/enums/Role";
import { memberService } from "@src/services/memberService";
import GroupRole from "@src/enums/GroupRole";

interface ThreadProps {
  thread?: ThreadModel;
  onDelete: () => void;
}

export const Thread: React.FC<ThreadProps> = ({ thread, onDelete }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const getPermissions = async () => {
      const role = await memberService.getMemberRole(
        loginService.getCookie("userEmail"),
        thread?.handle
      );
      if (
        loginService.getCookie("userRole") == Role.admin ||
        loginService.getCookie("userEmail") == thread?.email ||
        (role !== "" && role == GroupRole.admin)
      ) {
        setIsVisible(true);
      }
    };

    getPermissions();
  }, []);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleConfirm = () => {
    deleteThread();
    handleCloseModal();
  };

  const handleOpenUpdate = () => {
    setOpenUpdate(true);
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };

  const handleSubmitUpdate = async (formData: {
    name: string;
    description: string | null;
  }) => {
    const newThread = {
      ...thread,
      name: formData.name,
      description: formData.description,
    };

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

      await threadService.updateThread(thread?.id, newThread);
      await onDelete();

      enqueueSnackbar("Thread updated successfully.", {
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
      enqueueSnackbar("Error occured while updating the thread.", {
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

    setOpenUpdate(false);
  };

  const deleteThread = async () => {
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

      await threadService.deleteThread(thread?.id);
      await onDelete();

      enqueueSnackbar("Thread deleted successfully.", {
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
      enqueueSnackbar("Error occured while deleting the thread.", {
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
    <>
      <Card
        variant="soft"
        orientation="horizontal"
        sx={{
          marginBottom: "20px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <AspectRatio ratio="1" sx={{ width: 35, marginRight: "10px" }}>
            <AccountTreeRoundedIcon />
          </AspectRatio>
        </div>
        <CardContent>
          <Link
            to={`/thread/${thread?.id}`}
            style={{ textDecoration: "none", textDecorationColor: "black" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.textDecoration = "underline";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.textDecoration = "none";
            }}
          >
            <Typography level="title-md">{thread?.name}</Typography>
          </Link>

          <Typography sx={{ wordBreak: "break-word" }}>
            {thread?.description}
          </Typography>
        </CardContent>

        <Dropdown>
          <div style={{ display: "flex", alignItems: "center" }}>
            <AspectRatio ratio="1" sx={{ width: 35 }}>
              <MenuButton slots={{ root: IconButton }}>
                <MoreVert />
              </MenuButton>
            </AspectRatio>
          </div>
          <Menu>
            <Link
              to={`/thread/${thread?.id}`}
              style={{ textDecoration: "none" }}
            >
              <MenuItem>Detail</MenuItem>
            </Link>

            {isVisible ? (
              <div>
                <MenuItem onClick={handleOpenUpdate}>Edit</MenuItem>
                <MenuItem onClick={handleOpenModal}>Delete</MenuItem>
              </div>
            ) : null}
          </Menu>
        </Dropdown>
      </Card>

      <Dialog
        open={modalOpen}
        onClose={handleCloseModal}
        title="Confirmation"
        content="Are you sure you want to delete thread?"
        onConfirm={handleConfirm}
      />
      <AddEditThread
        open={openUpdate}
        onClose={handleCloseUpdate}
        onSubmit={handleSubmitUpdate}
        createUpdateText="Update"
        header="Update thread settings"
        thread={thread}
      />
    </>
  );
};
