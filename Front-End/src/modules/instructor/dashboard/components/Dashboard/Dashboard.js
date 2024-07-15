import React, { useEffect } from "react";
import Cards from "./Cards";

import { useDispatch, useSelector } from "react-redux";
import { fetchInstructorDashBoard } from "../../actions";
import { STATE_REDUCER_KEY } from "../../constants";
import CardSkeleton from "../../../../../common/components/Custom/Skelton/CardSkeleton";


export const Dashboard = () => {
    const dispatch = useDispatch();
    const instructorDashboard = useSelector(state => state[STATE_REDUCER_KEY].dashboard.data);
    const requestInProgress = useSelector(state => state[STATE_REDUCER_KEY].dashboard.requestInProgress);
    useEffect(() => {
        dispatch(fetchInstructorDashBoard());
    }, []);
    return (
        <div>
            <div className="my-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {
                    requestInProgress ?
                        <CardSkeleton />
                        : instructorDashboard.map(({ value, title, Icon }, i) => <Cards key={i} value={value} title={title} icon={Icon} />)
                }
                { }
            </div>

        </div>
    );
};
