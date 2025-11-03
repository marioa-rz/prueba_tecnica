/**
 * Módulo de Controladores para la gestión de Entidades.
 * Maneja la lógica de negocio y las respuestas HTTP (Request/Response) para las
 * operaciones CRUD sobre las entidades, utilizando las funciones del modelo 'entidades.model.js'.
 */
import { 
    createEntidad, 
    findEntidadById, 
    findEntidades, 
    updateEntidad, 
    eliminateEntidad 
} from "./entidades.model.js"

/**
 * @function getEntidades
 * @description Maneja la solicitud GET para obtener todas las entidades.
 * @param {Object} req - Objeto de solicitud de Express (Request).
 * @param {Object} res - Objeto de respuesta de Express (Response).
 * @returns {Promise<void>} Responde con un JSON que contiene todas las entidades o un error 500.
 */
export const getEntidades = async (req, res) => {
    try {
        // Llama a la función del modelo para obtener todos los registros
        const result = await findEntidades();
        // Responde con estado 200 OK y el resultado
        res.json({ result });
    } catch (err) {
        // Captura y responde con un error 500 si falla la consulta
        res.status(500).json({
            msg: "Error al obtener las entidades",
            error: err
        })
    }
}

/**
 * @function getEntidadById
 * @description Maneja la solicitud GET para obtener una entidad por su ID.
 * @param {Object} req - Objeto de solicitud (espera 'id' en req.params).
 * @param {Object} res - Objeto de respuesta.
 * @returns {Promise<void>} Responde con la entidad, un 404 si no existe, o un error 500.
 */
export const getEntidadById = async (req, res) => {
    try {
        // Busca la entidad por ID
        const result = await findEntidadById(req.params.id);

        if (!result) {
            // Si no se encuentra, responde con 404 Not Found
            return res.status(404).json({
                msg: "Entidad no encontrada"
            })
        }

        // Responde con estado 200 OK y la entidad
        res.json({ result });
    } catch (err) {
        // Captura y responde con un error 500
        res.status(500).json({
            msg: "Error al obtener entidad",
            error: err
        })
    }
}

/**
 * @function postEntidad
 * @description Maneja la solicitud POST para crear una nueva entidad.
 * @param {Object} req - Objeto de solicitud (espera 'nombre' y 'tipo' en req.body).
 * @param {Object} res - Objeto de respuesta.
 * @returns {Promise<void>} Responde con la entidad creada (201 Created) o un error 500.
 */
export const postEntidad = async (req, res) => {
    try {
        // Desestructura los campos necesarios del cuerpo de la solicitud
        const { nombre, tipo } = req.body

        // Llama a la función del modelo para crear el registro
        const newEntidad = await createEntidad(nombre, tipo);
        // Responde con estado 201 Created y el objeto de la nueva entidad
        res.status(201).json(newEntidad);
    } catch (err) {
        // Captura errores
        res.status(500).json({
            msg: "Error al crear la entidad",
            error: err
        })
    }
}

/**
 * @function putEntidad
 * @description Maneja la solicitud PUT/PATCH para actualizar una entidad existente.
 * @param {Object} req - Objeto de solicitud (espera 'id' en req.params y datos de actualización en req.body).
 * @param {Object} res - Objeto de respuesta.
 * @returns {Promise<void>} Responde con la entidad actualizada, un 404, o un error 500.
 */
export const putEntidad = async (req, res) => {
    try {
        const { nombre, tipo } = req.body;
        // Actualiza la entidad por ID
        const updatedEntidad = await updateEntidad(req.params.id, nombre, tipo);

        if (!updatedEntidad) {
            // Si no se devuelve el registro (ID no encontrado)
            return res.status(404).json({
                msg: "Entidad no encontrada"
            });
        }
        // Responde con estado 200 OK y el objeto actualizado
        res.json(updatedEntidad);
    } catch (err) {
        // Captura errores generales
        res.status(500).json({
            msg: "Error al actualizar la entidad",
            error: err
        })
    }
}

/**
 * @function deleteEntidad
 * @description Maneja la solicitud DELETE para eliminar una entidad por su ID.
 * @param {Object} req - Objeto de solicitud (espera 'id' en req.params).
 * @param {Object} res - Objeto de respuesta.
 * @returns {Promise<void>} Responde con 204 No Content si tuvo éxito, 404 si no existe, o error 500.
 */
export const deleteEntidad = async (req, res) => {
    try {
        // Elimina la entidad por ID
        const deleted = await eliminateEntidad(req.params.id); // Devuelve 1 o 0

        if (!deleted) {
            // Si rowCount es 0, la entidad no existía
            return res.status(404).json({
                msg: "Entidad no encontrada"
            })
        }

        // Responde con estado 204 No Content (eliminación exitosa)
        res.sendStatus(204);
    } catch (err) {
        // Captura errores generales
        res.status(500).json({
            msg: "Error al borrar entidad",
            error: err
        })
    }
}