import closeModalWindow from "./closeModalWindow";
import { closeModalButton, formButton, orderButton } from "./elements";
import validate from "./validate";

formButton.addEventListener("click", (e) => {
    e.preventDefault();
    const isValidate = validate(data);
    if (isValidate) {
        closeModalWindow();
    }
});

orderButton.addEventListener("click", (e) => {
    closeModalWindow();
});

closeModalButton.addEventListener("click", (e) => {
    closeModalWindow();
});
