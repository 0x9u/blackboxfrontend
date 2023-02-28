import React, { FC } from "react";
import Navbar from "../../components/navbarComponent";
import NavbarChild from "../../components/navbarChildComponent";
import NavbarItem from "../../components/navItemComponent";

const Main: FC = () => {
  return (
      <div className="relative flex min-h-screen flex-row overflow-hidden">
        <Navbar/>
        <NavbarChild>
          <NavbarItem onClick={() => console.log("clicked")}>
            a
            </NavbarItem>
          </NavbarChild>
    </div>
  );
};

export default Main;
