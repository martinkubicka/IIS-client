import { useEffect, useState } from "react";
import { Page } from "@src/shared/components/Page";
import GroupComponent from "./GroupComponent";
import { Divider, Typography, Button } from "@mui/joy";
import { groupService } from "@src/services/groupService";
import { loginService } from "@src/services/loginService";
import { GroupModel } from "@src/shared/models/GroupModel";
import { Thread } from "@src/shared/components/Threads";
import { ThreadModel } from "@src/shared/models/ThreadModel";
import { threadService } from "@src/services/threadService";
import NewGroup from "./NewGroup";
import { KeyboardArrowRight } from "@mui/icons-material";
import { Link } from "react-router-dom"; // Assuming you are using React Router for navigation

export const Dashboard = () => {
  const [userGroups, setUserGroups] = useState<GroupModel[]>([]);
  const [recommendedGroups, setRecommendedGroups] = useState<GroupModel[]>([]);
  const [threads, setThreads] = useState<ThreadModel[] | null>(null);
  const userEmail = loginService.getCookie("userEmail") ?? "";
  const name = loginService.getCookie("userHandle") ?? "";

  const onDelete = async () => {
    setThreads(null);
  };

  useEffect(() => {
    fetchUserGroupsAndThreads();
  }, [userEmail, name]);

  // Define the onAction callback function to update groups
  const onAction = () => {
    fetchUserGroupsAndThreads(); // Update userGroups and recommendedGroups
  };

  const fetchUserGroupsAndThreads = async () => {
    try {
      if (userEmail !== "") {
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
        setRecommendedGroups(recommendedGroups.slice(0, 6)); // Only get the first 5 recommended groups

        // Fetch all threads the user is in
        const allThreads = await threadService.getAllThreadsUserIsIn(userEmail);
        setThreads(allThreads); // Set the threads in the state}
      } else {
        // User is not logged in
        const recommendedGroups = await groupService.getAllGroups();
        setRecommendedGroups(recommendedGroups);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const onGroupCreated = async () => {
    fetchUserGroupsAndThreads();
  };

  const groupContainerStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    gap: "20px",
  };

  if (userEmail === "") {
    return (
      <Page>
        <Typography level="h1" fontSize="x2" marginBottom="10px">
          Suggested
        </Typography>
        <div style={groupContainerStyle}>
          {recommendedGroups.map((group, index) => (
            <GroupComponent
              key={index}
              UserEmail={userEmail}
              handle={group.handle}
              title={group.name ?? ""}
              description={group.description ?? ""}
              buttonText=""
              imageSrc={group.icon as string}
              name=""
              onAction={onAction} // Pass the onAction callback
            />
          ))}
        </div>
      </Page>
    );
  } else {
    return (
      <Page>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography level="h1" fontSize="x2" marginBottom="10px">
            My Groups
          </Typography>
          <Link to="/profile">
            <Button endDecorator={<KeyboardArrowRight />} color="neutral">
              Show All My Groups
            </Button>
          </Link>
          {/* <CreateGroupButton onGroupCreated={onGroupCreated} /> */}
        </div>
        <div style={{ display: "flex", gap: "13px", height: "225px" }}>
          <NewGroup onGroupCreated={onGroupCreated} />
          {userGroups.map((group, index) => (
            <GroupComponent
              key={index}
              UserEmail={userEmail}
              handle={group.handle}
              title={group.name ?? ""}
              description={group.description ?? ""}
              buttonText="Leave"
              imageSrc={group.icon as string}
              name=""
              onAction={onAction} // Pass the onAction callback
            />
          ))}
        </div>
        <div style={{ marginTop: "50px", marginBottom: "30px" }}>
          <Divider />
        </div>
        <Typography level="h1" fontSize="x2" marginBottom="10px">
          Suggested
        </Typography>
        <div style={{ display: "flex", gap: "13px", height: "225px" }}>
          {recommendedGroups.map((group, index) => (
            <GroupComponent
              key={index}
              UserEmail={userEmail}
              handle={group.handle}
              title={group.name ?? ""}
              description={group.description ?? ""}
              buttonText="Join"
              imageSrc={group.icon as string}
              name={name}
              onAction={onAction} // Pass the onAction callback
            />
          ))}
        </div>
        <div style={{ marginTop: "50px", marginBottom: "50px" }}>
          <Divider />
        </div>

        {threads === null ? (
          "Loading threads..."
        ) : threads.length === 0 ? (
          "No threads found"
        ) : (
          <div>
            <Typography level="h1" fontSize="x2" marginBottom="10px">
              Threads
            </Typography>
            {threads.map((thread, index) => (
              <Thread key={index} thread={thread} onDelete={onDelete} />
            ))}
          </div>
        )}
      </Page>
    );
  }
};
