import { SxProps } from "@mui/joy/styles/types";

export const overlayStyle: SxProps = {
  position: "absolute",
  width: "100%",
  height: "100%",
  zIndex: 5,
  backdropFilter: "blur(1px)",
  bgcolor: "rgba(255, 255, 255, 0.4)",
};
