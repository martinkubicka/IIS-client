import { Dashboard, Search, Profile, Group, NotFound, Login, Register, ResetPassword } from "@src/views";
import { useRoutes } from "react-router-dom";

export const Routes = () => {
  const element = useRoutes([
    { path: "/", element: <Dashboard /> },
    { path: "/search", element: <Search /> },
    { path: "/me", element: <Profile /> },
    { path: "/group/:handle", element: <Group /> },
    { path: "/notfound", element: <NotFound /> },
    { path: "/login", element: <Login/> },
    { path: "/passwordReset", element: <ResetPassword/> },
  ]);

  return element;
};
