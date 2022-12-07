import closeModalWindow from "./closeModalWindow";
import {
    closeModalButton,
    formButton,
    modalWindow,
    orderButton,
} from "./elements";
import dataForm from "./getDataForm";
import validate from "./validate";
import axios from "axios";

formButton.addEventListener("click", async (e) => {
    e.preventDefault();
    formButton.textContent = "Отправляю данные...";
    formButton.setAttribute("disabled", true);
    try {
        const { code } = await axios.get("http://localhost:8000");
        console.log(code);
        console.log(dataForm);
        const isValidate = validate(dataForm);
        if (isValidate) {
            const { data } = await axios.post(
                "http://localhost:8000/mail",
                dataForm
            );
            console.log(data);
            closeModalWindow();
        }
    } catch (error) {
        console.log(error);
    } finally {
        formButton.textContent = "Подтвердить данные";
        formButton.removeAttribute("disabled");
    }
});

orderButton.addEventListener("click", (e) => {
    modalWindow.classList.add("active");
});

closeModalButton.addEventListener("click", (e) => {
    closeModalWindow();
});
