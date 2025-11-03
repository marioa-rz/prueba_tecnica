/**
 * Módulo de Rutas para la Gestión de Entidades (ej: Bancos, Proveedores de Datos).
 * * Define los endpoints (URLs) disponibles para interactuar con el recurso de
 * entidades, aplicando middlewares de validación y enlazando cada ruta
 * a su función controladora correspondiente.
 */
import { Router } from "express";
import { 
    deleteEntidad, 
    getEntidadById, 
    getEntidades, 
    postEntidad, 
    putEntidad 
} from "./entidades.controller.js";
import { 
    deleteEntidadValidator, 
    getEntidadByIdValidator, 
    postEntidadValidator, 
    putEntidadValidator 
} from "../../middlewares/entidades-validator.js";

// Inicializa el enrutador de Express
const router = Router();

// --- DEFINICIÓN DE RUTAS (Endpoints) ---

/**
 * @route GET /get
 * @description Obtiene todas las entidades registradas.
 * @access Public
 */
router.get("/get", getEntidades);

/**
 * @route GET /get/:id
 * @description Obtiene una entidad específica por su ID.
 * @access Public
 * @middleware getEntidadByIdValidator - Valida que el ID proporcionado sea válido (ej: numérico).
 */
router.get("/get/:id", getEntidadByIdValidator, getEntidadById);

/**
 * @route POST /create
 * @description Crea una nueva entidad.
 * @access Public
 * @middleware postEntidadValidator - Valida que los datos del cuerpo de la solicitud (body) sean correctos.
 */
router.post("/create", postEntidadValidator, postEntidad);

/**
 * @route PUT /update/:id
 * @description Actualiza una entidad existente por su ID.
 * @access Public
 * @middleware putEntidadValidator - Valida el ID del parámetro y los datos de actualización del body.
 */
router.put("/update/:id", putEntidadValidator, putEntidad);

/**
 * @route DELETE /delete/:id
 * @description Elimina una entidad por su ID.
 * @access Public
 * @middleware deleteEntidadValidator - Valida que el ID proporcionado para la eliminación sea válido.
 */
router.delete("/delete/:id", deleteEntidadValidator, deleteEntidad);


// Exporta el enrutador para que pueda ser montado en la aplicación principal
export default router;