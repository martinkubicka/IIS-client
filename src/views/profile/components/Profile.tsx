// Profile.tsx
import { Page } from "@src/shared/components/Page";
import { Avatar, Skeleton } from "@mui/joy";
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
        // not registered user
        if (handleMember.handle) {
          const memberPrivacyDataResponse = await userService.getPrivacy(
            handleMember.handle
          );
          setMemberPrivacy(memberPrivacyDataResponse);

          if (handleMember && handleMember.handle !== userHandle) {
            if (memberPrivacy?.visibilityGuest === false && userHandle === "") {
              setShowRestrictedContent(true);
              setErrorMessage(
                "Sorry, you don't have permission to view this profile. Only registered accounts have access to this profile."
              );
            }

            if (
              memberPrivacy?.visibilityRegistered === false &&
              userHandle !== "" &&
              showRestrictedContent === false
            ) {
              setShowRestrictedContent(true);
              setErrorMessage(
                "Sorry, you don't have permission to view this profile. The registred accounts doesn't have access to this profile."
              );
            }

            if (
              memberPrivacy?.visibilityGroup === false &&
              showRestrictedContent === false
            ) {
              if (userHandle !== "") {
                try {
                  const userGroups =
                    await groupService.getGroupsUserIsInByHandle(userHandle);
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
              } else {
                setShowRestrictedContent(true);
                setErrorMessage(
                  "Sorry, you don't have permission to view this profile. Only Registred users who are in the same groups have access to this profile."
                );
              }
            }
          }
        }

        if (showRestrictedContent === false) {
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
        }

        // wait 2 sec and then set isLoading to false becouse we dont want to show user without permission to see profile
        const timer = setTimeout(() => {
          setIsLoading(false);
        }, 500);

        return () => clearTimeout(timer);
      } catch (error) {
        setShowRestrictedContent(true);
        setErrorMessage("Sorry, some problems come when loading profile.");
        setIsLoading(false);
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
  } else if (showRestrictedContent) {
    return <PermissionDenied errorMessage={errorMessage}></PermissionDenied>;
  } else if (
    userDetailData != null ||
    userPrivacySettingsData != null ||
    isLoading === false ||
    showRestrictedContent === false
  ) {
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
          userHandle={handle}
        />
      </Page>
    );
  }
};
