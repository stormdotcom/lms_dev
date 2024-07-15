import React from "react";
import Modal from "../../../../common/components/Modal";

const TermsAndCondition = ({ handleClose, open }) => {
  return (
    <Modal isOpen={open} onRequestClose={handleClose}>
      <div className="p-4">
        <h2 className="text-lg font-bold">Terms and Conditions</h2>
        <p>Here are the terms and conditions...</p>
        <button
          onClick={handleClose}
          className="mt-4 px-4 py-2 bg-primary-light text-white rounded"
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

export default TermsAndCondition;
