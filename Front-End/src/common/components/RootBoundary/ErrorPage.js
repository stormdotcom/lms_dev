import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { STATE_REDUCER_KEY as COMMON } from "../../../modules/common/exports";


import { useEffect } from "react";
import { Refresh, HomeIcon } from "../Icons";
import { BROWSER_STORAGE } from "../../constants";

const DATA = {
    STATUS: "Something went wrong",
    TITLE: "Error",
    HEADER: "Oops! Page not found"
};


const ErrorPage = (props) => {
    const navigate = useNavigate();
    const homePath = useSelector(state => state[COMMON].homePath);
    const safePath = localStorage.getItem(BROWSER_STORAGE.ACCESS_TOKEN) ? homePath : "login";
    const wall = "https://www.wallpapertip.com/wmimgs/245-2455188_error-404-in-png.png";
    useEffect(() => {
        // dispatch(commonActions.setNavigator(navigate));
    }, []);
    let { error: { status, message, statusText } = {}, image = wall, title = DATA.TITLE } = props;
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-primary-main relative">
            <img src={image} alt="notFoundImage" className="h-64 w-30" />
            <div className="text-center text-4xl font-semibold tracking-widest text-white-main absolute bottom-10 text-red-500">
                {DATA.HEADER}
            </div>
            <div className="text-center w-1/2">
                <p className="text-lg text-white-main text-secondary">
                    Oops! Looks like this page doesn't exist. Let's get you back on track with your learning.
                </p>
            </div>
            <div className="w-full flex justify-center items-center mt-4 space-x-4">
                <button
                    onClick={() => navigate(`../${safePath}`)}
                    className="bg-blue-500 text-white font-bold py-2 px-4 rounded flex items-center space-x-2"
                >
                    <span>Home</span> <HomeIcon className="w-5 h-5 text-white" />
                </button>
                <div className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 flex items-center space-x-2">
                    <Refresh className="w-5 h-5 text-white" />
                    <span>Refresh</span>
                </div>
            </div>
            {process.env.NODE_ENV === "development" && (
                <div className="absolute top-12 bg-yellow-100  p-6 rounded-xl">
                    <p className="text-4xl text-error-main font-semibold tracking-widest text-center">
                        {title}
                    </p>
                    <p className="tracking-wide text-error-main text-3xl text-center">
                        {status || DATA.STATUS}
                    </p>
                    {(message || statusText) && (
                        <p className="tracking-wider text-error-main text-lg text-center">
                            {message || statusText}
                        </p>
                    )}
                    {status && (
                        <p className="tracking-wider text-error-main text-lg text-center">
                            {message || statusText}
                            {DATA.HEADER}
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};

export default ErrorPage;
