import closeModalWindow from "./closeModalWindow";
import { closeModalButton, modalWindow, orderButton } from "./elements";

orderButton.addEventListener("click", (e) => {
    modalWindow.classList.add("active");
});

closeModalButton.addEventListener("click", (e) => {
    closeModalWindow();
});
