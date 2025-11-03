/**
 * Módulo de Arranque Principal de la Aplicación.
 * Este archivo es el punto de entrada (entry point) que se ejecuta al iniciar la aplicación.
 * Se encarga de cargar las variables de entorno y de iniciar el servidor.
 */
import { config } from "dotenv";
import { initServer } from "./config/server.js";

// 1. Carga las variables de entorno.
// Ejecuta dotenv.config() para leer el archivo .env y cargar sus variables en process.env.
config();

// 2. Inicializa el Servidor.
// Llama a la función que configura Express, conecta la base de datos y arranca la escucha.
initServer();

console.log("Aplicación iniciada. Esperando a que el servidor Express y la DB se conecten.");