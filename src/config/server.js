import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import { testConnection } from "./postgresql.js";
import { notFound } from "../middlewares/not-found.js";

import monedasRoutes from "../modules/monedas/monedas.routes.js";

dotenv.config();

const middlewares = (app) => {
    app.use(express.json());
    app.use(cors());
    app.use(morgan("dev"));
}

const routes = (app) => {
    app.use("/api/v1/monedas", monedasRoutes);
}

export const initServer = async() => {
    const app = express();
    try{
        await testConnection();
        middlewares(app);
        routes(app);

        app.use(notFound);
        app.listen(process.env.PORT, () => {
            console.log(`Servidor ejecutandose en el puerto: ${process.env.PORT}`);
        })
    }catch(err){
        console.error("Error al inicializar el servidor: ", err);
        process.exit(1);
    }
}