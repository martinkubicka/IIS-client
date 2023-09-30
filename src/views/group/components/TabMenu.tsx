import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import { Thread } from '@src/shared/components/Threads';
import { GroupSettings } from './GroupSettings';
import { GroupModel } from '@src/shared/models/GroupModel';

interface TabMenuProps {
    groupData?: GroupModel;
}

export const TabMenu: React.FC<TabMenuProps> = ({ groupData })=> {
    return (
        <Tabs orientation="horizontal" size="lg" defaultValue={0}>
        <TabList>
            <Tab variant="plain" color="neutral">Threads</Tab>
            <Tab variant="plain" color="neutral">Members</Tab>
            <Tab variant="plain" color="neutral">Settings</Tab>
        </TabList>
        
        <TabPanel value={0}>
            <Thread />
        </TabPanel>
        <TabPanel value={1}>
            <b>TODO USER COMPONENT</b>
        </TabPanel>
        <TabPanel value={2}>
            <GroupSettings groupData={groupData} />
        </TabPanel>

        </Tabs>
    );
};
