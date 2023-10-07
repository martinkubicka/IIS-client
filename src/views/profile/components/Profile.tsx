// Profile.tsx
import { Page } from "@src/shared/components/Page";
import { Avatar, Tabs, TabList, Tab } from "@mui/joy";
import { Icon } from "@src/shared/components/Icon/Icon";
import TabMenu from "./TabMenuProfile";
import { UserDetailModel } from "@src/shared/models/UserDetailModel";
import { useEffect, useState } from "react";
import { userService } from "@src/services/userService";
import { StyledEngineProvider } from "@mui/material/styles";
import { PageHeader } from "@src/shared/components/PageHeader";
import { UserPrivacySettingsModel } from "@src/shared/models/UserPrivacySettingsModel";

export const Profile = () => {
  const [userDetailData, setUserDetailData] = useState<UserDetailModel | null>(
    null
  );
  const [userPrivacySettingsData, setUserPrivacyData] =
    useState<UserPrivacySettingsModel | null>(null);

  const onSettingsSaved = async () => {
    const updatedUserData = await userService.getUser("user1");
    const updatedPrivacyData = await userService.getPrivacy("user1");

    setUserDetailData(updatedUserData);
    setUserPrivacyData(updatedPrivacyData);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const handle = "user1"; // TODO: Get from URL

        const userDetailDataResponse = await userService.getUser(handle);
        setUserDetailData(userDetailDataResponse);

        const userPrivacyDataResponse = await userService.getPrivacy(handle);
        setUserPrivacyData(userPrivacyDataResponse);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <Page>
      <StyledEngineProvider injectFirst>
        <Avatar
          alt="Remy Sharp"
          sx={{ width: 250, height: 250, marginBottom: 5 }}
        >
          <Icon iconName={""} />
        </Avatar>
        <PageHeader text={userDetailData?.name} />
        <TabMenu
          userDetailData={userDetailData}
          userPrivacySettingsData={userPrivacySettingsData}
          onSettingsSaved={onSettingsSaved}
        />
      </StyledEngineProvider>
    </Page>
  );
};
