import { GroupModel } from "@src/shared/models/GroupModel";
import { useEffect, useState } from "react";
import { ThreadModel } from "@src/shared/models/ThreadModel";
import { threadService } from "@src/services/threadService";
import { Thread } from "@src/shared/components/Threads";
import { Button } from '@mui/joy';
import Add from '@mui/icons-material/Add';
import { enqueueSnackbar } from "notistack";
import AddEditThread from "./AddEditThread";

interface GroupThreadsProps {
    groupData?: GroupModel;
}

export const GroupThreads: React.FC<GroupThreadsProps> = ({ groupData }) => {
    const [threads, setThreads] = useState<ThreadModel[] | null>(null);
    const [openCreate, setOpenCreate] = useState(false);

    useEffect(() => {
        if (groupData?.handle) {
          const fetchData = async () => {
              const threadsResponse = await threadService.getGroupThreads(groupData?.handle);
              setThreads(threadsResponse);
          };
    
          fetchData();
        }
      }, [groupData]);
    
    const handleOpenCreate = () => {
        setOpenCreate(true);
    };

    const handleCloseCreate = () => {
        setOpenCreate(false);
    };

    const handleSubmitCreate = async (formData: { name: string; description: string | null }) => {
        const newThread = {
            email: "user1@example.com",
            name: formData.name,
            description: formData.description,
            handle: groupData?.handle, 
          };

        try {
            await threadService.createThread(newThread);

            localStorage.setItem('snackbarData', JSON.stringify({
            message: "Thread created successfully.",
            variant: 'success',
            duration: 2000,
            fontFamily: 'Arial',
            }));
    
            window.location.reload();
        } catch (error) {
            console.log(error);
            enqueueSnackbar("Error occured while adding the thread.", {
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

        setOpenCreate(false);
    };
    
    return (
        <div>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
                variant="outlined"
                color="neutral"
                startDecorator={<Add />}
                sx={{ marginBottom: "20px" }}
                onClick={handleOpenCreate}
            >
                New thread
            </Button>
            </div>

            {threads === null ? (
            "Loading threads..."
            ) : threads.length === 0 ? (
            "No threads found"
            ) : (
            threads.map((thread) => (
                <Thread thread={thread} />
            ))
            )}

            <AddEditThread open={openCreate} onClose={handleCloseCreate} onSubmit={handleSubmitCreate} createUpdateText="Create" header="Create new thread" thread={null}/>        </div>
    );
  };

// todo thread
    // pagination
    // filtre
//// todo add icon module (settings + group main) + navbar
