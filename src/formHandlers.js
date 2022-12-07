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

formButton.addEventListener("click", async (e) => {
    e.preventDefault();
    const isValidate = validate(dataForm);

    if (isValidate) {
        formButton.textContent = "Отправляю данные...";
        formButton.setAttribute("disabled", true);
        errTel.style.display = "none";

        try {
            const { data } = await axios.post(
                "http://localhost:8000/mail",
                dataForm
            );
            if (data?.result?.code === "EDNS") {
                const message = translateErrors("Internal Server Error");
                errTel.style.display = "block";
                errTel.innerText = message;
            } else {
                closeModalWindow();
            }
            console.log(data);
        } catch (error) {
            console.log(error);
            const message = translateErrors(error.message);
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
