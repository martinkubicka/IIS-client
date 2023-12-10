import { Box, Stack } from "@mui/joy";
import Header from "@src/shared/components/NavBar/Header";
import NavBar from "@src/shared/components/NavBar/NavBar";
import { useSnackbar } from "notistack";
import { useEffect } from "react";

interface PageProps {
  children?: React.ReactNode;
  backgroundColor?: string;
  showNav?: boolean;
  isPadded?: boolean;
}

export const Page = ({
  children,
  backgroundColor,
  isPadded = true,
}: PageProps) => {
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const storedSnackbarData = localStorage.getItem("snackbarData");
    if (storedSnackbarData) {
      const { message, variant, duration, fontFamily } =
        JSON.parse(storedSnackbarData);

      enqueueSnackbar(message, {
        variant,
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "center",
        },
        autoHideDuration: duration,
        style: {
          fontFamily,
        },
      });

      localStorage.removeItem("snackbarData");
    }
  }, []);

  return (
    <Stack
      style={{ margin: 0, padding: 0, width: "100%" }}
      sx={(theme) => ({
        bgcolor: theme.vars.palette.background.level1,
      })}
      direction={"row"}
    >
      <Header />
      <NavBar />
      <Box
        sx={(theme) => ({
          margin: 0,
          width: "100%",
          minHeight: "100vh",
          padding: isPadded ? { md: "30px", xs: "0px" } : 0,
          marginTop: { xs: 7, md: 0 },
          bgcolor: theme.vars.palette.background.level1,
        })}
      >
        {children}
      </Box>
    </Stack>
  );
};
