import { HomeRounded, SearchRounded, LogoutRounded } from "@mui/icons-material";
import { Stack, Sheet, ColorPaletteProp } from "@mui/joy";
import { NavbarItem } from "./NavbarItem";

const sx = {
  position: {
    xs: "absolute",
    md: "sticky",
  },
  transform: {
    xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))",
    md: "none",
  },
  transition: "transform 0.4s",
  zIndex: 10000,
  height: "100dvh",
  width: 50,
  top: 0,
  px: 2,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  borderRight: "1px solid",
  borderColor: "divider",
};

const navBarTopItems = [
  {
    name: "",
    icon: <HomeRounded />,
  },
  {
    name: "search",
    icon: <SearchRounded />,
  },
];

const navBarBottomItems = [
  {
    name: "me",
    avatar: "doughnut",
  },
  {
    name: "",
    icon: <LogoutRounded />,
    color: "danger" as ColorPaletteProp,
  },
];

export const Navbar = () => {
  return (
    <Sheet color="primary" invertedColors sx={sx}>
      <Stack padding={2} spacing={3}>
        {navBarTopItems.map((item) => (
          <NavbarItem name={item.name} icon={item.icon} />
        ))}
      </Stack>

      <Stack padding={2} spacing={3}>
        {navBarBottomItems.map((item) => (
          <NavbarItem
            color={item.color}
            name={item.name}
            icon={item.icon}
            avatar={item.avatar}
          />
        ))}
      </Stack>
    </Sheet>
  );
};
