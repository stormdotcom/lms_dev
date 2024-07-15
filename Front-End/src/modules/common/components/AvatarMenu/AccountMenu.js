import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { UserIcon, CogIcon, ArrowLeftIcon as LogoutIcon } from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../actions";
import { STATE_REDUCER_KEY } from "../../constants";

const accountOptions = [
    { name: "Profile", href: "/home/profile/details", icon: UserIcon },
    { name: "Settings", href: "/home/profile/settings", icon: CogIcon }
];

export default function AccountMenu() {
    const userImage = useSelector(state => state[STATE_REDUCER_KEY].userDetails?.profileAvatarUrl || "");
    const dispatch = useDispatch();
    const handleLogout = () => dispatch(logout({ isManual: true }));
    return (
        <Popover className="relative">
            <PopoverButton className="inline-flex items-center gap-x-2 text-sm font-semibold leading-6 text-gray-900">
                <img
                    src={userImage ? userImage : "https://via.placeholder.com/40"}
                    alt="Avatar"
                    className="w-7 h-7 xs:w-4 xs:w-4 rounded-full border-1 border-secondary"
                />
            </PopoverButton>

            <PopoverPanel
                transition
                style={{ position: "absolute", left: -40, zIndex: 98889 }}
                className="mt-2 flex w-46 max-w-max -translate-x-1/2 px-2 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
            >
                <div className="z-10 w-46 flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
                    <div className="p-4">
                        {accountOptions.map((item) => (
                            <div key={item.name} className="group relative flex gap-x-4 rounded-lg p-2 hover:bg-gray-50">
                                <div className="mt-1 flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                    <item.icon className="h-5 w-5 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                                </div>
                                <div>
                                    <Link to={item.href} >
                                        <p className="font-semibold text-gray-900 pt-2" >
                                            {item.name}
                                            <span className="absolute inset-0" />
                                        </p>
                                    </Link>
                                </div>
                            </div>
                        ))}
                        <div className="group relative flex gap-x-4 rounded-lg p-2 hover:bg-gray-50">
                            <div className="mt-1 flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                <LogoutIcon className="h-5 w-5 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900 pt-2" onClick={handleLogout}>
                                    Logout
                                    <span className="absolute inset-0" />
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </PopoverPanel>
        </Popover>
    );
}
