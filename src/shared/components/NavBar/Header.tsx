import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/joy";
import GlobalStyles from "@mui/joy/GlobalStyles";
import Sheet from "@mui/joy/Sheet";
import { toggleSidebar } from "./Utils";

export default function Header() {
  return (
    <Sheet
      sx={{
        display: { xs: "flex", md: "none" },
        alignItems: "center",
        justifyContent: "space-between",
        position: "fixed",
        top: 0,
        width: "100vw",
        height: "var(--Header-height)",
        zIndex: 9995,
        p: 2,
      }}
    >
      <GlobalStyles
        styles={(theme) => ({
          ":root": {
            "--Header-height": "20px",
            [theme.breakpoints.up("md")]: {
              "--Header-height": "0px",
            },
          },
        })}
      />
      <IconButton onClick={() => toggleSidebar()} color="neutral" size="md">
        <MenuIcon />
      </IconButton>
    </Sheet>
  );
}
