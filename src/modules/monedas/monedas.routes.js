/**
 * Módulo de Rutas para la Gestión de Monedas.
 * Este módulo define los endpoints (URLs) disponibles para interactuar
 * con los recursos de monedas, enlazando cada ruta a un método HTTP,
 * un validador (middleware) y una función de controlador.
 */
import { Router } from "express";
import {
    deleteMoneda,
    getMonedaById,
    getMonedas,
    postMoneda,
    putMoneda
} from "./monedas.controller.js";
import {
    deleteMonedaValidator,
    getMonedaByIdValidator,
    postMonedaValidator,
    putMonedaValidator
} from "../../middlewares/monedas-validator.js";

// Inicializa el enrutador de Express
const router = Router();

// --- DEFINICIÓN DE RUTAS ---

/**
 * @route GET /get
 * @description Obtiene todas las monedas registradas.
 * @access Public (o según la configuración de autenticación global)
 */
router.get("/get", getMonedas);

/**
 * @route GET /get/:id
 * @description Obtiene una moneda específica por su ID.
 * @access Public
 * @middleware getMonedaByIdValidator - Valida que el ID proporcionado sea válido (ej: numérico).
 */
router.get("/get/:id", getMonedaByIdValidator, getMonedaById);

/**
 * @route POST /create
 * @description Crea una nueva moneda.
 * @access Public
 * @middleware postMonedaValidator - Valida que los datos del body (codigo_iso, nombre, pais) sean correctos.
 */
router.post("/create", postMonedaValidator, postMoneda);

/**
 * @route PUT /update/:id
 * @description Actualiza una moneda existente por su ID.
 * @access Public
 * @middleware putMonedaValidator - Valida el ID del parámetro y los datos del body.
 */
router.put("/update/:id", putMonedaValidator, putMoneda);

/**
 * @route DELETE /delete/:id
 * @description Elimina una moneda por su ID.
 * @access Public
 * @middleware deleteMonedaValidator - Valida que el ID proporcionado para la eliminación sea válido.
 */
router.delete("/delete/:id", deleteMonedaValidator, deleteMoneda);


// Exporta el enrutador para que pueda ser utilizado en el archivo principal (server.js o index.js)
export default router;