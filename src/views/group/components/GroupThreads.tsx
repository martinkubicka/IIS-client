/**
 * @file GroupThreads.tsx
 * @author { Martin Kubicka (xkubic45) }
 * @date 17.12.2023
 * @brief Definition of group threads component which shows all threads in group
 */

import { Divider } from "@mui/joy";
import GroupRole from "@src/enums/GroupRole";
import Role from "@src/enums/Role";
import { loginService } from "@src/services/loginService";
import { memberService } from "@src/services/memberService";
import { threadService } from "@src/services/threadService";
import PaginationComponent from "@src/shared/components/Pagination/PaginationComponent";
import ThreadFilter from "@src/shared/components/ThreadFilter/ThreadFilter";
import { Thread } from "@src/shared/components/Threads";
import { GroupModel } from "@src/shared/models/GroupModel";
import { ThreadModel } from "@src/shared/models/ThreadModel";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
import AddEditThread from "./EditThread";
import AddThreadDropDown from "./AddThread";

interface GroupThreadsProps {
  groupData?: GroupModel;
  triggerUseEffect?: string;
}

export const GroupThreads: React.FC<GroupThreadsProps> = ({
  groupData,
  triggerUseEffect,
}) => {
  const [threads, setThreads] = useState<ThreadModel[] | null>(null);
  const [openCreate, setOpenCreate] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const itemsPerPage = 5;

  const handlePageChange = async (page: number) => {
    setCurrentPage(page);
    const threadsResponse = await threadService.getGroupThreads(
      groupData?.handle,
      page,
      itemsPerPage,
      filters.name,
      filters.fromDate,
      filters.toDate
    );
    setThreads(threadsResponse);
  };

  const onDelete = async () => {
    const threadsCount = await threadService.getGroupThreadsCount(
      groupData?.handle,
      filters.name,
      filters.fromDate,
      filters.toDate
    );
    setTotalPages(
      Math.floor(threadsCount / itemsPerPage) +
        (threadsCount % itemsPerPage == 0 ? 0 : +1)
    );

    const threadsResponse = await threadService.getGroupThreads(
      groupData?.handle,
      currentPage,
      itemsPerPage,
      filters.name,
      filters.fromDate,
      filters.toDate
    );
    setThreads(threadsResponse);
  };

  useEffect(() => {
    if (groupData?.handle) {
      const fetchData = async () => {
        try {
          const threadsCount = await threadService.getGroupThreadsCount(
            groupData?.handle,
            null,
            null,
            null
          );
          setTotalPages(
            Math.floor(threadsCount / itemsPerPage) +
              (threadsCount % itemsPerPage == 0 ? 0 : +1)
          );

          const threadsResponse = await threadService.getGroupThreads(
            groupData?.handle,
            currentPage,
            itemsPerPage,
            null,
            null,
            null
          );
          setThreads(threadsResponse);
        } catch {}
      };

      const getPermissions = async () => {
        const groupRole = await memberService.getMemberRole(
          loginService.getCookie("userEmail"),
          groupData.handle
        );
        if (
          loginService.getCookie("userRole") == Role.admin ||
          (groupRole !== "" && groupRole == GroupRole.admin) ||
          groupRole == GroupRole.member ||
          groupRole == GroupRole.moderator
        ) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      };

      getPermissions();
      fetchData();
    }
  }, [groupData, triggerUseEffect]);

  const handleOpenCreate = () => {
    setOpenCreate(true);
  };

  const handleCloseCreate = () => {
    setOpenCreate(false);
  };

  const handleSubmitCreate = async (formData: {
    name: string;
    description: string | null;
  }) : Promise<boolean>  => {
    const newThread = {
      email: loginService.getCookie("userEmail"),
      name: formData.name,
      description: formData.description,
      handle: groupData?.handle,
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

      await threadService.createThread(newThread);
      await onDelete();

      enqueueSnackbar("Thread created successfully.", {
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

      return true
    } catch (error) {
      enqueueSnackbar("Error occured while adding the thread.", {
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

      return false;
    }

    setOpenCreate(false);
  };

  const [filters, setFilters] = useState({
    name: "",
    fromDate: "",
    toDate: "",
  });

  const handleFilterChange = async (newFilters: {
    name: string;
    fromDate: string;
    toDate: string;
  }) => {
    setFilters(newFilters);

    if (newFilters.toDate != undefined) {
      newFilters.toDate += "T23:59:59";
    } else if (newFilters.toDate != null) {
      newFilters.toDate = filters.toDate;
    }

    if (newFilters.name == undefined && newFilters.name != null) {
      newFilters.name = filters.name;
    }

    if (newFilters.fromDate == undefined && newFilters.fromDate != null) {
      newFilters.fromDate = filters.fromDate;
    }

    setCurrentPage(1);

    const threadsCount = await threadService.getGroupThreadsCount(
      groupData?.handle,
      newFilters.name,
      newFilters.fromDate,
      newFilters.toDate
    );
    setTotalPages(
      Math.floor(threadsCount / itemsPerPage) +
        (threadsCount % itemsPerPage == 0 ? 0 : +1)
    );

    const threadsResponse = await threadService.getGroupThreads(
      groupData?.handle,
      1,
      itemsPerPage,
      newFilters.name,
      newFilters.fromDate,
      newFilters.toDate
    );

    setThreads(threadsResponse);
  };

  return (
    <div>
      {isVisible ? (
          <AddThreadDropDown 
          onSubmit={handleSubmitCreate}
          thread={null}
          />
      ) : null}
      <ThreadFilter onFilterChange={handleFilterChange} />
      <Divider />
      {threads === null
        ? "Loading threads..."
        : threads.length === 0
        ? "No threads found"
        : threads.map((thread) => (
            <Thread thread={thread} onDelete={onDelete} />
          ))}
      <PaginationComponent
        currentPage={currentPage}
        onPageChange={handlePageChange}
        totalPages={totalPages}
      />
      <AddEditThread
        open={openCreate}
        onClose={handleCloseCreate}
        onSubmit={handleSubmitCreate}
        createUpdateText="Create"
        header="Create new thread"
        thread={null}
      />{" "}
    </div>
  );
};
