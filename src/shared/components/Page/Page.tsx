import { Stack } from "@mui/joy";
import style from "./Page.module.css";
import NavBar from "@src/shared/components/NavBar/NavBar";
import Header from "@src/shared/components/NavBar/Header"
interface PageProps {
  children?: React.ReactNode;
  backgroundColor?: string;
  showNav?: boolean;
}

export const Page = ({
  children,
  backgroundColor,
}: PageProps) => {
  return (
    <Stack
      style={{ backgroundColor: backgroundColor, margin: 0, width: "100%" }}
      className={style.page}
      direction={"row"}
    >
      <Header /> 
      <NavBar />
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
