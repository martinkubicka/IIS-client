import style from "./Page.module.css";

interface PageProps {
  children?: React.ReactNode;
}

export const Page = ({ children }: PageProps) => {
  return <div className={style.page}>{children}</div>;
};
