import { Request, Response } from "express";
import { getDataSource } from "./config/database";
import { Auto } from "./entity/auto";
import { AutoRepository } from "./repository";

const autoRepository = new AutoRepository();

export class AutoController {
    async create(req: Request, res: Response) {
        try {
            const newAuto = new Auto();
            newAuto.modelo = req.body.modelo;
            newAuto.marca = req.body.marca;
            newAuto.año = req.body.año;
            newAuto.precio = req.body.precio;
            newAuto.cantidadDisponible = req.body.cantidadDisponible;

            const savedAuto = await autoRepository.create(newAuto);
            res.status(201).json(savedAuto);
        } catch (error) {
            res.status(500).send("Internal Server Error");
        }
    }

    async get(req: Request, res: Response) {
        const connection = await getDataSource();
        const autoRepository = connection.getRepository(Auto);
        const autoId = parseInt(req.params.id);
        if (isNaN(autoId) || autoId < 0) {
            return res.status(400).send("Invalid auto id provided");
        }
        const auto = await autoRepository.findOne({ where: { id: autoId } });
        if (!auto) {
            return res.status(404).send("Auto not found");
        }
        res.send(auto);
    }    
    

    async update(req: Request, res: Response) {
        const connection = await getDataSource();
        const autoRepository = connection.getRepository(Auto);
        const auto = await autoRepository.findOne({ where: { id: parseInt(req.params.id) } });
        if (!auto) {
            return res.status(404).send("Auto not found");
        }
        autoRepository.merge(auto, req.body);
        const result = await autoRepository.save(auto);
        res.send(result);
    }
}