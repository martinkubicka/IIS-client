/**
 * @file Routes.tsx
 * @author { Martin Kubicka (xkubic45), Dominik Petrik (xpetri25), Matej Macek (xmacek27) }
 * @date 17.12.2023
 * @brief Definition of website routes
 */

import {
  Dashboard,
  Group,
  Login,
  NotFound,
  Profile,
  ResetPassword,
  Search,
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
    { path: "profile/:handle", element: <Profile /> },
  ]);

  return element;
};
