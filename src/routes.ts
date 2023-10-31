import express, { Router } from "express";
import { AutoController } from "./controller";
import { AutoRepository } from "./repository";

const autoRouter = express.Router();
const autoController = new AutoController();


import { logRequestData } from "./middleware";

autoRouter.post("/auto", logRequestData, autoController.create.bind(autoController));
autoRouter.get("/auto/:id", autoController.get.bind(autoController));
autoRouter.put("/auto/:id", logRequestData, autoController.update.bind(autoController));
export default autoRouter;
