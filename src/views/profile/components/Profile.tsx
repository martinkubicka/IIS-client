// Profile.tsx
import { Page } from "@src/shared/components/Page";
import { Avatar, Skeleton, Button } from "@mui/joy";
import { Icon } from "@src/shared/components/Icon/Icon";
import TabMenu from "./TabMenuProfile";
import PermissionDenied from "./PermissionDenied";

import { useParams } from "react-router-dom";

import { UserDetailModel } from "@src/shared/models/UserDetailModel";
import { useEffect, useState } from "react";
import { userService } from "@src/services/userService";
import { PageHeader } from "@src/shared/components/PageHeader";
import { UserPrivacySettingsModel } from "@src/shared/models/UserPrivacySettingsModel";
import { loginService } from "@src/services/loginService";
import { Link } from "react-router-dom";
import { groupService } from "@src/services/groupService";

export const Profile = () => {
  const [userDetailData, setUserDetailData] = useState<UserDetailModel | null>(
    null
  );
  const [userPrivacySettingsData, setUserPrivacyData] =
    useState<UserPrivacySettingsModel | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showRestrictedContent, setShowRestrictedContent] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const handleMember = useParams<{ handle: string }>() ?? "";
  const userEmail = loginService.getCookie("userEmail") ?? "";
  const handle =
    handleMember.handle || loginService.getCookie("userHandle") || "";
  const userHandle = loginService.getCookie("userHandle") || "";
  const [memberPrivacy, setMemberPrivacy] =
    useState<UserPrivacySettingsModel | null>(null);
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

        if (handleMember && handleMember.handle !== userHandle) {
          const memberPrivacyDataResponse = await userService.getPrivacy(
            handleMember.handle
          );
          setMemberPrivacy(memberPrivacyDataResponse);
        }

        if (handleMember && handleMember.handle !== userHandle) {
          if (memberPrivacy?.visibilityGuest === false && userHandle === "") {
            setShowRestrictedContent(true);
            setErrorMessage(
              "Sorry, you don't have permission to view this profile. Only registered accounts have access to this profile."
            );
          }

          if (
            memberPrivacy?.visibilityRegistered === false &&
            userHandle !== ""
          ) {
            setShowRestrictedContent(true);
            setErrorMessage(
              "Sorry, you don't have permission to view this profile. Only registered accounts have access to this profile."
            );
          }

          if (memberPrivacy?.visibilityGroup === false) {
            if (userHandle !== "") {
              try {
                const userGroups = await groupService.getGroupsUserIsInByHandle(
                  userHandle
                );
                const profileUserGroups =
                  await groupService.getGroupsUserIsInByHandle(
                    handleMember.handle
                  );

                const hasCommonGroup = userGroups.some((userGroup) =>
                  profileUserGroups.some(
                    (profileGroup) => userGroup.handle === profileGroup.handle
                  )
                );

                if (!hasCommonGroup) {
                  setShowRestrictedContent(true);
                  setErrorMessage(
                    "Sorry, you don't have permission to view this profile. Only members of the same group have access to this profile."
                  );
                }
              } catch (error) {
                console.error("Error fetching user groups:", error);
              }
            }
          }
        }
        setIsLoading(false); // Move this line inside the try block just before the function ends
      } catch (error) {
        console.log(error);
        setIsLoading(false); // Move this line inside the try block just before the function ends
      }
    };

    fetchData();
  }, [userHandle, handleMember, handle, userEmail, memberPrivacy]);

  if (isLoading) {
    // Display a loading indicator while data is being fetched
    return (
      <Page>
        <Skeleton
          variant="rectangular"
          width={250}
          height={250}
          sx={{ marginBottom: 5 }}
        />
        <Skeleton
          variant="text"
          width={200}
          height={40}
          sx={{ marginBottom: 2 }}
        />
        <Skeleton variant="text" width={300} height={20} />
        <Skeleton variant="text" width={150} height={20} />
        <Skeleton variant="text" width={300} height={20} />
        <Skeleton variant="text" width={300} height={20} />
        <Skeleton variant="text" width={300} height={20} />
        <Skeleton variant="text" width={300} height={20} />
        <Skeleton variant="text" width={300} height={20} />
      </Page>
    );
  }

  if (showRestrictedContent) {
    return <PermissionDenied errorMessage={errorMessage}></PermissionDenied>;
  }

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
        showSettings={handle === loginService.getCookie("userHandle")}
      />
    </Page>
  );
};
