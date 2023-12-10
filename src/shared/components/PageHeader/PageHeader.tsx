/**
 * @file PageHeader.tsx
 * @author { Martin Kubicka (xkubic45) }
 * @date 17.12.2023
 * @brief Definition of header component for pages
 */

import { Typography } from "@mui/joy";
import style from "./PageHeader.module.css";
import React from "react";

interface PageHeaderProps {
  text?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ text }) => {
  return (
    <div>
      <Typography level="h1" className={style.PageHeader}>
        {text}
      </Typography>
    </div>
  );
};
