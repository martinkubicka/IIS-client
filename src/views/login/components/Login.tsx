import { Page } from "@src/shared/components/Page";
import { Tabs, TabList, Tab, TabPanel, Box } from '@mui/joy';
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "..";

export const Login = () => {
    return (
        <Page>
             <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                height="100vh"
                >
            <div
                style={{
                width: '50%',   
                }}
            >
                <Tabs orientation="horizontal" size="lg" defaultValue={0}>
                <TabList>
                    <Tab variant="plain" color="neutral">Sign in</Tab>
                    <Tab variant="plain" color="neutral">Sign up</Tab>
                </TabList>
                
                <TabPanel value={0}>
                    <LoginForm />
                </TabPanel>
                <TabPanel value={1}>
                    <RegisterForm />
                </TabPanel>
                </Tabs>
            </div>
            </Box>
        </Page>
    );
};
