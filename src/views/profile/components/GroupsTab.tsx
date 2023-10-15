import React, { useEffect, useState } from "react";
import { GroupModel } from "@src/shared/models/GroupModel";
import { groupService } from "@src/services/groupService";
import GroupComponent from "@src/views/dashboard/components/GroupComponent";
import { TabPanel } from "@mui/joy";
import { loginService } from "@src/services/loginService";
const GroupsTab = () => {
  const [userGroups, setUserGroups] = useState<GroupModel[]>([]);
  const userEmail = loginService.getCookie("userEmail") ?? "";

  useEffect(() => {
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

    fetchUserGroups();
  }, []);

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
            buttonText="Leave"
            showButtonJoin={true}
            imageSrc={group.icon as string}
            avatarSrcList={[]}
            name=""
          />
        ))}
      </div>
    </TabPanel>
  );
};

export default GroupsTab;
