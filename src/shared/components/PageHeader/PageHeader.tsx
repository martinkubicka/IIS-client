import style from "./PageHeader.module.css";
import React from "react";

interface PageHeaderProps {
  text?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ text }) => {
  return (
    <div>
      <h1 className={style.PageHeader}>{text}</h1>
    </div>
  );
};
