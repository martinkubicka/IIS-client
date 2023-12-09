import { SxProps } from "@mui/joy/styles/types";

export const threadStyle: SxProps = {
  width: { md: "90%", xs: "100%" },
  borderRadius: "5px",
  height: "100%",
  position: "relative",
  margin: 0,
};

export const newPostStyle: SxProps = {
  width: "100%",
  position: "absolute",
  left: { xs: 0, md: "10px" },
  bottom: "5px",
  height: "150px",
};

export const newPostTextAreaStyle: SxProps = {
  height: "100%",
};

export const threadHeaderStyle: SxProps = {
  width: "100%",
  height: "100px",
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
  bottom: "170px",
  overflow: "auto",
};
