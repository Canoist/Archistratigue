import {
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
    data.dataName = target.value.trim();
});

formAdress.addEventListener("change", ({ target }) => {
    data.adress = target.value.trim();
});

formEmail.addEventListener("change", ({ target }) => {
    data.email = target.value.trim();
});

formTel.addEventListener("change", ({ target }) => {
    data.tel = target.value.trim();
});

export default data;
