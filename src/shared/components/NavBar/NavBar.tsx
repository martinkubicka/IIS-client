import React, { useEffect, useState } from "react";
import Avatar from "@mui/joy/Avatar";
import { ListItem, List, Divider, ListItemButton } from "@mui/joy";
import Sheet from "@mui/joy/Sheet";
import GlobalStyles from "@mui/joy/GlobalStyles";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import Logo from "./Logo";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/joy/Box";
import { closeSidebar } from "./Utils";
import { Icon } from "@src/shared/components/Icon/Icon";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { enqueueSnackbar } from "notistack";
import { loginService } from "@src/services/loginService";
import { userService } from "@src/services/userService";

export const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const [userIcon, setUserIcon] = useState<string | undefined>("");
  const [onMobile, setOnMobile] = useState<boolean>(false);

  useEffect(() => {
    if (window.innerWidth < 500) {
      setOnMobile(true);
    } else {
      setOnMobile(false);
    }

    const getIcon = async () => {
      const icon = await userService.getUserIcon(loginService.getCookie("userHandle"));
      setUserIcon(icon);
    }
    getIcon();
  }, []);

  const handleLogout = async () => {
    try {
      enqueueSnackbar("Loading..", {
        variant: "info",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "center",
        },
        autoHideDuration: 2000,
        style: {
          fontFamily: "Arial",
        },
      });

      await loginService.logout();

      localStorage.setItem(
        "snackbarData",
        JSON.stringify({
          message: "Logout successfull.",
          variant: "success",
          duration: 2000,
          fontFamily: "Arial",
        })
      );

      if (window.location.pathname === "/") {
        window.location.reload();
      } else {
        navigate("/");
      }
    } catch (error) {
      enqueueSnackbar("Logout unsuccessful.", {
        variant: "error",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "center",
        },
        autoHideDuration: 2000,
        style: {
          fontFamily: "Arial",
        },
      });
    }
  };

  return (
    <React.Fragment>
      <Box
        sx={{
          position: "fixed",
          zIndex: 9998,
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          opacity: "var(--SideNavigation-slideIn)",
          backgroundColor: "var(--joy-palette-background-backdrop)",
          transition: "opacity 0.4s",
          transform: {
            xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--FirstSidebar-width, 0px)))",
            lg: "translateX(-100%)",
          },
        }}
        onClick={() => closeSidebar()}
      />

      <Sheet
        className="NavBar"
        sx={{
          position: {
            xs: "fixed",
            md: "sticky",
          },
          transform: {
            xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))",
            md: "none",
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
              "--NavBar-width": "40px",
            },
          }}
        />
        <Link to="/">
          <Logo
            sx={{
              paddingTop: "8px",
            }}
          />
        </Link>
        <List
          size="md"
          sx={{ "--ListItem-radius": "6px", "--List-gap": "8px" }}
        >
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
        <div style={{marginBottom: onMobile ? "90px" : "0px"}}>
          {loginService.getCookie("userEmail") == null ? (
            <Link to="/login" style={{ textDecoration: "none" }}>
              <LoginIcon />
            </Link>
          ) : (
            <div>          
              <List
                sx={{
                  size: "md",
                  flexGrow: 0,
                  "--ListItem-radius": "6px",
                  "--List-gap": "8px",
                }}
              >
                <ListItem>
                  <ListItemButton
                    component={Link}
                    to="/profile?activeTab=2"
                  >
                    <SettingsRoundedIcon />
                  </ListItemButton>
                </ListItem>
              </List>
              <Divider />
              <Link to="/profile" style={{ textDecoration: "none" }}>
                <Avatar sx={{ marginBottom: "20px", marginTop: "20px" }}>
                  <Icon iconName={userIcon ? userIcon : ""} />
                </Avatar>
              </Link>
              <span
                onClick={handleLogout}
                style={{ cursor: "pointer", paddingLeft: "10px" }}
              >
                <LogoutIcon />
              </span>
            </div>
          )}
        </div>
      </Sheet>
    </React.Fragment>
  );
};

export default NavBar;
