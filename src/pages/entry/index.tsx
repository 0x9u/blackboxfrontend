import React, { FC } from "react";

import Login from "./login";
import Register from "./register";

const Entry: FC = () => {
  const [test, setTest] = React.useState<string>("");
  const [mode, setMode] = React.useState<string>("login");
  return (
    <div className="relative flex min-h-screen flex-col sm:justify-center overflow-hidden bg-shade-2">
      <div className="relative mx-auto sm:py-4 text-white">
        <p className="text-7xl font-bold">BlackBox ;)</p>
        <p className="font-bold">
          We are fucking back at it again!
        </p>
      </div>
      {mode === "login" ? (
        <Login changeMode={() => setMode("register")} />
      ) : (
        <Register changeMode={() => setMode("login")} />
      )}
    </div>
  );
};

export default Entry;
