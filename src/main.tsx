import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

import Store from "./app/store";
import Entry from "./pages/entry";
import Main from "./pages/main";
import Chat from "./pages/main/chat";
import Friends from "./pages/main/friends";
import Games from "./pages/main/games";
import NotFound from "./pages/notfound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Entry />,
  },
  {
    path: "/chat",
    element: <Chat />,
  },
  {
    path: "/games",
    element: <Games />,
  },
  {
    path: "/friends",
    element: <Friends />,
  },

  {
    path: "/main",
    element: <Main />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={Store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
