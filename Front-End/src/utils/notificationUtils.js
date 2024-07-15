import { notify } from "reapop";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const NOTIFICATION_PROPS = {
    id: "",
    title: "",
    message: "",
    dismissible: false,
    dismissAfter: 2500,
    position: "top-right",
    allowHTML: true
};

export const successNotify = (props) => notify({ ...NOTIFICATION_PROPS, ...props, status: "success" });

export const infoNotify = (props) => notify({ ...NOTIFICATION_PROPS, ...props, status: "info" });

export const warningNotify = (props) => notify({ ...NOTIFICATION_PROPS, ...props, status: "warning", dismissAfter: 4000 });

export const errorNotify = (props) => notify({ ...NOTIFICATION_PROPS, ...props, status: "error", dismissAfter: 4000 });

export const loaderNotify = (props) => notify({ ...NOTIFICATION_PROPS, ...props, status: "loading" });


export const confirmDialog = (payload = {}) => MySwal.fire({
    title: "<h2 class='text-2xl font-bold text-gray-800'>Are you sure?</h2>",
    showDenyButton: true,
    confirmButtonText: "<span class='px-4 py-2 text-white bg-purple-500 rounded-md'>OK</span>",
    denyButtonText: "<span class='px-4 py-2 text-white bg-red-500 rounded-md'>Cancel</span>",
    denyButtonColor: "transparent",
    confirmButtonColor: "transparent",
    customClass: {
        popup: "bg-white shadow-lg rounded-lg p-6",
        title: "text-gray-800",
        content: "text-gray-600",
        confirmButton: "",
        denyButton: ""
    },
    buttonsStyling: false,
    ...payload
});
