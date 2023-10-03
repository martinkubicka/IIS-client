import { GroupModel } from "@src/shared/models/GroupModel";
import { useEffect, useState } from "react";
import { ThreadModel } from "@src/shared/models/ThreadModel";
import { threadService } from "@src/services/threadService";
import { Thread } from "@src/shared/components/Threads";
import { Button } from '@mui/joy';
import Add from '@mui/icons-material/Add';
import { enqueueSnackbar } from "notistack";
import AddEditThread from "./AddEditThread";
import PaginationComponent from "@src/shared/components/Pagination/PaginationComponent";
import ThreadFilter from "@src/shared/components/ThreadFilter/ThreadFilter";

interface GroupThreadsProps {
    groupData?: GroupModel;
}

export const GroupThreads: React.FC<GroupThreadsProps> = ({ groupData }) => {
    const [threads, setThreads] = useState<ThreadModel[] | null>(null);
    const [openCreate, setOpenCreate] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const itemsPerPage = 5;

    const handlePageChange = async (page: number) => {
        setCurrentPage(page);
        const threadsResponse = await threadService.getGroupThreads(groupData?.handle, page, itemsPerPage);
        setThreads(threadsResponse);
    };

    const onDelete = async () => {
        const threadsCount = await threadService.getGroupThreadsCount(groupData?.handle, null, null, null);
        setTotalPages(Math.floor(threadsCount / itemsPerPage) + 1);

        const threadsResponse = await threadService.getGroupThreads(groupData?.handle, currentPage, itemsPerPage, null, null, null);
        setThreads(threadsResponse);
    };

    useEffect(() => {
        if (groupData?.handle) {
          const fetchData = async () => {
                try {
                    const threadsCount = await threadService.getGroupThreadsCount(groupData?.handle, null, null, null);
                    setTotalPages(Math.floor(threadsCount / itemsPerPage) + 1);

                    const threadsResponse = await threadService.getGroupThreads(groupData?.handle, currentPage, itemsPerPage, null, null, null);
                    setThreads(threadsResponse);
                } catch {}
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
            enqueueSnackbar("Loading..", {
                variant: 'info',
                anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'center',
                },
                autoHideDuration: 2000,
                style: {
                    fontFamily: 'Arial',
                },
            });

            await threadService.createThread(newThread);
            await onDelete();

            enqueueSnackbar("Thread created successfully.", {
                variant: 'success',
                anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'center',
                },
                autoHideDuration: 2000,
                style: {
                    fontFamily: 'Arial',
                },
            });
    
        } catch (error) {
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

    const [filters, setFilters] = useState({ name: '', fromDate: '', toDate: '' });

    const handleFilterChange = async (newFilters : { name: string, fromDate: string, toDate: string,}) => {
        setFilters(newFilters);

        setCurrentPage(1);

        const threadsCount = await threadService.getGroupThreadsCount(groupData?.handle, newFilters.name, newFilters.fromDate, newFilters.toDate);
        setTotalPages(Math.floor(threadsCount / itemsPerPage) + 1);

        const threadsResponse = await threadService.getGroupThreads(groupData?.handle, 1, itemsPerPage, newFilters.name, newFilters.fromDate, newFilters.toDate);
        setThreads(threadsResponse);

        console.log("here")
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

            <ThreadFilter onFilterChange={handleFilterChange} />

            {threads === null ? (
            "Loading threads..."
            ) : threads.length === 0 ? (
            "No threads found"
            ) : (
            threads.map((thread) => (
                <Thread thread={thread} onDelete={onDelete}/>
            ))
            )}

            <PaginationComponent
                currentPage={currentPage}
                onPageChange={handlePageChange}
                totalPages={totalPages}
            />

            <AddEditThread open={openCreate} onClose={handleCloseCreate} onSubmit={handleSubmitCreate} createUpdateText="Create" header="Create new thread" thread={null}/>        </div>
    );
  };
