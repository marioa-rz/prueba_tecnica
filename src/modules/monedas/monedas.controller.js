/**
 * Módulo de Controladores para la gestión de Monedas.
 * Este módulo maneja la lógica de negocio y la respuesta HTTP para
 * las operaciones CRUD (Crear, Leer, Actualizar, Eliminar) de monedas,
 * utilizando las funciones del modelo 'monedas.model.js'.
 */
import {
    createMoneda,
    findMonedaById,
    findMonedas,
    updateMoneda,
    eliminateMoneda
} from "./monedas.model.js"

/**
 * @function getMonedas
 * @description Maneja la solicitud GET para obtener todas las monedas.
 * @param {Object} req - Objeto de solicitud de Express (Request).
 * @param {Object} res - Objeto de respuesta de Express (Response).
 * @returns {Promise<void>} Responde con un JSON que contiene todas las monedas o un error 500.
 */
export const getMonedas = async (req, res) => {
    try {
        // Llama a la función del modelo para obtener todos los registros
        const result = await findMonedas();
        // Responde con estado 200 OK y el resultado
        res.json({ result });
    } catch (err) {
        // Captura y responde con un error 500 si falla la consulta
        res.status(500).json({
            msg: "Error al obtener las monedas",
            error: err
        })
    }
}

/**
 * @function getMonedaById
 * @description Maneja la solicitud GET para obtener una moneda por su ID.
 * @param {Object} req - Objeto de solicitud (espera 'id' en req.params).
 * @param {Object} res - Objeto de respuesta.
 * @returns {Promise<void>} Responde con la moneda, un 404 si no existe, o un error 500.
 */
export const getMonedaById = async (req, res) => {
    try {
        // Extrae el ID de los parámetros de la URL y busca la moneda
        const result = await findMonedaById(req.params.id);

        if (!result) {
            // Si no se encuentra, responde con 404 Not Found
            return res.status(404).json({
                msg: "Moneda no encontrada"
            })
        }

        // Responde con estado 200 OK y la moneda
        res.json({ result });
    } catch (err) {
        // Captura y responde con un error 500 (ej. error de conexión a la DB o ID inválido)
        res.status(500).json({
            msg: "Error al obtener moneda",
            error: err
        })
    }
}

/**
 * @function postMoneda
 * @description Maneja la solicitud POST para crear una nueva moneda.
 * @param {Object} req - Objeto de solicitud (espera 'codigo_iso', 'nombre', 'pais' en req.body).
 * @param {Object} res - Objeto de respuesta.
 * @returns {Promise<void>} Responde con la moneda creada (201 Created) o un error 500.
 */
export const postMoneda = async (req, res) => {
    try {
        // Desestructura los datos necesarios del cuerpo de la solicitud
        const { codigo_iso, nombre, pais } = req.body;

        // Llama a la función del modelo para crear el registro
        const newMoneda = await createMoneda(codigo_iso, nombre, pais);
        // Responde con estado 201 Created y el objeto de la moneda creada
        res.status(201).json(newMoneda);
    } catch (err) {
        // Captura errores (ej. validación de DB, campos faltantes)
        res.status(500).json({
            msg: "Error al crear la moneda",
            error: err
        })
    }
}

/**
 * @function putMoneda
 * @description Maneja la solicitud PUT/PATCH para actualizar una moneda existente.
 * @param {Object} req - Objeto de solicitud (espera 'id' en req.params y datos en req.body).
 * @param {Object} res - Objeto de respuesta.
 * @returns {Promise<void>} Responde con la moneda actualizada, un 404, o un error 500.
 */
export const putMoneda = async (req, res) => {
    try {
        const { codigo_iso, nombre, pais } = req.body;
        // Llama a la función del modelo para actualizar
        const updatedMoneda = await updateMoneda(req.params.id, codigo_iso, nombre, pais);

        if (!updatedMoneda) {
            // Si la función de actualización no devuelve nada (ID no encontrado)
            return res.status(404).json({
                msg: "Moneda no encontrada"
            });
        }
        // Responde con estado 200 OK y el objeto actualizado
        res.json(updatedMoneda);
    } catch (err) {
        // Captura errores generales de la operación
        res.status(500).json({
            msg: "Error inesperado al actualizar", // Se simplifica el mensaje de error para el frontend
            error: err.message || "Error desconocido"
        })
    }
}

/**
 * @function deleteMoneda
 * @description Maneja la solicitud DELETE para eliminar una moneda por su ID.
 * @param {Object} req - Objeto de solicitud (espera 'id' en req.params).
 * @param {Object} res - Objeto de respuesta.
 * @returns {Promise<void>} Responde con 204 No Content si tuvo éxito, 404 si no existe, o error 500.
 */
export const deleteMoneda = async (req, res) => {
    try {
        // Llama a la función del modelo para eliminar
        const deleted = await eliminateMoneda(req.params.id); // Devuelve 1 o 0

        if (!deleted) {
            // Si rowCount es 0, significa que la moneda no existía
            return res.status(404).json({
                msg: "Moneda no encontrada"
            })
        }

        // Responde con estado 204 No Content (eliminación exitosa sin cuerpo de respuesta)
        res.sendStatus(204);
    } catch (err) {
        // Captura errores generales
        res.status(500).json({
            msg: "Error al borrar moneda",
            error: err
        })
    }
}