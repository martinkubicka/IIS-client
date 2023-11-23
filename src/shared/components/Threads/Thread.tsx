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
  Avatar,
  Divider,
} from "@mui/joy";
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
import { Edit, DeleteForever } from "@mui/icons-material";

interface ThreadProps {
  thread?: ThreadModel;
  onDelete: () => void;
}

export const Thread: React.FC<ThreadProps> = ({ thread, onDelete }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [trigger, setTrigger] = useState(false);
  const threadIcon = thread?.name[0].toUpperCase();

  useEffect(() => {
    const getPermissions = async () => {
      const role = await memberService.getMemberRole(
        loginService.getCookie("userEmail"),
        thread?.handle
      );
      
      if (
        loginService.getCookie("userRole") == Role.admin ||
        loginService.getCookie("userEmail") == thread?.email ||
        (role !== "" && (role == GroupRole.admin || role == GroupRole.moderator))
      ) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    
    getPermissions();
  }, [thread, trigger]);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleConfirm = () => {
    deleteThread();
    setTrigger(!trigger);
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
        variant=""
        orientation="horizontal"
        sx={{
          marginBottom: "0px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Link
          to={`/thread/${thread?.id}`}
          style={{ textDecoration: "none", textDecorationColor: "black" }}
          onMouseEnter={(e) => {
            const nameElement = e.currentTarget.querySelector('.thread-name');
            if (nameElement) {
              nameElement.style.textDecoration = "underline";
              nameElement.style.textDecorationColor = "black";
            }
          }}
          onMouseLeave={(e) => {
            const nameElement = e.currentTarget.querySelector('.thread-name');
            if (nameElement) {
              nameElement.style.textDecoration = "none";
              nameElement.style.textDecorationColor = "black";
            }
          }}
        >
        <div style={{ display: "flex", alignItems: "center" }}>
          <Avatar variant="outlined" sx={{marginRight: "20px"}}>
            {threadIcon}
          </Avatar>
        
          <CardContent>
            <Typography level="title-md" className="thread-name">{thread?.name}</Typography>

            <Typography sx={{ wordBreak: "break-word" }}>
              {thread?.description}
            </Typography>
          </CardContent>
        </div>
        </Link>

        {isVisible ? (
              <div style={{ display: 'flex', alignItems: 'center'}}>
                <IconButton onClick={handleOpenUpdate}>
                  <Edit />
                </IconButton>
                <IconButton onClick={() => handleOpenModal()} variant="plain">
                  <DeleteForever />
                </IconButton>
              </div>
            ) : null}
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

      <Divider />
    </>
  );
};
