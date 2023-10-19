import { Page } from "@src/shared/components/Page";
import { PageHeader } from "@src/shared/components/PageHeader";
import { useParams, useNavigate } from "react-router-dom";
import { TabMenu } from "./TabMenu";
import { useEffect, useState } from 'react';
import { groupService } from '@src/services/groupService';
import { GroupModel } from '@src/shared/models/GroupModel';
import { Typography, Button } from '@mui/joy'; 
import Avatar from '@mui/joy/Avatar';
import './Group.css';
import { StyledEngineProvider } from '@mui/material/styles';
import { Icon } from "@src/shared/components/Icon/Icon";
import Add from '@mui/icons-material/Add';
import { loginService } from "@src/services/loginService";
import { memberService } from "@src/services/memberService";
import { enqueueSnackbar } from "notistack";
import CloseIcon from '@mui/icons-material/Close';
import Dialog from "@src/shared/components/Dialog/Dialog";

export const Group = () => {
    const { handle } = useParams<{ handle: string}>();
    const [groupData, setGroupData] = useState<GroupModel | null>(null);
    const [joinLeaveText, setJoinLeaveText] = useState<string>("Join");
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleConfirm = () => {
        leave();
        handleCloseModal();
    };

    const join = async () => {        
        try {
            enqueueSnackbar("Loading..", {
                variant: 'info',
                anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'center',
                },
                autoHideDuration: 2000,
                style: {
                    fontFamily: 'Arial',
                },
            });
    
            await memberService.addMember(handle, loginService.getCookie("userEmail"), undefined, undefined, undefined, loginService.getCookie("userHandle"));
    
            enqueueSnackbar("Joined successfully.", {
                variant: 'success',
                anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'center',
                },
                autoHideDuration: 2000,
                style: {
                    fontFamily: 'Arial',
                },
            });
            setJoinLeaveText("Leave");
        } catch (error) {
            enqueueSnackbar("Error occured while joining the group.", {
                variant: 'error',
                anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'center',
                },
                autoHideDuration: 2000,
                style: {
                    fontFamily: 'Arial',
                },
            });
        }
        
    }

    const leave = async () => {        
        try {
            enqueueSnackbar("Loading..", {
                variant: 'info',
                anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'center',
                },
                autoHideDuration: 2000,
                style: {
                    fontFamily: 'Arial',
                },
            });
    
            await memberService.deleteMember(loginService.getCookie("userEmail"), handle);
    
            enqueueSnackbar("The group left successfully.", {
                variant: 'success',
                anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'center',
                },
                autoHideDuration: 2000,
                style: {
                    fontFamily: 'Arial',
                },
            });
            setJoinLeaveText("Join");
        } catch (error) {
            enqueueSnackbar("Error occured while leaving the group.", {
                variant: 'error',
                anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'center',
                },
                autoHideDuration: 2000,
                style: {
                    fontFamily: 'Arial',
                },
            });
        }
    }

    const onSettingsSaved = async () => {
        const groupDataResponse = await groupService.getGroup(handle);
        const groupPolicyData = await groupService.getGroupPolicy(handle);
        const updatedGroupData = {
            ...groupDataResponse,
            visibilityGuest: groupPolicyData.visibilityGuest,
            visibilityMember: groupPolicyData.visibilityMember,
        };

        setGroupData(updatedGroupData);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const groupDataResponse = await groupService.getGroup(handle);
                setGroupData(groupDataResponse);
    
                const groupPolicyData = await groupService.getGroupPolicy(handle);

                if (groupDataResponse) {
                    const updatedGroupData = {
                        ...groupDataResponse,
                        visibilityGuest: groupPolicyData.visibilityGuest,
                        visibilityMember: groupPolicyData.visibilityMember,
                    };
    
                    setGroupData(updatedGroupData);

                    if (loginService.getCookie("userEmail") !== null) {
                        const userInGroup = await memberService.userInGroup(loginService.getCookie("userEmail"), groupDataResponse.handle);
                        if (userInGroup) {
                            setJoinLeaveText("Leave");
                        }
                    }
                }
            } catch (error) {}
        };
    
        fetchData();
    }, []);

    return (
        <Page>
            <div className="contentPadding">
            <StyledEngineProvider injectFirst>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingRight: "10px" }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar>
                    <Icon iconName={groupData?.icon ? groupData.icon : ""} />
                    </Avatar>
                    <PageHeader text={groupData?.name} />
                </div>
                {loginService.getCookie("userEmail") ? 
                    <Button
                        color={joinLeaveText == "Join" ? "primary" : "danger"}
                        onClick={joinLeaveText == "Join" ? join : handleOpenModal}
                        variant="outlined"
                        startDecorator={joinLeaveText == "Join" ? <Add /> : <CloseIcon />}
                    >{joinLeaveText}</Button>
                    : null
                }
            </div>

                <Typography className="groupDescription" variant="subtitle1" color="textSecondary" style={{
                    whiteSpace: 'normal',
                    overflowWrap: 'break-word', 
                    wordWrap: 'break-word',     
                    maxWidth: '100%',
                }}>
                    {groupData?.description}
                </Typography>
                <TabMenu groupData={groupData} onSettingsSaved={onSettingsSaved} triggerUseEffect={joinLeaveText}/>
            </StyledEngineProvider>
            </div>

            <Dialog
                open={modalOpen}
                onClose={handleCloseModal}
                title="Confirmation"
                content="Are you sure you want to leave this group?"
                onConfirm={handleConfirm}
            />
        </Page>
    );
};
