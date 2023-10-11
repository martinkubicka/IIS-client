import React, { useEffect, useState } from "react";
import { Page } from "@src/shared/components/Page";
import GroupComponent from "./GroupComponent";
import { Divider, Typography, Button } from "@mui/joy"; // Import Button from @mui/joy
import Add from "@mui/icons-material/Add";
import { groupService } from "@src/services/groupService";
import { GroupModel } from "@src/shared/models/GroupModel";
import { Thread } from "@src/shared/components/Threads";
import { ThreadModel } from "@src/shared/models/ThreadModel";
import { threadService } from "@src/services/threadService";

export const Dashboard = () => {
  const [userGroups, setUserGroups] = useState<GroupModel[]>([]);
  const [recommendedGroups, setRecommendedGroups] = useState<GroupModel[]>([]);
  const [threads, setThreads] = useState<ThreadModel[] | null>(null);
  // todo: Replace 'userEmail' with the actual user's email address
  const userEmail = "john.doe@example.com";

  const onDelete = async () => {
    setThreads(null);
  };

  useEffect(() => {
    const fetchUserGroupsAndThreads = async () => {
      try {
        // Fetch user's joined groups
        const joinedGroups = await groupService.getGroupsUserIsIn(
          userEmail,
          true
        );
        setUserGroups(joinedGroups.slice(0, 5)); // Only get the first 5 joined groups

        // Fetch recommended groups (groups where the user is not joined)
        const recommendedGroups = await groupService.getGroupsUserIsIn(
          userEmail,
          false
        );
        setRecommendedGroups(recommendedGroups.slice(0, 5)); // Only get the first 5 recommended groups

        // Fetch all threads the user is in
        const allThreads = await threadService.getAllThreadsUserIsIn(userEmail);
        setThreads(allThreads); // Set the threads in the state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUserGroupsAndThreads();
  }, []);

  const handleNewGroupButtonClick = () => {};

  return (
    <Page>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography level="h1" fontSize="x2" sx={{ mb: 0.5 }}>
          My Groups
        </Typography>
        <Button
          variant="outlined"
          color="neutral"
          startDecorator={<Add />}
          sx={{ marginBottom: "20px" }}
          onClick={handleNewGroupButtonClick}
        >
          New Group
        </Button>
      </div>
      <div style={{ display: "flex", gap: "16px" }}>
        {userGroups.map((group, index) => (
          <GroupComponent
            key={index}
            UserEmail={userEmail}
            handle={group.handle}
            title={group.name ?? ""}
            description={group.description ?? ""}
            buttonText="Leave"
            showButtonJoin={true}
            imageSrc={""}
            avatarSrcList={[]}
          />
        ))}
      </div>
      <div style={{ marginTop: "20px" }}>
        <Divider />
      </div>
      <Typography level="h1" fontSize="x2" sx={{ mb: 0.5 }}>
        Suggested
      </Typography>
      <div style={{ display: "flex", gap: "16px" }}>
        {recommendedGroups.map((group, index) => (
          <GroupComponent
            key={index}
            UserEmail={userEmail}
            handle={group.handle}
            title={group.name ?? ""}
            description={group.description ?? ""}
            buttonText="Join"
            showButtonJoin={true}
            imageSrc={""}
            avatarSrcList={[]}
          />
        ))}
      </div>
      <div style={{ marginTop: "20px" }}>
        <Divider />
      </div>

      {threads === null ? (
        "Loading threads..."
      ) : threads.length === 0 ? (
        "No threads found"
      ) : (
        <div>
          <Typography level="h1" fontSize="x2" sx={{ mb: 0.5 }}>
            Threads
          </Typography>
          {threads.map((thread, index) => (
            <Thread key={index} thread={thread} onDelete={onDelete} />
          ))}
        </div>
      )}
    </Page>
  );
};
