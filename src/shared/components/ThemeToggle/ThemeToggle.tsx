import { useColorScheme } from "@mui/joy/styles";
import { IconButton } from "@mui/joy";
import { DarkMode, LightMode } from "@mui/icons-material";

export const ModeToggle = () => {
  const { mode, setMode } = useColorScheme();
  return (
    <IconButton
      color="neutral"
      onClick={() => setMode(mode === "dark" ? "light" : "dark")}
    >
      {mode === "dark" ? <DarkMode /> : <LightMode />}
    </IconButton>
  );
};
