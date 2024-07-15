import React from "react";
import { BellAlert } from "../../../../common/components/Icons";
import { Popover, PopoverBackdrop, PopoverButton, PopoverPanel } from "@headlessui/react";
import moment from "moment/moment";
import Loader from "./Loader"; // Import the Loader component
import LoadingCustomOverlay from "../../../../common/components/LoadingOverlay/LoadingCustomOverlay";
import { useDispatch, useSelector } from "react-redux";
import { STATE_REDUCER_KEY } from "../../../socket/constants";
import { actions } from "../../../socket/slice";
import { notificationList, readNotification } from "../../../socket/actions";

const MobileNotificationMenu = () => {
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
        <div className="fixed bottom-8 right-1">
            <Popover className="relative" backdrop={true}>
                {({ close }) => (
                    <>
                        <PopoverButton className="inline-flex items-center border-none">
                            <div className="bg-slate-100 rounded-full py-1 px-2">
                                <BellAlert className="h-8 w-8 text-yellow-400" />
                                {count > 0 && (
                                    <span className="absolute top-[-2px] right-3 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                        {count}
                                    </span>
                                )}
                            </div>
                        </PopoverButton>
                        <PopoverBackdrop className="fixed inset-0 bg-black/15" />
                        <PopoverPanel className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-white w-full max-w-lg rounded-lg shadow-lg overflow-hidden">
                                <div className="flex justify-end p-2">
                                    <button className="text-gray-400 text-xl hover:text-gray-600 focus:outline-none" onClick={close}>
                                        <span className="sr-only">Close</span>
                                        &times;
                                    </button>
                                </div>
                                <LoadingCustomOverlay active={isLoading} spinnerProps="notify">
                                    <div className={`z-50 w-full px-4 pb-4 ${hasNotifications ? "h-96" : "h-auto"}`}>
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
                            </div>
                        </PopoverPanel>
                    </>
                )}
            </Popover>
        </div>
    );
};

export default MobileNotificationMenu;
