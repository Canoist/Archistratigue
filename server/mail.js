import chalk from "chalk";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const {
    EMAIL_HOST,
    EMAIL_HOST_PASSWORD,
    EMAIL_HOST_USER,
    EMAIL_PORT,
    EMAIL_OF_RECIEVER,
    EMAIL_OF_SENDER,

    DEV_EMAIL_HOST_PASSWORD,
    DEV_EMAIL_HOST_USER,
    DEV_EMAIL_OF_RECIEVER,
    DEV_EMAIL_OF_SENDER,
} = process.env;

class Mail {
    #transporter = null;

    constructor() {
        this.#transporter = this.#getTransporter();
    }

    #getTransporter() {
        if (process.env.NODE_ENV === "production") {
            return nodemailer.createTransport({
                host: EMAIL_HOST,
                port: EMAIL_PORT,
                secure: true,
                auth: {
                    user: EMAIL_HOST_USER,
                    pass: EMAIL_HOST_PASSWORD,
                },
            });
        } else {
            return nodemailer.createTransport({
                host: EMAIL_HOST,
                port: EMAIL_PORT,
                secure: true,
                auth: {
                    user: DEV_EMAIL_HOST_USER,
                    pass: DEV_EMAIL_HOST_PASSWORD,
                },
            });
        }
    }

    async send(data) {
        if (process.env.NODE_ENV === "production") {
            try {
                const info = await this.#transporter.sendMail({
                    from: EMAIL_OF_SENDER,
                    to: EMAIL_OF_RECIEVER,
                    subject: "Поступил новый заказ",
                    text: `
                Поступил новый заказ книги «На войне»
                Количество книг: ${data.amount}
                ФИО получателя: ${data.dataName}
                Адрес доставки: ${data.adress}
                Email: ${data.email}
                Контактный телефон: ${data.tel}`,
                    html: `
                <h3>Поступил новый заказ книги «На войне»</h3>
                <p>Количество книг: <b>${data.amount}</b></p>
                <p>ФИО получателя: <b>${data.dataName}</b></p>
                <p>Адрес доставки: <b>${data.adress}</b></p>
                <p>Email: <b>${data.email}</b></p>
                <p>Контактный телефон: <b>${data.tel}</b></p>,
                <p>Стоимость без учета доставки: <b>${
                    data.amount * 400
                } руб.</b></p>`,
                });
                await this.#transporter.sendMail({
                    from: EMAIL_OF_SENDER,
                    to: data.email,
                    subject: `Заказ книги «На войне»`,
                    text: `
                Поступил новый заказ книги «На войне»
                В ближайшее время наш представитель свяжется с Вами.

                Данные о вашем заказе:
                Количество книг: ${data.amount}
                ФИО получателя: ${data.dataName}
                Адрес доставки: ${data.adress}
                Стоимость без учета доставки: <b>${data.amount * 400} руб.`,
                    html: `
                <h3>Поступил новый заказ книги «На войне»</h3>
                <h4>В ближайшее время наш представитель свяжется с Вами для уточнения заказа.</h4>

                <p>Данные о вашем заказе:</p>
                <p>Количество книг: <b>${data.amount}</b></p>
                <p>ФИО получателя: <b>${data.dataName}</b></p>
                <p>Адрес доставки: <b>${data.adress}</b></p>
                <p>Стоимость без учета доставки: <b>${
                    data.amount * 400
                } руб.</b></p>`,
                });
                return info.messageId;
            } catch (e) {
                console.log(chalk.bgRedBright(e));
                throw e;
            }
        } else {
            try {
                const info = await this.#transporter.sendMail({
                    from: DEV_EMAIL_OF_SENDER,
                    to: DEV_EMAIL_OF_RECIEVER,
                    subject: "Поступил новый заказ",
                    text: `Получен заказ`,
                });
                return info.messageId;
            } catch (e) {
                console.log(chalk.bgRedBright(e));
                throw e;
            }
        }
    }
}

export default new Mail();
