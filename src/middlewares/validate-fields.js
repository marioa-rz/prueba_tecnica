/**
 * Módulo de Middleware General.
 * Contiene funciones intermedias para procesar la solicitud antes de que llegue
 * al controlador, en este caso, para manejar los errores de validación.
 */
import { validationResult } from "express-validator";

/**
 * @function validateFields
 * @description Middleware que comprueba los resultados de las validaciones
 * definidas por express-validator para una ruta específica.
 * @param {Object} req - Objeto de solicitud de Express (Request).
 * @param {Object} res - Objeto de respuesta de Express (Response).
 * @param {Function} next - Función para pasar el control al siguiente middleware/controlador.
 * @returns {void} Si hay errores, llama a next() con los errores. Si no hay errores, llama a next() sin argumentos.
 */
export const validateFields = (req, res, next) => {
    // Captura los errores de validación acumulados en la solicitud
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        // Si hay errores, en lugar de enviar la respuesta directamente,
        // se llama a next() con los errores. Esto permite que un middleware de manejo
        // de errores centralizado (global) procese y envíe la respuesta 400 Bad Request.
        return next(errors);
    }

    // Si no hay errores de validación, pasa el control a la siguiente función (controlador)
    next();
}