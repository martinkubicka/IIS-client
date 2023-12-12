/**
 * @file NewPost.ts
 * @author { Matěj Macek (xmacek27) }
 * @date 17.12.2023
 * @brief Definition of styles for NewPost component
 */

import { SxProps } from "@mui/joy/styles/types";

export const newPostStyle: SxProps = (theme) => ({
  width: "100%",
  bgcolor: theme.vars.palette.background.level2,
});

export const newPostTextAreaStyle: SxProps = (theme) => ({
  width: "100%",
  height: "100px",
  bgcolor: theme.vars.palette.background.level2,
  boxShadow: "none",
});

export const containerStyle: SxProps = {
  display: "flex",
  alignItems: "center",
};
