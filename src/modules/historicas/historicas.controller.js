/**
 * Módulo de Controladores para la gestión de Tasas Históricas.
 * Maneja la lógica de negocio y las respuestas HTTP para las operaciones CRUD
 * sobre los registros de tasas de cambio históricas, utilizando las funciones
 * del modelo 'historicas.model.js'.
 */
import {
    findHistoricas,
    findHistoricasById,
    createHistoricas,
    updateHistoricas,
    eliminateHistoricas
} from "./historicas.model.js"

/**
 * @function getHistoricas
 * @description Maneja la solicitud GET para obtener todos los registros históricos.
 * @param {Object} req - Objeto de solicitud de Express (Request).
 * @param {Object} res - Objeto de respuesta de Express (Response).
 * @returns {Promise<void>} Responde con un JSON que contiene todos los registros o un error 500.
 */
export const getHistoricas = async (req, res) => {
    try {
        // Llama a la función del modelo para obtener todos los registros históricos
        const result = await findHistoricas();
        // Responde con estado 200 OK y el resultado
        res.json({ result });
    } catch (err) {
        // Captura y responde con un error 500 si falla la consulta
        res.status(500).json({
            msg: "Error al obtener los registros histórico",
            error: err
        })
    }
}

/**
 * @function getHistoricasById
 * @description Maneja la solicitud GET para obtener un registro histórico por su ID.
 * @param {Object} req - Objeto de solicitud (espera 'id' en req.params).
 * @param {Object} res - Objeto de respuesta.
 * @returns {Promise<void>} Responde con el registro, un 404 si no existe, o un error 500.
 */
export const getHistoricasById = async (req, res) => {
    try {
        // Busca el registro por ID
        const result = await findHistoricasById(req.params.id);

        if (!result) {
            // Si no se encuentra, responde con 404 Not Found
            return res.status(404).json({
                msg: "Registro histórico no encontrado"
            })
        }

        // Responde con estado 200 OK y el registro
        res.json({ result });
    } catch (err) {
        // Captura y responde con un error 500
        res.status(500).json({
            msg: "Error al obtener registro histórico",
            error: err
        })
    }
}

/**
 * @function postHistoricas
 * @description Maneja la solicitud POST para crear un nuevo registro histórico.
 * @param {Object} req - Objeto de solicitud (espera campos del body para la creación).
 * @param {Object} res - Objeto de respuesta.
 * @returns {Promise<void>} Responde con el registro creado (201 Created) o un error 500.
 */
export const postHistoricas = async (req, res) => {
    try {
        // Desestructura todos los campos necesarios del cuerpo de la solicitud (incluyendo los IDs de FK)
        const { fecha_hora, tipo_transaccion, valor_tasa, entidad_id, moneda_base_id, moneda_objetivo_id } = req.body;

        // Llama a la función del modelo para crear el registro
        const newHistorica = await createHistoricas(fecha_hora, tipo_transaccion, valor_tasa, entidad_id, moneda_base_id, moneda_objetivo_id);
        // Responde con estado 201 Created y el objeto de la nueva tasa
        res.status(201).json(newHistorica);
    } catch (err) {
        // Captura errores
        res.status(500).json({
            msg: "Error al crear el registro histórico",
            error: err
        })
    }
}

/**
 * @function putHistoricas
 * @description Maneja la solicitud PUT/PATCH para actualizar un registro histórico existente.
 * Solo actualiza los campos permitidos (valor_tasa, tipo_transaccion).
 * @param {Object} req - Objeto de solicitud (espera 'id' en req.params y datos de actualización en req.body).
 * @param {Object} res - Objeto de respuesta.
 * @returns {Promise<void>} Responde con el registro actualizado, un 404, o un error 500.
 */
export const putHistoricas = async (req, res) => {
    try {
        const { valor_tasa, tipo_transaccion } = req.body;
        // Actualiza el registro por ID
        const updatedHistorica = await updateHistoricas(req.params.id, valor_tasa, tipo_transaccion);

        if (!updatedHistorica) {
            // Si no se devuelve el registro (ID no encontrado)
            return res.status(404).json({
                msg: "Registro histórico no encontrado"
            });
        }
        // Responde con estado 200 OK y el objeto actualizado
        res.json(updatedHistorica);
    } catch (err) {
        // Captura errores generales
        res.status(500).json({
            msg: "Error al actualizar el registro histórico",
            error: err
        })
    }
}

/**
 * @function deleteHistoricas
 * @description Maneja la solicitud DELETE para eliminar un registro histórico por su ID.
 * @param {Object} req - Objeto de solicitud (espera 'id' en req.params).
 * @param {Object} res - Objeto de respuesta.
 * @returns {Promise<void>} Responde con 204 No Content si tuvo éxito, 404 si no existe, o error 500.
 */
export const deleteHistoricas = async (req, res) => {
    try {
        // Elimina el registro por ID
        const deleted = await eliminateHistoricas(req.params.id); // Devuelve 1 o 0

        if (!deleted) {
            // Si rowCount es 0, el registro no existía
            return res.status(404).json({
                msg: "Registro historico no encontrado"
            })
        }

        // Responde con estado 204 No Content (eliminación exitosa)
        res.sendStatus(204);
    } catch (err) {
        // Captura errores generales
        res.status(500).json({
            msg: "Error al borrar registro historico",
            error: err
        })
    }
}