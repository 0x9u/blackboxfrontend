import React, { useEffect, useState } from "react";
import { RootState, useAppDispatch } from "../../app/store";
import { wsConnect, wsDisconnect } from "../websocket";
import { useSelector } from "react-redux";
import { resetClient, setWsStatus } from "../../app/slices/clientSlice";
import { resetGuilds } from "../../app/slices/guildSlice";
import { resetMsgs } from "../../app/slices/msgSlice";
import { resetUsers } from "../../app/slices/userSlice";
import {
  getBlocked,
  getFriends,
  getGuilds,
  getRequestedFriends,
  getSelf,
} from "../userApi";
import { useNavigate } from "react-router-dom";

const useGatewayAPI = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [first, setFirst] = useState<boolean>(true);

  const wsStatus = useSelector((state: RootState) => state.client.wsStatus);
  const tokenAvailable = useSelector(
    (state: RootState) => state.auth.token !== null
  );

  function intialLoadData() {
    dispatch(getSelf());
    dispatch(getBlocked());
    dispatch(getFriends());
    dispatch(getRequestedFriends());
    dispatch(getGuilds());
  }

  useEffect(() => {
    let timeout: number;
    if (wsStatus === "disconnected") {
      dispatch(setWsStatus("connecting"));
      console.log("we runnin");
      console.log("ws status", wsStatus);
      if (first) {
        setFirst(false);
        dispatch(wsConnect());
        intialLoadData();
      } else if (!tokenAvailable) {
        navigate("/");
      } else {
        dispatch(resetClient());
        dispatch(resetGuilds());
        dispatch(resetMsgs());
        dispatch(resetUsers());
        timeout = setTimeout(() => {
          dispatch(wsConnect());
          intialLoadData();
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
