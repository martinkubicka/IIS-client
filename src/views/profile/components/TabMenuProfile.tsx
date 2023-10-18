import { Tabs, TabList, Tab, TabPanel } from "@mui/joy";
import SettingsTab from "./SettingsTab";
import GroupsTab from "./GroupsTab";
import PostsTab from "./PostsTab";
import { UserDetailModel } from "@src/shared/models/UserDetailModel";
import { UserPrivacySettingsModel } from "@src/shared/models/UserPrivacySettingsModel";
import { useLocation } from "react-router-dom";

interface TabMenuProps {
  userDetailData?: UserDetailModel;
  userPrivacySettingsData?: UserPrivacySettingsModel;
  onSettingsSaved: () => void;
}

const TabMenu: React.FC<TabMenuProps> = ({
  userDetailData,
  userPrivacySettingsData,
  onSettingsSaved,
}) => {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const activeTab = parseInt(queryParams.get("activeTab") || "0");

  return (
    <Tabs orientation="horizontal" size="lg" defaultValue={activeTab}>
      <TabList>
        <Tab variant="plain" color="neutral">Posts</Tab>
        <Tab variant="plain" color="neutral">Groups</Tab>
        <Tab variant="plain" color="neutral">Settings</Tab>
      </TabList>
      <TabPanel value={0}>
        <PostsTab />
      </TabPanel>
      <TabPanel value={1}>
        <GroupsTab />
      </TabPanel>
      <TabPanel value={2}>
        <SettingsTab
          userDetailData={userDetailData}
          userPrivacySettingsData={userPrivacySettingsData}
          onSettingsSaved={onSettingsSaved}
        />
      </TabPanel>
    </Tabs>
  );
};

export default TabMenu;
