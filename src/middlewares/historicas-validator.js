/**
 * Módulo de Middlewares de Validación para Tasas Históricas.
 * Define las reglas de express-validator para asegurar que los datos
 * proporcionados para el recurso 'historicas' cumplan con el formato esperado.
 */
import { body, param } from "express-validator";
import { validateFields } from "./validate-fields.js"
import { handleErrors } from "./handle-errors.js"

// --- VALIDACIONES DE LECTURA Y ELIMINACIÓN ---

/**
 * @const getHistoricasByIdValidator
 * @description Array de validación para la ruta GET /get/:id.
 * Se asegura de que el ID en el parámetro de la URL esté presente.
 */
export const getHistoricasByIdValidator = [
    // Valida que el parámetro 'id' no esté vacío (asume que el controlador verificará si es un ID válido)
    param("id").notEmpty().withMessage("El ID es requerido"),
    // Middleware que recoge y procesa los errores
    validateFields,
    handleErrors
];

/**
 * @const deleteHistoricasValidator
 * @description Array de validación para la ruta DELETE /delete/:id.
 * Se asegura de que el ID en el parámetro de la URL esté presente.
 */
export const deleteHistoricasValidator = [
    // Valida que el parámetro 'id' no esté vacío
    param("id").notEmpty().withMessage("El ID es requerido"),
    validateFields,
    handleErrors
];

// --- VALIDACIONES DE CREACIÓN Y ACTUALIZACIÓN ---

/**
 * @const postHistoricasValidator
 * @description Array de validación para la ruta POST /create.
 * Valida todos los campos necesarios para crear un registro histórico,
 * incluyendo las claves foráneas (IDs).
 */
export const postHistoricasValidator = [
    // Valida y verifica que sea un formato de fecha y hora ISO 8601
    body("fecha_hora").isISO8601().withMessage("La fecha y hora deben ser válidas"),
    // Valida que el tipo de transacción sea uno de los valores permitidos (enumeración)
    body("tipo_transaccion").isIn(['compra', 'venta']).withMessage("El tipo debe ser 'compra' o 'venta'"),
    // Valida que el valor de la tasa sea un número flotante mayor que cero
    body("valor_tasa").isFloat({ gt: 0 }).withMessage("El valor de la tasa debe ser un número positivo"),
    // Valida que el ID de la entidad sea un formato UUID válido (asumiendo que los IDs son UUIDs)
    body("entidad_id").isUUID().withMessage("El ID de la entidad debe ser un UUID válido"),
    // Valida que el ID de la moneda base sea un formato UUID válido
    body("moneda_base_id").isUUID().withMessage("El ID de la moneda base debe ser un UUID válido"),
    // Valida que el ID de la moneda objetivo sea un formato UUID válido
    body("moneda_objetivo_id").isUUID().withMessage("El ID de la moneda objetivo debe ser un UUID válido"),
    validateFields,
    handleErrors
];

/**
 * @const putHistoricasValidator
 * @description Array de validación para la ruta PUT /update/:id.
 * Valida los campos que se permiten actualizar (valor_tasa, tipo_transaccion) y el ID del registro.
 */
export const putHistoricasValidator = [
    // Valida que el ID del parámetro sea un formato UUID válido
    param("id").isUUID().withMessage("El ID del registro debe ser un UUID válido"),
    // Valida que el valor de la tasa sea un número positivo
    body("valor_tasa").isFloat({ gt: 0 }).withMessage("El valor de la tasa debe ser un número positivo"),
    // Valida el tipo, pero lo hace opcional (optional()) en caso de que solo se actualice la tasa
    body("tipo_transaccion").isIn(['compra', 'venta']).optional().withMessage("El tipo debe ser 'compra' o 'venta'"),
    validateFields,
    handleErrors
];