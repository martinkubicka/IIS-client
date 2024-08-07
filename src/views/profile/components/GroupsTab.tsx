/**
 * @file GroupsTab.tsx
 * @author { Matěj Macek (xmacek27) }
 * @date 17.12.2023
 * @brief Definition of Component for displaying user's groups
 */
import { TabPanel } from "@mui/joy";
import { groupService } from "@src/services/groupService";
import { loginService } from "@src/services/loginService";
import { GroupModel } from "@src/shared/models/GroupModel";
import GroupComponent from "@src/views/dashboard/components/GroupComponent";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface GroupsTabProps {
  showLeave: boolean;
}
const GroupsTab: React.FC<GroupsTabProps> = ({ showLeave }) => {
  const [userGroups, setUserGroups] = useState<GroupModel[]>([]);
  const handleMember = useParams<{ handle: string }>() ?? "";
  const userEmail = loginService.getCookie("userEmail") ?? "";
  const handle =
    handleMember.handle || loginService.getCookie("userHandle") || "";

  useEffect(() => {
    fetchUserGroups();
  }, []);

  const fetchUserGroups = async () => {
    if (handle !== "") {
      try {
        const joinedGroups = await groupService.getGroupsUserIsInByHandle(
          handle
        );
        setUserGroups(joinedGroups);
      } catch (error) {
        console.error("Error fetching user's groups:", error);
      }
    } else {
      try {
        const joinedGroups = await groupService.getGroupsUserIsIn(
          userEmail,
          true
        );
        setUserGroups(joinedGroups);
      } catch (error) {
        console.error("Error fetching user's groups:", error);
      }
    }
  };

  const onAction = () => {
    fetchUserGroups(); // Update userGroups and recommendedGroups
  };

  const groupContainerStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    gap: "20px",
  };

  return (
    <TabPanel value={1}>
      <div style={groupContainerStyle}>
        {userGroups.map((group, index) => (
          <GroupComponent
            key={index}
            UserEmail={userEmail}
            handle={group.handle}
            title={group.name ?? ""}
            description={group.description ?? ""}
            buttonText={showLeave ? "Leave" : ""}
            imageSrc={group.icon as string}
            name=""
            onAction={onAction} // Pass the onAction callback
          />
        ))}
      </div>
    </TabPanel>
  );
};

export default GroupsTab;
