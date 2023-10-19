import React, { useEffect, useState } from "react";
import { GroupModel } from "@src/shared/models/GroupModel";
import { groupService } from "@src/services/groupService";
import GroupComponent from "@src/views/dashboard/components/GroupComponent";
import { TabPanel } from "@mui/joy";
import { loginService } from "@src/services/loginService";
interface GroupsTabProps {
  showLeave: boolean;
}
const GroupsTab: React.FC<GroupsTabProps> = ({ showLeave }) => {
  const [userGroups, setUserGroups] = useState<GroupModel[]>([]);
  const userEmail = loginService.getCookie("userEmail") ?? "";

  useEffect(() => {
    fetchUserGroups();
  }, []);

  const fetchUserGroups = async () => {
    try {
      const joinedGroups = await groupService.getGroupsUserIsIn(
        userEmail,
        true
      );
      setUserGroups(joinedGroups);
    } catch (error) {
      console.error("Error fetching user's groups:", error);
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
