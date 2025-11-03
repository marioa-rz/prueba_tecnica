/**
 * Módulo de Rutas para la Gestión de Tasas de Cambio Históricas.
 * * Define los endpoints (URLs) disponibles para interactuar con el recurso de
 * tasas históricas, aplicando un validador (middleware) y enlazando cada ruta
 * a su función controladora correspondiente.
 */
import { Router } from "express";
import {
    deleteHistoricas,
    getHistoricas,
    getHistoricasById,
    postHistoricas,
    putHistoricas
} from "./historicas.controller.js";
import {
    deleteHistoricasValidator,
    getHistoricasByIdValidator,
    postHistoricasValidator,
    putHistoricasValidator
} from "../../middlewares/historicas-validator.js";

// Inicializa el enrutador de Express
const router = Router();

// --- DEFINICIÓN DE RUTAS (Endpoints) ---

/**
 * @route GET /get
 * @description Obtiene todas las tasas de cambio históricas.
 * @access Public
 */
router.get("/get", getHistoricas);

/**
 * @route GET /get/:id
 * @description Obtiene una tasa histórica específica por su ID.
 * @access Public
 * @middleware getHistoricasByIdValidator - Valida que el ID proporcionado en el parámetro sea válido.
 */
router.get("/get/:id", getHistoricasByIdValidator, getHistoricasById);

/**
 * @route POST /create
 * @description Crea un nuevo registro de tasa de cambio histórica.
 * @access Public
 * @middleware postHistoricasValidator - Valida los datos del cuerpo de la solicitud (body).
 */
router.post("/create", postHistoricasValidator, postHistoricas);

/**
 * @route PUT /update/:id
 * @description Actualiza un registro de tasa histórica existente por su ID.
 * @access Public
 * @middleware putHistoricasValidator - Valida el ID del parámetro y los datos del body.
 */
router.put("/update/:id", putHistoricasValidator, putHistoricas);

/**
 * @route DELETE /delete/:id
 * @description Elimina un registro de tasa histórica por su ID.
 * @access Public
 * @middleware deleteHistoricasValidator - Valida que el ID proporcionado para la eliminación sea válido.
 */
router.delete("/delete/:id", deleteHistoricasValidator, deleteHistoricas);


// Exporta el enrutador para que pueda ser montado en la aplicación principal
export default router;