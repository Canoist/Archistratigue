import express from "express";
import bodyParser from "body-parser";

import Mail from "./mail.js";
import chalk from "chalk";
import cors from "cors";

const PORT = process.env.PORT || 8000;

const app = express();

app.use(bodyParser.json());
app.use(cors());

if (process.env.NODE_ENV === "production") {
    app.use("/", express.static(path.join(__dirname)));

    const indexPath = path.join(__dirname, "index.html");
    app.get("*", (req, res) => {
        res.sendFile(indexPath);
    });
}

app.get("/api", (req, res) => res.send(`It's works`));

app.post("/api/mail", async (req, res) => {
    const data = req.body;
    try {
        const result = await Mail.send(data);
        return res.json({ result });
    } catch (error) {
        res.status(500).json({
            message:
                "Ошибка на сервере, напишите нам, пожалуйста: archistratig230@gmail.com",
        });
    }
});

app.listen(PORT, () => {
    console.log(chalk.bgGreenBright(` - Server is running on port :${PORT} `));
});
