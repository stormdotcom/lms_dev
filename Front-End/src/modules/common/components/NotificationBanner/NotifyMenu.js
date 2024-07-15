import React from "react";
import { BellAlert } from "../../../../common/components/Icons";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import moment from "moment/moment";
import Loader from "./Loader"; // Import the Loader component
import LoadingCustomOverlay from "../../../../common/components/LoadingOverlay/LoadingCustomOverlay";
import { useDispatch, useSelector } from "react-redux";
import { STATE_REDUCER_KEY } from "../../../socket/constants";
import { actions } from "../../../socket/slice";
import { notificationList, readNotification } from "../../../socket/actions";

const NotifyMenu = () => {

    const dispatch = useDispatch();
    const offset = useSelector(state => state[STATE_REDUCER_KEY].pagination.offset);
    const limit = useSelector(state => state[STATE_REDUCER_KEY].pagination.limit);
    const isLoading = useSelector(state => state[STATE_REDUCER_KEY].isLoading);
    const data = useSelector(state => state[STATE_REDUCER_KEY].data);
    const count = useSelector(state => state[STATE_REDUCER_KEY].count);
    const timeAgo = (date) => {
        return moment(date).fromNow();
    };

    const handleScroll = () => {
        const newOffset = offset + limit;
        dispatch(actions.setPagination({ offset: newOffset, limit }));
        dispatch(notificationList({ offset: newOffset, limit }));
    };
    const handleRead = (id) => {
        dispatch(actions.readNotification(id));
        if (id) {
            dispatch(readNotification(id));
        }

    };

    const hasNotifications = data && data.length > 0;

    return (
        <div className="mx-5 relative">
            {count > 0 && (
                <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center ">
                    {count}
                </span>
            )}
            <Popover className="relative cursor-pointer border-none">
                <PopoverButton className="inline-flex items-center border-none" >
                    <BellAlert className="h-6 w-6 text-yellow-400" />
                </PopoverButton>
                <PopoverPanel
                    transition
                    style={{ position: "absolute", right: 0, zIndex: 98888, height: "1rem" }}
                    className="border-none mt-2 w-72 max-w-max px-2 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
                >
                    <LoadingCustomOverlay active={isLoading} spinnerProps="notify">
                        <div className={`z-98 w-72 rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5 ${hasNotifications ? "h-96" : "h-auto"}`}>
                            <div className="w-full border-b text-center">
                                <p className="text-xs text-gray-300">Real Time updates</p>
                            </div>
                            <div className="h-80 overflow-y-scroll text-sm leading-6">
                                <div className="p-4">
                                    {hasNotifications && data.map((item, idx) => (
                                        <div
                                            key={idx}
                                            onClick={() => handleRead(item?.id)}
                                            className={`group relative flex gap-x-4 rounded-lg p-2 hover:bg-blue-400 ${!item.hasRead ? "bg-blue-50" : "bg-white"}`}
                                        >
                                            <i className="h-1 w-1 text-blue-600" aria-hidden="true" />
                                            <div className="flex-1 truncate">
                                                <p className="font-semibold text-gray-800">{item.title}</p>
                                                <p className="text-sm text-gray-600">{item.message}</p>
                                                <p className="text-xs text-gray-500 pt-1">{timeAgo(item.createdAt)}</p>
                                            </div>
                                        </div>
                                    ))}
                                    {isLoading && <Loader />}
                                </div>
                            </div>

                            {!hasNotifications && <div className="h-80 text-center text-gray-500">
                                <p>No notifications available.</p>
                            </div>}

                            {hasNotifications && (
                                <div className="px-2 py-1">
                                    <div className="flex justify-between mb-2">
                                        <button className="text-xs text-blue-500 hover:underline focus:outline-none">
                                            Mark all as read
                                        </button>
                                        <button onClick={handleScroll} className="text-xs text-blue-500 hover:underline focus:outline-none">
                                            Load More
                                        </button>

                                    </div>
                                </div>
                            )}
                        </div>
                    </LoadingCustomOverlay>
                </PopoverPanel>
            </Popover>
        </div>
    );
};

export default NotifyMenu;
