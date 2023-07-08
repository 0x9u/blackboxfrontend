import React, { FC, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider, useDispatch } from "react-redux";

import Store from "./app/store";
import Entry from "./pages/entry";
import Main from "./pages/main";
import Chat from "./pages/main/chat";
import Friends from "./pages/main/friends";
import Games from "./pages/main/games";
import NotFound from "./pages/notfound";
import { setCurrentMode } from "./app/slices/clientSlice";
import InvitePage from "./pages/invite";

type siteHandlerProps = {
  type: "games" | "chat" | "friends";
};

//probs shit solution but whatever
const SiteHandler: FC<siteHandlerProps> = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setCurrentMode(props.type));
  }, [dispatch]);

  return <Main />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Entry />,
  },
  {
    path: "/chat",

    element: <SiteHandler type="chat" />,
  },
  {
    path: "/games",
    element: <SiteHandler type="games" />,
  },
  {
    path: "/friends",
    element: <SiteHandler type="friends" />,
  },
  {
    path: "/main",
    element: <Main />,
  },
  {
    path: "/invite",
    element: <InvitePage />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

let container: ReactDOM.Root | null = null;
document.addEventListener("DOMContentLoaded", (e) => {
  if (!container) {
    container = ReactDOM.createRoot(
      document.getElementById("root") as HTMLElement
    );
    container.render(
      <Provider store={Store}>
        <RouterProvider router={router} />
      </Provider>
    );
  }
});
