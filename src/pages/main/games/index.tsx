import React, { FC } from "react";
import GamesList from "../../../components/games/gamesListComponent";
import NavbarChild from "../../../components/navbarChildComponent";
import Page from "../../../components/pageComponent";

const Games: FC = () => {
  return (
    <div className="flex min-h-full grow flex-row">
      <NavbarChild>
        <GamesList />
      </NavbarChild>
      <Page>
        T
      </Page>
    </div>
  );
};

export default Games;
