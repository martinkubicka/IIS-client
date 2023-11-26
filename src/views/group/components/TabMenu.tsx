import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";
import { GroupSettings } from "./GroupSettings";
import { GroupModel } from "@src/shared/models/GroupModel";
import { GroupThreads } from "./GroupThreads";
import { GroupMembers } from "./GroupMembers";
import { useEffect, useState } from "react";
import { loginService } from "@src/services/loginService";
import Role from "@src/enums/Role";
import GroupRole from "@src/enums/GroupRole";
import { memberService } from "@src/services/memberService";

interface TabMenuProps {
  groupData?: GroupModel;
  onSettingsSaved: () => void;
  triggerUseEffect?: string;
}

export const TabMenu: React.FC<TabMenuProps> = ({
  groupData,
  onSettingsSaved,
  triggerUseEffect,
}) => {
  const [isVisibleSettings, setIsVisibleSettings] = useState(false);
  const [isVisibleMembers, setIsVisibleMembers] = useState(false);

  useEffect(() => {
    const getPermissions = async () => {
      if (groupData) {
        const role = await memberService.getMemberRole(
          loginService.getCookie("userEmail"),
          groupData?.handle
        );

        if (
          groupData?.visibilityGuest ||
          (groupData?.visibilityMember && role !== "" && role != undefined) ||
          loginService.getCookie("userRole") == Role.admin ||
          (role !== "" && role == GroupRole.admin)
        ) {
          setIsVisibleMembers(true);
        } else {
          setIsVisibleMembers(false);
        }

        if (
          loginService.getCookie("userRole") == Role.admin ||
          (role !== "" && role == GroupRole.admin)
        ) {
          setIsVisibleSettings(true);
        } else {
          setIsVisibleSettings(false);
        }
      }
    };

    getPermissions();
  }, [groupData, triggerUseEffect]);

  return (
    <Tabs orientation="horizontal" size="lg" defaultValue={0}>
      <TabList>
        <Tab variant="plain" color="neutral">
          Threads
        </Tab>
        {isVisibleMembers ? (
          <Tab variant="plain" color="neutral">
            Members
          </Tab>
        ) : null}
        {isVisibleSettings ? (
          <Tab variant="plain" color="neutral">
            Settings
          </Tab>
        ) : null}
      </TabList>

      <TabPanel value={0}>
        <GroupThreads
          groupData={groupData}
          triggerUseEffect={triggerUseEffect}
        />
      </TabPanel>

      {isVisibleMembers ? (
        <TabPanel value={1}>
          <GroupMembers
            groupData={groupData}
            isVisibleMembers={isVisibleMembers}
            triggerUseEffect={triggerUseEffect}
          />
        </TabPanel>
      ) : null}

      {isVisibleSettings ? (
        <TabPanel value={2}>
          <GroupSettings
            groupData={groupData}
            onSettingsSaved={onSettingsSaved}
          />
        </TabPanel>
      ) : null}
    </Tabs>
  );
};
