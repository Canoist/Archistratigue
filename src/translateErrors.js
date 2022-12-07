const translateErrors = (message) => {
    switch (message) {
        case "Network Error":
            return "Проблема с соединением, попробуйте позже";

        case "Internal Server Error":
            return "Внутренняя ошибка сервера. Свяжитесь с тех. поддержкой";

        default:
            break;
    }
};

export default translateErrors;
