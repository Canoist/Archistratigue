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
} = process.env;

class Mail {
    #transporter = null;

    constructor() {
        this.#transporter = this.#getTransporter();
    }

    #getTransporter() {
        return nodemailer.createTransport({
            host: EMAIL_HOST,
            port: EMAIL_PORT,
            secure: true,
            auth: {
                user: EMAIL_HOST_USER,
                pass: EMAIL_HOST_PASSWORD,
            },
        });
    }

    async send(sender, data) {
        try {
            const info = await this.#transporter.sendMail({
                from: sender,
                to: EMAIL_OF_RECIEVER,
                subject: "Поступил новый заказ",
                text: data.message + data.about,
                html: `<b>${data.message}</b>
                <p>${data.about}</p>`,
            });
            return info.messageId;
        } catch (e) {
            return e;
        }
    }
}

export default new Mail();
