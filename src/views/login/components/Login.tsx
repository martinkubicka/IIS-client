/**
 * @file Login.tsx
 * @author { Martin Kubicka (xkubic45) }
 * @date 17.12.2023
 * @brief Definition of login page base component
 */

import { Box, Tab, TabList, TabPanel, Tabs } from "@mui/joy";
import { Page } from "@src/shared/components/Page";
import { useState } from "react";
import { RegisterForm } from "..";
import { LoginForm } from "./LoginForm";
import "./loginstyles.css";

export const Login = () => {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <Page>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100%"
      >
        <div className="formWidth">
          <Tabs
            orientation="horizontal"
            size="lg"
            value={tabIndex}
            onChange={(event, newValue) => setTabIndex(newValue)}
          >
            <TabList>
              <Tab variant="plain" color="neutral">
                Sign in
              </Tab>
              <Tab variant="plain" color="neutral">
                Sign up
              </Tab>
            </TabList>

            <TabPanel value={0}>
              <LoginForm />
            </TabPanel>
            <TabPanel value={1}>
              <RegisterForm setTabIndex={setTabIndex} />
            </TabPanel>
          </Tabs>
        </div>
      </Box>
    </Page>
  );
};
