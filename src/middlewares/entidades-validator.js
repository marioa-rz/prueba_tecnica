/**
 * Módulo de Middlewares de Validación para Entidades.
 * Define las reglas de express-validator para el recurso 'entidades',
 * asegurando la presencia de campos obligatorios como 'nombre' y 'tipo'.
 * Utiliza 'validateFields' para recoger los errores y 'handleErrors' para gestionarlos.
 */
import { body, param } from "express-validator";
import { validateFields } from "./validate-fields.js" 
import { handleErrors } from "./handle-errors.js"

// --- VALIDACIONES DE LECTURA Y ELIMINACIÓN ---

/**
 * @const getEntidadByIdValidator
 * @description Array de validación para la ruta GET /get/:id.
 * Se asegura de que el ID en el parámetro de la URL esté presente.
 */
export const getEntidadByIdValidator = [
    // Valida que el parámetro 'id' de la URL no esté vacío
    param("id").notEmpty().withMessage("El ID es requerido"),
    // Procesamiento de los resultados
    validateFields,
    handleErrors
];

/**
 * @const deleteEntidadValidator
 * @description Array de validación para la ruta DELETE /delete/:id.
 * Se asegura de que el ID en el parámetro de la URL esté presente.
 */
export const deleteEntidadValidator = [
    // Valida que el parámetro 'id' de la URL no esté vacío
    param("id").notEmpty().withMessage("El ID es requerido"),
    // Procesamiento de los resultados
    validateFields,
    handleErrors
];

// --- VALIDACIONES DE CREACIÓN Y ACTUALIZACIÓN ---

/**
 * @const postEntidadValidator
 * @description Array de validación para la ruta POST /create.
 * Asegura que los campos obligatorios para crear una entidad estén presentes en el body.
 */
export const postEntidadValidator = [
    // Valida que el nombre de la entidad esté presente en el body
    body("nombre").notEmpty().withMessage("El nombre de la entidad es requerido"),
    // Valida que el tipo de entidad esté presente en el body
    body("tipo").notEmpty().withMessage("El tipo de entidad es requerido"),
    // Procesamiento de los resultados
    validateFields,
    handleErrors
];

/**
 * @const putEntidadValidator
 * @description Array de validación para la ruta PUT /update/:id.
 * Asegura que el ID de la entidad y los campos de actualización estén presentes.
 */
export const putEntidadValidator = [
    // Valida que el parámetro 'id' de la URL no esté vacío
    param("id").notEmpty().withMessage("El ID es requerido"),
    // Valida que el nombre de la entidad esté presente en el body
    body("nombre").notEmpty().withMessage("El nombre de la entidad es requerido"),
    // Valida que el tipo de entidad esté presente en el body
    body("tipo").notEmpty().withMessage("El tipo de entidad es requerido"),
    // Procesamiento de los resultados
    validateFields,
    handleErrors
];