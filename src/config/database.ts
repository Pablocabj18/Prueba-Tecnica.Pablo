import "reflect-metadata"
import { createConnection, Connection  } from "typeorm"
import { Auto } from "../entity/auto"

let connection: Connection | null = null;

export const getDataSource = async (): Promise<Connection> => {
    if (connection && connection.isConnected) {
        return connection;
}

connection = await createConnection({
    type: "mysql",
    host: "localhost",
    port: 3307,
    username: "root",
    password: "admin1234",
    database: "concesionaria",
    entities: [Auto],
    synchronize: true,
    logging: false
  });
  
  return connection;
};
