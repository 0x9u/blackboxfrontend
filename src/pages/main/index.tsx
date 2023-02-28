import React, { FC } from "react";
import NavBar from "../../components/navbarComponent";

const Main: FC = () => {
  return (
      <div className="relative flex min-h-screen flex-col overflow-hidden">
        <NavBar/>
    </div>
  );
};

export default Main;
