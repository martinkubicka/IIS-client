import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import { Thread } from '@src/shared/components/Threads';
import { GroupSettings } from './GroupSettings';
import { GroupModel } from '@src/shared/models/GroupModel';
import { GroupThreads } from './GroupThreads';
import { GroupMembers } from './GroupMembers';

interface TabMenuProps {
    groupData?: GroupModel;
    onSettingsSaved: () => void;
}

export const TabMenu: React.FC<TabMenuProps> = ({ groupData, onSettingsSaved })=> {
    return (
        <Tabs orientation="horizontal" size="lg" defaultValue={0}>
        <TabList>
            <Tab variant="plain" color="neutral">Threads</Tab>
            <Tab variant="plain" color="neutral">Members</Tab>
            <Tab variant="plain" color="neutral">Settings</Tab>
        </TabList>
        
        <TabPanel value={0}>
            <GroupThreads groupData={groupData}/>
        </TabPanel>
        <TabPanel value={1}>
            <GroupMembers groupData={groupData}/>
        </TabPanel>
        <TabPanel value={2}>
            <GroupSettings groupData={groupData} onSettingsSaved={onSettingsSaved}/>
        </TabPanel>

        </Tabs>
    );
};
