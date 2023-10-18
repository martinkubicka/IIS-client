// Profile.tsx
import { Page } from "@src/shared/components/Page";
import { Avatar } from "@mui/joy";
import { Icon } from "@src/shared/components/Icon/Icon";
import TabMenu from "./TabMenuProfile";
import { UserDetailModel } from "@src/shared/models/UserDetailModel";
import { useEffect, useState } from "react";
import { userService } from "@src/services/userService";
import { PageHeader } from "@src/shared/components/PageHeader";
import { UserPrivacySettingsModel } from "@src/shared/models/UserPrivacySettingsModel";
import { loginService } from "@src/services/loginService";

export const Profile = () => {
  const [userDetailData, setUserDetailData] = useState<UserDetailModel | null>(
    null
  );
  const [userPrivacySettingsData, setUserPrivacyData] =
    useState<UserPrivacySettingsModel | null>(null);
  const userEmail = loginService.getCookie("userEmail") ?? "";
  const handle = loginService.getCookie("userHandle") ?? "";

  const onSettingsSaved = async () => {
    const updatedUserData = await userService.getUser(handle);
    const updatedUserDetailDataResponse: UserDetailModel = {
      name: updatedUserData.name,
      icon: updatedUserData.icon,
      handle: updatedUserData.handle,
      role: updatedUserData.role,
      email: userEmail,
    };
    const updatedPrivacyDataResponse = await userService.getPrivacy(handle);

    setUserDetailData(updatedUserDetailDataResponse);
    setUserPrivacyData(updatedPrivacyDataResponse);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userProfileDataResponse = await userService.getUser(handle);
        const userDetailDataResponse: UserDetailModel = {
          name: userProfileDataResponse.name,
          icon: userProfileDataResponse.icon,
          handle: userProfileDataResponse.handle,
          role: userProfileDataResponse.role,
          email: userEmail,
        };
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
      <Avatar sx={{ width: 250, height: 250, marginBottom: 5 }}>
        <Icon
          iconName={
            userDetailData?.icon != null ? userDetailData?.icon : "doughnut"
          }
          size={100}
        />
      </Avatar>
      <PageHeader text={userDetailData?.name} />
      <TabMenu
        userDetailData={userDetailData}
        userPrivacySettingsData={userPrivacySettingsData}
        onSettingsSaved={onSettingsSaved}
      />
    </Page>
  );
};
