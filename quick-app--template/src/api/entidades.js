import axios from "axios";

// =======================================
// CONFIGURACIÓN BASE
// =======================================

// URL base del servidor API.
const API_URL = "http://localhost:4000/api/v1";

// =======================================
// FUNCIONES DE SERVICIO CRUD (Entidades)
// =======================================

/**
 * @function getEntidades
 * @description Obtiene la lista completa de todas las entidades registradas.
 * @returns {Promise<Object>} Promesa que resuelve con la respuesta de la API (ej: { result: [...] }).
 */
export const getEntidades = async() => {
    const res = await axios.get(`${API_URL}/entidades/get`);
    return res.data; // Devuelve el cuerpo de la respuesta.
}

/**
 * @function createEntidad
 * @description Envía un objeto entidad para crear un nuevo registro.
 * @param {Object} entidad - El objeto entidad a crear ({nombre, tipo}).
 * @returns {Promise<Object>} Promesa que resuelve con la respuesta de la API.
 */
export const createEntidad = async(entidad) => {
    // Petición POST con los datos de la nueva entidad en el cuerpo.
    const res = await axios.post(`${API_URL}/entidades/create`, entidad);
    return res.data;
}

/**
 * @function updateEntidad
 * @description Actualiza los datos de una entidad específica.
 * @param {string | number} id - El ID (UUID) de la entidad a actualizar.
 * @param {Object} entidad - El objeto con los datos actualizados.
 * @returns {Promise<Object>} Promesa que resuelve con la respuesta de la API.
 */
export const updateEntidad = async(id, entidad) => {
    // Petición PUT: ID en la URL y datos actualizados en el cuerpo.
    const res = await axios.put(`${API_URL}/entidades/update/${id}`, entidad);
    return res.data;
}

/**
 * @function deleteEntidad
 * @description Elimina un registro de entidad por su ID.
 * @param {string | number} id - El ID (UUID) de la entidad a eliminar.
 * @returns {Promise<void>} Promesa que se resuelve tras la eliminación exitosa.
 */
export const deleteEntidad = async(id) => {
    // Petición DELETE, pasando el ID en la URL.
    await axios.delete(`${API_URL}/entidades/delete/${ id }`);
}