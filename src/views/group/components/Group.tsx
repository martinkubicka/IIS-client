import { Page } from "@src/shared/components/Page";
import { PageHeader } from "@src/shared/components/PageHeader";
import { useParams, useNavigate } from "react-router-dom";
import { TabMenu } from "./TabMenu";
import { useEffect, useState } from 'react';
import { groupService } from '@src/services/groupService';
import { GroupModel } from '@src/shared/models/GroupModel';
import { Typography } from '@mui/joy'; 
import Avatar from '@mui/joy/Avatar';
import './Group.css';
import { StyledEngineProvider } from '@mui/material/styles';
import { Icon } from "@src/shared/components/Icon/Icon";

export const Group = () => {
    const { handle } = useParams<{ handle: string}>();
    const [groupData, setGroupData] = useState<GroupModel | null>(null);
    const navigate = useNavigate();

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
                }
            } catch (error) {
                navigate('/notfound');
            }
        };
    
        fetchData();
    }, []);

    return (
        <Page>
            <div className="contentPadding">
            <StyledEngineProvider injectFirst>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                <Avatar>
                    <Icon iconName={groupData?.icon ? groupData?.icon : "doughnut"} />
                </Avatar>
                    <PageHeader text={groupData?.name} />
                </div>

                <Typography className="groupDescription" variant="subtitle1" color="textSecondary" style={{
                    whiteSpace: 'normal',
                    overflowWrap: 'break-word', 
                    wordWrap: 'break-word',     
                    maxWidth: '100%',
                }}>
                    {groupData?.description}
                </Typography>
                <TabMenu groupData={groupData} onSettingsSaved={onSettingsSaved}/>
            </StyledEngineProvider>
            </div>
        </Page>
    );
};
