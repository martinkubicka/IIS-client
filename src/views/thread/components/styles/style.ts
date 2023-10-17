import { SxProps } from "@mui/joy/styles/types";

export const threadStyle: SxProps = {
  width: { md: "90%", xs: "100%" },
  borderRadius: "5px",
  height: { md: "900px", xs: "800px" },
};

export const newPostStyle: SxProps = {
  width: "100%",
  height: "150px",
};

export const newPostTextAreaStyle: SxProps = {
  width: "100%",
  height: "100px",
};

export const threadHeaderStyle: SxProps = {
  width: "100%",
  height: "150px",
};

export const postsStyle: SxProps = {
  minWidth: "100%",
  position: "relative",
};

export const postsContainerStyle: SxProps = {
  height: "100%",
  overflow: "auto",
};

export const fabStyle: SxProps = {
  position: "fixed",
  zIndex: 10,
  bottom: "20px",
  right: "20px",
};
