import React from "react";
import { Flip, toast, ToastContainer } from "react-toastify";

export default function ToastifyBody() {
  return <ToastContainer transition={Flip} />;
}
export const toastError = (msg, position = "top-left") => {
  toast.error(msg, {
    position: position,
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const toastWarning = (msg, position = "top-left") => {
  toast.warning(msg, {
    position: position,
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const toastSuccess = (msg, position = "top-left") => {
  toast.success(msg, {
    position: position,
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
export const toastInfo = (msg, position = "top-left") => {
  toast.info(msg, {
    position: position,
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
