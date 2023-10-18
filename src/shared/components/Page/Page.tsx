import { Box, Stack } from "@mui/joy";
import style from "./Page.module.css";
import NavBar from "@src/shared/components/NavBar/NavBar";
import Header from "@src/shared/components/NavBar/Header";
import { useEffect } from "react";
import { useSnackbar } from "notistack";

interface PageProps {
  children?: React.ReactNode;
  backgroundColor?: string;
  showNav?: boolean;
}

export const Page = ({ children, backgroundColor }: PageProps) => {
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
      style={{ backgroundColor: backgroundColor, margin: 0, width: "100%" }}
      className={style.page}
      direction={"row"}
    >
      <Header />
      <NavBar />
      <Box
        sx={{
          backgroundColor: backgroundColor,
          margin: 0,
          width: "100%",
          minHeight: "100vh",
          padding: { md: "30px", xs: "0px" },
          marginTop: { xs: 7, md: 0 },
        }}
      >
        {children}
      </Box>
    </Stack>
  );
};
