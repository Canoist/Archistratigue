import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

const toast = Toastify({
    text: "Заказ оформлен",
    duration: 3000,
    close: true,
    gravity: "bottom", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
});

export default toast;
