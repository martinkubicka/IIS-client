import React, { useEffect, useState } from "react";
import { Page } from "@src/shared/components/Page";
import GroupComponent from "./GroupComponent";
import { Divider } from "@mui/joy";
import { groupService } from "@src/services/groupService";
import { GroupModel } from "@src/shared/models/GroupModel";
import { Thread } from "@src/shared/components/Threads";
import { ThreadModel } from "@src/shared/models/ThreadModel";
import { threadService } from "@src/services/threadService";

export const Dashboard = () => {
  const [userGroups, setUserGroups] = useState<GroupModel[]>([]);
  const [recommendedGroups, setRecommendedGroups] = useState<GroupModel[]>([]);
  const [threads, setThreads] = useState<ThreadModel[] | null>(null);
  const [memberIcons, setMemberIcons] = useState([]);

  const onDelete = async () => {
    setThreads(null);
  };

  useEffect(() => {
    //todo  Replace 'userEmail' with the actual user's email address
    const userEmail = "user1@example.com";

    const fetchUserGroups = async () => {
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
      } catch (error) {
        console.error("Error fetching user groups:", error);
      }
    };

    fetchUserGroups();
  }, []);

  return (
    <Page>
      <h1>My Groups</h1>
      <div style={{ display: "flex", gap: "16px" }}>
        {userGroups.map((group, index) => (
          <GroupComponent
            key={index}
            handle={group.handle}
            title={group.name ?? ""}
            description={group.description ?? ""}
            buttonText="Leave"
            showButtonJoin={true}
            imageSrc={group?.icon ?? ""}
            avatarSrcList={[]}
          />
        ))}
      </div>
      <div style={{ marginTop: "20px" }}>
        <Divider />
      </div>

      <h1>Suggested</h1>
      <div style={{ display: "flex", gap: "16px" }}>
        {recommendedGroups.map((group, index) => (
          <GroupComponent
            key={index}
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

      {threads === null
        ? "Loading threads..."
        : threads.length === 0
        ? "No threads found"
        : threads.map((thread, index) => (
            <Thread key={index} thread={thread} onDelete={onDelete} />
          ))}
    </Page>
  );
};
