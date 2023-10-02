import React from 'react';
import Avatar from '@mui/joy/Avatar';
import { ListItem, List, Divider, ListItemButton } from '@mui/joy';
import Sheet from '@mui/joy/Sheet';
import GlobalStyles from "@mui/joy/GlobalStyles";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import Logo from "./Logo";
import { Link } from 'react-router-dom';
import Box from '@mui/joy/Box';
import { closeSidebar } from './Utils';
import { Icon } from "@src/shared/components/Icon/Icon";

export const NavBar: React.FC = () => {
    return (
        <React.Fragment>
        <Box
        sx={{
          position: 'fixed',
          zIndex: 9998,
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          opacity: 'var(--SideNavigation-slideIn)',
          backgroundColor: 'var(--joy-palette-background-backdrop)',
          transition: 'opacity 0.4s',
          transform: {
            xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--FirstSidebar-width, 0px)))',
            lg: 'translateX(-100%)',
          },
        }}
        onClick={() => closeSidebar()}
        />

        <Sheet
        className="NavBar"
        sx={{
            position: {
            xs: "fixed",
            md: "sticky"
            },
            transform: {
            xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))",
            md: "none"
            },
            transition: "transform 0.4s",
            zIndex: 10000,
            height: "97vh",
            width: "var(--NavBar-width)",
            top: 0,
            p: 2,
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
            borderRight: "1px solid",
            borderColor: "divider",
        }}
        >
        <GlobalStyles
            styles={{
            ":root": {
                "--NavBar-width": "40px"
            }
            }}
        />
        <Link to="/">
            <Logo sx={{
                paddingTop: "8px"
            }}/>
        </Link>
        <List size="md" sx={{ "--ListItem-radius": "6px", "--List-gap": "8px" }}>
            <ListItem>
                <ListItemButton
                    component={Link}
                    to="/"
                    selected={location.pathname === "/"}
                >
                    <HomeRoundedIcon />
                </ListItemButton>
            </ListItem>
            <ListItem>
                    <ListItemButton          
                        component={Link}
                        to="/search"
                        selected={location.pathname === "/search"}
                    >
                        <SearchRoundedIcon />
                    </ListItemButton>
            </ListItem>
        </List>
        <List
            sx={{
            size: "md",
            flexGrow: 0,
            "--ListItem-radius": "6px",
            "--List-gap": "8px"
            }}
        >
            <ListItem>
            <ListItemButton
                component={Link}
                to="/settings"
                selected={location.pathname === "/settings"}
            >
                <SettingsRoundedIcon/>
            </ListItemButton>
            </ListItem>
        </List>
        <Divider/>
        <Link to="/profile" style={{textDecoration: 'none'}}> 
            <Avatar>
                <Icon iconName="doughnut" />
            </Avatar>
        </Link>
        </Sheet>
        </React.Fragment>
    );
};

export default NavBar;
