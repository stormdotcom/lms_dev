import React from "react";
import { Dialog } from "@headlessui/react";

import CreateCourse from "./CreateCourse"; // Import your CreateCourse component
import { useDispatch, useSelector } from "react-redux";
import { STATE_REDUCER_KEY } from "../../constants";
import { actions } from "../../slice";
import { XMarkIcon } from "@heroicons/react/24/solid";

const EditingOverlay = () => {
    const isEditing = useSelector(state => state[STATE_REDUCER_KEY].isEditing);
    const dispatch = useDispatch();

    return (
        <div>
            <Dialog open={isEditing} onClose={() => dispatch(actions.setCourseEdit(false))} className="fixed z-10 inset-0 overflow-y-auto">
                <div className=" flex items-center justify-center min-h-screen">
                    <div className="bg-slate-200 p-3 rounded-md relative max-w-full mx-auto">
                        <button onClick={() => dispatch(actions.setCourseEdit(false))} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                            <XMarkIcon className="h-6 w-6" />
                        </button>
                        <CreateCourse isEditing={true} />
                    </div>
                </div>
            </Dialog>
        </div>
    );
};

export default EditingOverlay;
