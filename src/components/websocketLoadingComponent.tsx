import React, { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
const WebsocketLoading: FC = () => {
  const wsStatus = useSelector((state: RootState) => state.client.wsStatus);
  return (
    <div
      className={`fixed flex h-screen w-screen justify-center bg-shade-3 align-middle transition-opacity duration-700 ease-in-out ${
        wsStatus === "connecting"
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0"
      }`}
    >
      <div className="m-auto flex flex-row space-x-4">
        <h1 className=" text-4xl text-white">Loading</h1>
        <div className="flex flex-row space-x-1">
          <h1
            className="animate-bounce text-4xl text-white"
            style={{ animationDelay: "100ms" }}
          >
            .
          </h1>
          <h1
            className="animate-bounce text-4xl text-white"
            style={{ animationDelay: "200ms" }}
          >
            .
          </h1>
          <h1
            className="animate-bounce text-4xl text-white"
            style={{ animationDelay: "300ms" }}
          >
            .
          </h1>
        </div>
      </div>
    </div>
  );
};

export default WebsocketLoading;
