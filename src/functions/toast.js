import { toast } from "react-toastify";

const notify = (type, text) => {
  if (type === "success") {
    toast.success(text, {
      position: "top-right",
      autoClose: 1300,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  } else {
    toast.error(text, {
      position: "top-right",
      autoClose: 1300,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }
};
export { notify };
