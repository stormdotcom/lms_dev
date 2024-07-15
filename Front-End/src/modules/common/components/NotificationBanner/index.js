/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { STATE_REDUCER_KEY } from "../../../socket/constants";
import { actions as sliceActions } from "../../../socket/slice";
import NotifyMenu from "./NotifyMenu";
import MobileNotificationMenu from "./MobileNotificationMenu";
import { notificationList } from "../../../socket/actions";

import { CircleLoader } from "react-spinners";
import { useSocket } from "../../../../@app/SocketProvider";

const NotificationBanner = ({ isMobileScreen = false }) => {
  const dispatch = useDispatch();
  const socket = useSocket();
  useEffect(() => {

    if (socket) {
      dispatch(notificationList());

      socket.on("real-time-notify", (payload) => {
        dispatch(sliceActions.setNotification(payload));
      });

      return () => {
        socket.off("real-time-notify");
      };
    }
  }, [socket]);

  if (!socket) {
    return <CircleLoader className="w-1 h-1" />;
  }

  return (
    <>
      {isMobileScreen ? <MobileNotificationMenu /> : <NotifyMenu />}
    </>
  );
};

export default React.memo(NotificationBanner);
