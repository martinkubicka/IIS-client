import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { Button, Divider, IconButton, Stack, Typography } from "@mui/joy";
import { Box } from "@mui/material";
import { groupService } from "@src/services/groupService";
import { loginService } from "@src/services/loginService";
import { threadService } from "@src/services/threadService";
import { Page } from "@src/shared/components/Page";
import { Thread } from "@src/shared/components/Threads";
import { GroupModel } from "@src/shared/models/GroupModel";
import { ThreadModel } from "@src/shared/models/ThreadModel";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import GroupComponent from "./GroupComponent";
import NewGroup from "./NewGroup";

export const Dashboard = () => {
  const [userGroups, setUserGroups] = useState<GroupModel[]>([]);
  const [recommendedGroups, setRecommendedGroups] = useState<GroupModel[]>([]);
  const [threads, setThreads] = useState<ThreadModel[] | null>(null);
  const userEmail = loginService.getCookie("userEmail") ?? "";
  const name = loginService.getCookie("userHandle") ?? "";

  // groups scroll
  const sidePanelWidth = 150;
  const availableWidth = "100%";
  const contentAreaWidth = `calc(${availableWidth} - ${sidePanelWidth}px)`;
  const groupContainerRef = useRef<HTMLDivElement>(null);
  const gapBetweenCards = 30; // Gap between each group card

  // recommended groups scroll
  const recommendedGroupsContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (scrollOffset: number) => {
    if (groupContainerRef.current) {
      if (scrollOffset === -1) {
        groupContainerRef.current.scrollLeft -=
          groupContainerRef.current.offsetWidth;
      } else {
        groupContainerRef.current.scrollLeft +=
          groupContainerRef.current.offsetWidth;
      }
    }
  };

  const handleRecommendedGroupsScroll = (scrollOffset: number) => {
    if (recommendedGroupsContainerRef.current) {
      if (scrollOffset === -1) {
        recommendedGroupsContainerRef.current.scrollLeft -=
          recommendedGroupsContainerRef.current.offsetWidth;
      } else {
        recommendedGroupsContainerRef.current.scrollLeft +=
          recommendedGroupsContainerRef.current.offsetWidth;
      }
    }
  };

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
        setUserGroups(joinedGroups);

        // Fetch recommended groups (groups where the user is not joined)
        const recommendedGroups = await groupService.getGroupsUserIsIn(
          userEmail,
          false
        );
        setRecommendedGroups(recommendedGroups);

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

  if (userEmail === "") {
    return (
      <Page>
        <Typography level="h1" fontSize="x2" marginBottom="10px">
          Suggested
        </Typography>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "flex-start",
            gap: "20px",
          }}
        >
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
      <div style={{ display: "flex", width: availableWidth }}>
        <div style={{ width: contentAreaWidth }}>
          <Page>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                maxWidth: "100%",
              }}
            >
              <Typography level="h1" fontSize="x2" marginBottom="10px">
                My Groups
              </Typography>
              <Link to="/profile">
                <Button
                  endDecorator={<KeyboardArrowRight />}
                  color="neutral"
                  sx={{ right: "60px" }}
                >
                  Show All My Groups
                </Button>
              </Link>
            </div>
            <Stack
              direction="row"
              gap="20px"
              marginBottom="20px"
              height="300px"
              sx={{ alignItems: "center" }}
            >
              <NewGroup onGroupCreated={onGroupCreated} />

              <IconButton
                size="lg"
                variant="plain"
                onClick={() => handleScroll(-1)}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#000")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#fff")}
                style={{
                  left: "15px",
                  zIndex: 1,
                  color: "#fff",
                }}
              >
                <Box sx={{ fontSize: 32 }}>
                  <KeyboardArrowLeft />
                </Box>
              </IconButton>
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "300px",
                  overflow: "hidden",
                  maxWidth: "100%",
                }}
              >
                <div
                  ref={groupContainerRef}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: `${gapBetweenCards}px`,
                    height: "100%",
                    overflowX: "hidden", // Hide horizontal scrollbar
                    overflowY: "hidden", // Hide vertical scrollbar
                    scrollBehavior: "smooth",
                    scrollSnapType: "x mandatory",
                  }}
                >
                  <div style={{ width: "100px" }}></div>

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
              </div>
              <IconButton
                size="lg"
                variant="plain"
                onClick={() => handleScroll(1)}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#000")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#fff")}
                style={{
                  right: "10px",
                  zIndex: 1,
                  color: "#fff",
                }}
              >
                <Box sx={{ fontSize: 32 }}>
                  <KeyboardArrowRight />
                </Box>
              </IconButton>
            </Stack>
            <div style={{ marginTop: "50px", marginBottom: "30px" }}>
              <Divider />
            </div>
            <Typography level="h1" fontSize="x2" marginBottom="10px">
              Suggested
            </Typography>
            <Stack
              direction="row"
              gap="20px"
              marginBottom="20px"
              height="300px"
              sx={{ alignItems: "center" }}
            >
              <IconButton
                size="lg"
                variant="plain"
                onClick={() => handleRecommendedGroupsScroll(-1)}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#000")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#fff")}
                style={{
                  left: "15px",
                  zIndex: 1,
                  color: "#fff",
                }}
              >
                <Box sx={{ fontSize: 32 }}>
                  <KeyboardArrowLeft />
                </Box>
              </IconButton>
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "300px",
                  overflow: "hidden",
                  maxWidth: "100%",
                }}
              >
                <div
                  ref={recommendedGroupsContainerRef}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: `${gapBetweenCards}px`,
                    height: "100%",
                    overflowX: "hidden",
                    overflowY: "hidden",
                    scrollBehavior: "smooth",
                    scrollSnapType: "x mandatory",
                  }}
                >
                  <div style={{ width: "100px" }}></div>
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
              </div>
              <IconButton
                size="lg"
                variant="plain"
                onClick={() => handleRecommendedGroupsScroll(1)}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#000")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#fff")}
                style={{
                  right: "10px",
                  zIndex: 1,
                  color: "#fff",
                }}
              >
                <Box sx={{ fontSize: 32 }}>
                  <KeyboardArrowRight />
                </Box>
              </IconButton>
            </Stack>

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
        </div>
      </div>
    );
  }
};
