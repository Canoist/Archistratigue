/**
 * Example:
 * EMAIL_HOST=smtp.sendgrid.net
 * EMAIL_HOST_PASSWORD=?
 * EMAIL_HOST_USER=apikey
 * EMAIL_PORT=587
 */

import express from "express";
import bodyParser from "body-parser";

import Mail from "./mail.js";
import chalk from "chalk";
import cors from "cors";

const PORT = process.env.PORT || 8000;

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => res.send(`It's works`));

app.post("/mail", async (req, res) => {
    const { email, ...rest } = req.body;
    console.log(req.body);
    return res.json({ result: await Mail.send(email, rest) });
});

app.listen(PORT, () => {
    console.log(chalk.bgGreenBright(` - Server is running on port :${PORT} `));
});
