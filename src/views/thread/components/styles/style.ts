import { SxProps } from "@mui/joy/styles/types";

export const threadStyle: SxProps = {
  width: { md: "90%", xs: "100%" },
  borderRadius: "5px",
  height: "100%",
  position: "relative",
  margin: 0,
};

export const newPostStyle: SxProps = (theme) => ({
  width: "100%",
  position: { xs: "fixed", md: "absolute" },
  bgcolor: theme.vars.palette.background.level2,
  left: { xs: 0, md: "10px" },
  bottom: { xs: "2px", md: "5px" },
  height: { xs: "80px", md: "150px" },
  flexDirection: { xs: "column", md: "row" },
  borderRadius: "10px",
});

export const newPostTextAreaStyle: SxProps = {
  height: "100%",
  width: "100%",
  backgroundColor: "inherit",
  boxShadow: "none",
};

export const threadHeaderStyle: SxProps = {
  width: "100%",
  height: { xs: "25px", sm: "100px" },
};

export const loginAlert: SxProps = {
  width: "100%",
  position: "absolute",
  left: { xs: 0, md: "10px" },
  bottom: "0px",
};

export const postsStyle: SxProps = {
  width: "100%",
};

export const postsContainerStyle: SxProps = {
  width: "100%",
  position: "absolute",
  top: "100px",
  bottom: { xs: "100px", sm: "170px" },
  overflow: "auto",
};
