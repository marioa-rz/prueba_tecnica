/**
 * Módulo de Middlewares de Validación para Monedas.
 * Define las reglas de express-validator para cada tipo de solicitud
 * (GET por ID, POST, PUT, DELETE) al recurso 'monedas'.
 * Utiliza los middlewares 'validateFields' y 'handleErrors' para procesar el resultado.
 */
import { body, param } from "express-validator";
import { validateFields } from "./validate-fields.js"
import { handleErrors } from "./handle-errors.js" 

// --- VALIDACIONES DE LECTURA Y ELIMINACIÓN ---

/**
 * @const getMonedaByIdValidator
 * @description Array de validación para la ruta GET /get/:id.
 * Se asegura de que el ID en el parámetro de la URL esté presente.
 */
export const getMonedaByIdValidator = [
    // Valida que el parámetro 'id' no esté vacío
    param("id").notEmpty().withMessage("El ID es requerido"),
    // Middleware que recoge los errores de express-validator
    validateFields, 
    // Middleware para formatear y enviar la respuesta de error (si hay)
    handleErrors 
];

/**
 * @const deleteMonedaValidator
 * @description Array de validación para la ruta DELETE /delete/:id.
 * Se asegura de que el ID en el parámetro de la URL esté presente.
 */
export const deleteMonedaValidator = [
    // Valida que el parámetro 'id' no esté vacío
    param("id").notEmpty().withMessage("El ID es requerido"),
    validateFields,
    handleErrors
];

// --- VALIDACIONES DE CREACIÓN Y ACTUALIZACIÓN ---

/**
 * @const postMonedaValidator
 * @description Array de validación para la ruta POST /create.
 * Se asegura de que los campos obligatorios para crear una moneda estén presentes en el body.
 */
export const postMonedaValidator = [
    // Valida que 'codigo_iso' en el body no esté vacío
    body("codigo_iso").notEmpty().withMessage("El codigo iso es requerido"),
    // Valida que 'nombre' en el body no esté vacío
    body("nombre").notEmpty().withMessage("El nombre es requerido"),
    // Valida que 'pais' en el body no esté vacío
    body("pais").notEmpty().withMessage("El pais es requerido"),
    // Procesamiento de los resultados de las validaciones
    validateFields,
    handleErrors
];

/**
 * @const putMonedaValidator
 * @description Array de validación para la ruta PUT /update/:id.
 * Se asegura de que todos los campos requeridos para la actualización (incluido el id) estén presentes.
 * * NOTA: Esta validación está configurada para esperar el 'id' en el body además de los campos actualizables.
 */
export const putMonedaValidator = [
    // Valida que 'id' en el body no esté vacío (necesario para el update)
    body("id").notEmpty().withMessage("El id es requerido"), 
    body("codigo_iso").notEmpty().withMessage("El codigo iso es requerido"),
    body("nombre").notEmpty().withMessage("El nombre es requerido"),
    body("pais").notEmpty().withMessage("El pais es requerido"),
    // Procesamiento
    validateFields,
    handleErrors
];