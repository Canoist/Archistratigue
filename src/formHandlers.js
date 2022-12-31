import closeModalWindow from "./closeModalWindow";
import {
    closeModalButton,
    errTel,
    formButton,
    modalWindow,
    orderButton,
} from "./elements";
import dataForm from "./getDataForm";
import validate from "./validate";
import axios from "axios";
import translateErrors from "./translateErrors";
import toast from "./toastify";
import configFile from "./config.json";

formButton.addEventListener("click", async (e) => {
    e.preventDefault();
    const isValidate = validate(dataForm);

    if (isValidate) {
        formButton.textContent = "Отправляю данные...";
        formButton.setAttribute("disabled", true);
        errTel.style.display = "none";

        try {
            await axios.post(`${configFile.appEndPoint}/mail`, dataForm);
            closeModalWindow();
            toast.showToast();
        } catch (error) {
            const message = translateErrors(
                error?.response?.data?.message
                    ? error.response.data.message
                    : error.message
            );
            errTel.style.display = "block";
            errTel.innerText = message;
        } finally {
            formButton.textContent = "Подтвердить данные";
            formButton.removeAttribute("disabled");
        }
    }
});

orderButton.addEventListener("click", (e) => {
    modalWindow.classList.add("active");
});

closeModalButton.addEventListener("click", (e) => {
    closeModalWindow();
});
