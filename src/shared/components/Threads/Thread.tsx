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
  IconButton
} from '@mui/joy';
import AccountTreeRoundedIcon from '@mui/icons-material/AccountTreeRounded';
import MoreVert from '@mui/icons-material/MoreVert';
import { Link, useNavigate } from 'react-router-dom';
import Dialog from "../Dialog/Dialog";
import { useState } from "react";
import { threadService } from "@src/services/threadService";
import { enqueueSnackbar } from "notistack";
import AddEditThread from "@src/views/group/components/AddEditThread";

interface ThreadProps {
  thread?: ThreadModel;
}

export const Thread: React.FC<ThreadProps> = ({ thread }) => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [openUpdate, setOpenUpdate] = useState(false);

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

const handleSubmitUpdate = async (formData: { name: string; description: string | null }) => {
    const newThread = {
        ...thread, 
        name: formData.name,
        description: formData.description,
        email: 'user1@example.com',
      };

    try {
        await threadService.updateThread(thread?.id, newThread);

        localStorage.setItem('snackbarData', JSON.stringify({
        message: "Thread updated successfully.",
        variant: 'success',
        duration: 2000,
        fontFamily: 'Arial',
        }));

        window.location.reload();
    } catch (error) {
        enqueueSnackbar("Error occured while updating the thread.", {
            variant: 'error',
            anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'center',
            },
            autoHideDuration: 2000,
            style: {
                fontFamily: 'Arial',
            },
        });
    } 

    setOpenUpdate(false);
};

  const deleteThread = async () => {
    try {
        await threadService.deleteThread(thread?.id);
        
        localStorage.setItem('snackbarData', JSON.stringify({
            message: "Thread deleted successfully.",
            variant: 'success',
            duration: 2000,
            fontFamily: 'Arial',
          }));
        
          navigate(`/group/${thread?.handle}`);
    } catch (error) {
        enqueueSnackbar("Error occured while deleting the thread.", {
            variant: 'error',
            anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'center',
            },
            autoHideDuration: 2000,
            style: {
                fontFamily: 'Arial',
            },
        });
    }
};

  return (
    <div>
      <Card variant="soft" orientation="horizontal" sx={{ marginBottom: "20px", display: "flex", justifyContent: "space-between" }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <AspectRatio ratio="1" sx={{ width: 35, marginRight: "10px" }}>
              <AccountTreeRoundedIcon />
            </AspectRatio>
          </div>
          <CardContent>
            <Link to={`/thread/${thread?.id}`} style={{ textDecoration: 'none'}} 
              onMouseEnter={(e) => {
                e.currentTarget.style.textDecoration = 'underline';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.textDecoration = 'none';
              }}>
              <Typography level="title-md">
                {thread?.name}
                </Typography>
              </Link>

            <Typography>
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
            <Link to={`/thread/${thread?.id}`} style={{ textDecoration: 'none' }}>
              <MenuItem>Detail</MenuItem>
            </Link>
            <MenuItem onClick={handleOpenUpdate}>Edit</MenuItem>
            <MenuItem onClick={handleOpenModal}>Delete</MenuItem>
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
        <AddEditThread open={openUpdate} onClose={handleCloseUpdate} onSubmit={handleSubmitUpdate} createUpdateText="Update" header="Update thread settings" thread={thread}/>
    </div>
  );
};
