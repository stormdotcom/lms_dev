import React from "react";
import { createPortal } from "react-dom";
import { Close } from "../Icons";

const Modal = ({ open, handleClose, children }) => {
  if (!open) {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg overflow-hidden shadow-xl max-w-lg w-full">
        <div className="p-4">{children}</div>
        <div className="p-4 text-right">
          <button
            onClick={handleClose}
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
          >
            <Close />
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
