import closeModalWindow from "./closeModalWindow";
import {
    closeModalButton,
    formButton,
    modalWindow,
    orderButton,
} from "./elements";
import data from "./getDataForm";
import validate from "./validate";

formButton.addEventListener("click", (e) => {
    e.preventDefault();
    const isValidate = validate(data);
    if (isValidate) {
        closeModalWindow();
    }
});

orderButton.addEventListener("click", (e) => {
    modalWindow.classList.add("active");
});

closeModalButton.addEventListener("click", (e) => {
    closeModalWindow();
});
