import {
  Dashboard,
  Search,
  Profile,
  Group,
  NotFound,
  Login,
  ResetPassword,
  Thread,
} from "@src/views";
import { useRoutes } from "react-router-dom";

export const Routes = () => {
  const element = useRoutes([
    { path: "/", element: <Dashboard /> },
    { path: "/search", element: <Search /> },
    { path: "/profile", element: <Profile /> },
    { path: "/group/:handle", element: <Group /> },
    { path: "/thread/:threadId", element: <Thread /> },
    { path: "/notfound", element: <NotFound /> },
    { path: "/login", element: <Login /> },
    { path: "/passwordReset", element: <ResetPassword /> },
  ]);

  return element;
};
