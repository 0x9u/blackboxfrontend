import React, { FC } from "react";
import { useSelector } from "react-redux";
import AdminList from "../../../components/admin/adminMenuComponent";
import GamesList from "../../../components/games/gamesListComponent";
import NavbarChild from "../../../components/navbarChildComponent";
import Page from "../../../components/pageComponent";
import { RootState } from "../../../app/store";
import AdminGuilds from "../../../components/admin/adminGuildsComponent";
import AdminUsers from "../../../components/admin/adminUsersComponent";
import AdminServer from "../../../components/admin/adminServerComponent";

const Admin: FC = () => {
    const currentAdminMode = useSelector((state: RootState) => state.client.currentAdminMode);
    return (
        <div className="flex min-h-full grow flex-row">
            <NavbarChild>
                <AdminList />
            </NavbarChild>
            <Page>
                {currentAdminMode === "guilds" ? <AdminGuilds /> : currentAdminMode === "users" ? <AdminUsers /> : currentAdminMode === "server" ? <AdminServer /> : "invalid admin state"}
            </Page>
        </div>
    );
};

export default Admin;
