import { Tabs, TabList, Tab, TabPanel } from "@mui/joy";
import SettingsTab from "./SettingsTab";
import GroupsTab from "./GroupsTab";
import PostsTab from "./PostsTab";
import { UserDetailModel } from "@src/shared/models/UserDetailModel";
import { UserPrivacySettingsModel } from "@src/shared/models/UserPrivacySettingsModel";
import { loginService } from "@src/services/loginService";

interface TabMenuProps {
  userDetailData?: UserDetailModel;
  userPrivacySettingsData?: UserPrivacySettingsModel;
  onSettingsSaved: () => void;
  showSettings: boolean;
}

const TabMenu: React.FC<TabMenuProps> = ({
  userDetailData,
  userPrivacySettingsData,
  onSettingsSaved,
  showSettings,
}) => {
  return (
    <Tabs orientation="horizontal" size="lg" defaultValue={1}>
      <TabList>
        <Tab variant="plain" color="neutral">
          Posts
        </Tab>
        <Tab variant="plain" color="neutral">
          Groups
        </Tab>
        {showSettings && (
          <Tab variant="plain" color="neutral">
            Settings
          </Tab>
        )}
      </TabList>
      <TabPanel value={0}>
        <PostsTab />
      </TabPanel>
      <TabPanel value={1}>
        <GroupsTab showLeave={showSettings}/>
      </TabPanel>
      {showSettings && (
        <TabPanel value={2}>
          <SettingsTab
            userDetailData={userDetailData}
            userPrivacySettingsData={userPrivacySettingsData}
            onSettingsSaved={onSettingsSaved}
          />
        </TabPanel>
      )}
    </Tabs>
  );
};

export default TabMenu;
