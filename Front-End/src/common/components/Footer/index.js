import React, { useState } from "react";
import TermsAndCondition from "../../../modules/common/components/TermsAndConditions";
import NotificationBanner from "../../../modules/common/components/NotificationBanner"; // Import NotificationBanner
import { PROJECT_PROPS } from "../../constants";

const Footer = () => {
  const [tcOpen, setTC] = useState(null);
  const handleTermsAndCond = () => setTC(true);
  const handleCloseTC = () => setTC(null);
  return (
    <>
      <div className="bg-secondary flex justify-end w-50 pr-5 py-2 md:pr-20 sm:pr-10 h-8 sticky bottom-0 z-100">
        <p onClick={handleTermsAndCond} className="pl-2 text-xs cursor-pointer text-white">
          Terms and Conditions
        </p>
        <p className="pl-2 text-xs text-white">{PROJECT_PROPS.BRAND.NAME} | Copyright</p>
      </div>
      <TermsAndCondition handleClose={handleCloseTC} open={tcOpen} />
      <div className="sm:hidden md:hidden lg:hidden xl:hidden 3xl:hidden 2xl::hidden fixed bottom-7 right-0 mb-4 mr-4 z-50">
        <NotificationBanner isMobileScreen={true} />
      </div>
    </>
  );
};
export default Footer;
