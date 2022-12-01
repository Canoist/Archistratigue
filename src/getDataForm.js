import {
    errAdress,
    errDataName,
    errEmail,
    errTel,
    formAdress,
    formBooks,
    formCoast,
    formDataName,
    formEmail,
    formTel,
} from "./elements";

const data = {
    amount: 1,
    dataName: "",
    adress: "",
    email: "",
    tel: "",
};

formBooks.addEventListener("change", ({ target }) => {
    data.amount = target.value;
    formCoast.textContent = `${data.amount * 400} руб.`;
});

formDataName.addEventListener("change", ({ target }) => {
    target.classList.remove("error");
    data.dataName = target.value.trim();
    errDataName.style.display = "none";
});

formAdress.addEventListener("change", ({ target }) => {
    target.classList.remove("error");
    data.adress = target.value.trim();
    errAdress.style.display = "none";
});

formEmail.addEventListener("change", ({ target }) => {
    target.classList.remove("error");
    data.email = target.value.trim();
    errEmail.style.display = "none";
});

formTel.addEventListener("change", ({ target }) => {
    target.classList.remove("error");
    data.tel = target.value.trim();
    errTel.style.display = "none";
});

export default data;
