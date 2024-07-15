import { useRouteError } from "react-router-dom";
import ErrorPage from "./ErrorPage";

const RootBoundary = () => {
    const error = useRouteError();
    return <ErrorPage error={error} />;
};

export default RootBoundary;
