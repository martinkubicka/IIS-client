import { Stack } from "@mui/joy";
import style from "./Page.module.css";
import { Navbar } from "@src/shared/components/Navbar";
interface PageProps {
  children?: React.ReactNode;
  backgroundColor?: string;
  showNav?: boolean;
}

export const Page = ({
  children,
  backgroundColor,
  showNav = true,
}: PageProps) => {
  return (
    <Stack
      style={{ backgroundColor: backgroundColor, margin: 0, width: "100%" }}
      className={style.page}
      direction={"row"}
    >
      {showNav && <Navbar />}
      <div
        style={{
          backgroundColor: backgroundColor,
          margin: 0,
          width: "100%",
          minHeight: "100vh",
          padding: "30px",
        }}
      >
        {children}
      </div>
    </Stack>
  );
};
