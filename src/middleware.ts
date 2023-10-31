import { Request, Response, NextFunction } from "express";

export function logRequestData(req: Request, res: Response, next: NextFunction) {
  console.log("Solicitud recibida. Datos de la solicitud:");
  console.log("Cuerpo:", req.body);
  console.log("Parámetros:", req.params);
  console.log("Query:", req.query);
  next();
}
