import closeModalWindow from "./closeModalWindow";
import { closeModalButton } from "./elements";

closeModalButton.addEventListener("click", (e) => {
    closeModalWindow();
});
