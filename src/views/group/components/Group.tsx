import { Page } from "@src/shared/components/Page";
import { PageHeader } from "@src/shared/components/PageHeader";
import { useParams, useNavigate } from "react-router-dom";
import { TabMenu } from "./TabMenu";
import { useEffect, useState } from 'react';
import { groupService } from '@src/services/groupService';
import { GroupModel } from '@src/shared/models/GroupModel';
import { Typography } from '@mui/material'; 
import Avatar from '@mui/joy/Avatar';
import './Group.css';
import { StyledEngineProvider } from '@mui/material/styles';

export const Group = () => {
    const { handle } = useParams<{ handle: string}>();
    const [groupData, setGroupData] = useState<GroupModel | null>(null);
    const navigate = useNavigate();

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
            <StyledEngineProvider injectFirst>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar variant="outlined" size="sm" src="/static/images/avatar/3.jpg" 
                    sx={{
                        marginTop: "16px",
                        marginBottom: "16px"
                    }}/>
                    <PageHeader text={groupData?.name} />
                </div>

                <Typography className="groupDescription" variant="subtitle1" color="textSecondary">
                    {groupData?.description}
                </Typography>
                <TabMenu groupData={groupData}/>
            </StyledEngineProvider>
        </Page>
    );
};
