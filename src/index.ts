import "reflect-metadata";
import express from "express";
import { getDataSource } from "./config/database";
import bodyParser from "body-parser";
import autoRouter from "./routes";

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

getDataSource()
.then(() => console.log("Database connected"))
.catch(console.error);

app.use("/api", autoRouter);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});