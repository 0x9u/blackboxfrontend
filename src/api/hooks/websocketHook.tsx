import React, { useEffect, useState } from "react";
import { RootState, useAppDispatch } from "../../app/store";
import { wsConnect, wsDisconnect } from "../websocket";
import { useSelector } from "react-redux";
import {
  resetClient,
  setWsStatus,
} from "../../app/slices/clientSlice";
import { resetGuilds } from "../../app/slices/guildSlice";
import { resetMsgs } from "../../app/slices/msgSlice";
import { resetUsers } from "../../app/slices/userSlice";

const useGatewayAPI = () => {
  const dispatch = useAppDispatch();
  const [first, setFirst] = useState<boolean>(true);

  const wsStatus = useSelector((state: RootState) => state.client.wsStatus);

  useEffect(() => {
    let timeout: number;
    if (wsStatus === "disconnected") {
      dispatch(setWsStatus("connecting"));
      console.log("we runnin");
      console.log("ws status", wsStatus);
      if (first) {
        setFirst(false);
        dispatch(wsConnect());
      } else {
        dispatch(resetClient());
        dispatch(resetGuilds());
        dispatch(resetMsgs());
        dispatch(resetUsers());
        timeout = setTimeout(() => {
          dispatch(wsConnect());
        }, 5000);
      }
    }
    return () => {
      if (wsStatus === "connected") {
        console.log("we stoppin");
        clearTimeout(timeout);
        dispatch(wsDisconnect());
      }
    };
  }, [wsStatus, dispatch]);
};

export default useGatewayAPI;
