import React from "react";
import { HiCurrencyDollar, HiBookOpen, HiUserGroup, HiDocument, HiClipboardCheck, HiCollection } from "react-icons/hi";

const commonIconStyles = "w-7 h-7 mr-2 text-white";

const iconHM = {
    HiCurrencyDollar: <HiCurrencyDollar className={commonIconStyles} />,
    HiBookOpen: <HiBookOpen className={commonIconStyles} />,
    HiUserGroup: <HiUserGroup className={commonIconStyles} />,
    HiDocument: <HiDocument className={commonIconStyles} />,
    HiClipboardCheck: <HiClipboardCheck className={commonIconStyles} />,
    HiCollection: <HiCollection className={commonIconStyles} />
};
const Cards = ({ value, title, ...props }) => {
    return (
        <div className="margin-auto h-[140px] flex w-full items-center bg-secondary shadow-sm cursor-pointer hover:bg-secondaryLight p-6">
            {iconHM[props.icon]}
            <div>

                <p className="text-xl font-bold text-white">{title}</p>
                <p className="text-4xl font-bold text-white">{value}</p>
            </div>
        </div>
    );
};

export default Cards;
