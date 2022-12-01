import {
    errAdress,
    errDataName,
    errEmail,
    errTel,
    formAdress,
    formDataName,
    formEmail,
    formTel,
} from "./elements";

export default function validate(data) {
    const emailRegExp = /^\S+@\S+\.\S+$/g;

    console.log(emailRegExp.test(data.email));

    if (data.dataName.length <= 3) {
        formDataName.classList.add("error");
        errDataName.style.display = "block";
        errDataName.innerText = "Минимальное кол-во символов - 4";
    }

    if (data.adress.length <= 12) {
        formAdress.classList.add("error");
        errAdress.style.display = "block";
        errAdress.innerText = "Минимальное кол-во символов - 12";
    }

    if (!emailRegExp.test(data.email)) {
        formEmail.classList.add("error");
        errEmail.style.display = "block";
        errEmail.innerText = "Не правильно введена почта";
    }

    if (data.tel.length <= 10) {
        formTel.classList.add("error");
        errTel.style.display = "block";
        errTel.innerText =
            "Проверьте правильность ввода телефона. Минимальная длина - 10 символов";
    }
}
