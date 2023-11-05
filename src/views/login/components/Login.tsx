import { Page } from "@src/shared/components/Page";
import { Tabs, TabList, Tab, TabPanel, Box } from '@mui/joy';
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "..";
import { useState } from "react";

export const Login = () => {
    const [tabIndex, setTabIndex] = useState(0);

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
                <Tabs orientation="horizontal" size="lg" value={tabIndex} onChange={(event, newValue) => setTabIndex(newValue)}>
                <TabList>
                    <Tab variant="plain" color="neutral">Sign in</Tab>
                    <Tab variant="plain" color="neutral">Sign up</Tab>
                </TabList>
                
                <TabPanel value={0}>
                    <LoginForm />
                </TabPanel>
                <TabPanel value={1}>
                    <RegisterForm setTabIndex={setTabIndex}/>
                </TabPanel>
                </Tabs>
            </div>
            </Box>
        </Page>
    );
};
