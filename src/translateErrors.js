const translateErrors = (message) => {
    switch (message) {
        case "Network Error":
            return "Проблема с соединением, попробуйте позже";

        case "Internal Server Error":
            return "Внутренняя ошибка сервера. Напишите нам: archistratig230@gmail.com";

        default:
            return "Внутренняя ошибка. Напишите нам: archistratig230@gmail.com";
    }
};

export default translateErrors;
