/**
 * Módulo de Inicialización del Servidor (Server Bootstrap).
 * Configura, inicializa la conexión con la base de datos,
 * define middlewares, establece las rutas y arranca el servidor Express.
 */
import express from "express";
import cors from "cors"; // Middleware para permitir peticiones desde otros dominios
import dotenv from "dotenv"; // Para cargar variables de entorno desde .env
import morgan from "morgan"; // Middleware para logging de peticiones
import { testConnection } from "./postgresql.js"; // Función de conexión a DB (asumiendo que está aquí)
import { notFound } from "../middlewares/not-found.js"; // Middleware para manejo de rutas 404

// Importación de Módulos de Rutas
import monedasRoutes from "../modules/monedas/monedas.routes.js";
import entitadesRoutes from "../modules/entidades/entidades.routes.js";
import historicasRoutes from "../modules/historicas/historicas.routes.js";

// Carga las variables de entorno
dotenv.config();

/**
 * @function middlewares
 * @description Configura los middlewares globales de la aplicación Express.
 * @param {Object} app - Instancia de la aplicación Express.
 */
const middlewares = (app) => {
    // Permite que Express maneje JSON en las peticiones (req.body)
    app.use(express.json()); 
    // Habilita CORS para permitir solicitudes de origen cruzado
    app.use(cors()); 
    // Habilita el logging de peticiones HTTP en formato 'dev' (conciso)
    app.use(morgan("dev")); 
}

/**
 * @function routes
 * @description Define y monta los enrutadores específicos de cada módulo.
 * Todas las rutas están prefijadas con /api/v1/.
 * @param {Object} app - Instancia de la aplicación Express.
 */
const routes = (app) => {
    // Monta las rutas del módulo de monedas
    app.use("/api/v1/monedas", monedasRoutes);
    // Monta las rutas del módulo de entidades
    app.use("/api/v1/entidades", entitadesRoutes);
    // Monta las rutas del módulo de históricas
    app.use("/api/v1/historicas", historicasRoutes);
}

/**
 * @function initServer
 * @description Función principal asíncrona que inicializa y arranca el servidor.
 */
export const initServer = async () => {
    const app = express();
    try {
        // 1. Conexión a la Base de Datos
        await testConnection(); 
        console.log("Conexión a PostgreSQL establecida con éxito.");

        // 2. Configuración de Middlewares
        middlewares(app);
        
        // 3. Definición de Rutas
        routes(app);

        // 4. Manejo de Rutas No Encontradas (404)
        // Este middleware debe ir después de todas las rutas definidas
        app.use(notFound);

        // 5. Arranque del Servidor
        app.listen(process.env.PORT, () => {
            console.log(`Servidor ejecutandose en el puerto: ${process.env.PORT}`);
        })
    } catch (err) {
        // Captura y registra cualquier error crítico (DB o arranque)
        console.error("Error al inicializar el servidor: ", err);
        // Termina el proceso con código de error
        process.exit(1);
    }
}