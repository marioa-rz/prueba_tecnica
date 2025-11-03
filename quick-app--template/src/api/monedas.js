import axios from "axios";

// =======================================
// CONFIGURACIÓN BASE
// =======================================

// URL base del servidor API.
const API_URL = "http://localhost:4000/api/v1";

// =======================================
// FUNCIONES DE SERVICIO CRUD (Monedas)
// =======================================

/**
 * @function getMonedas
 * @description Obtiene la lista completa de todas las monedas del backend.
 * @returns {Promise<Object>} Promesa que resuelve con la respuesta de la API (normalmente data.result).
 */
export const getMonedas = async() => {
    const res = await axios.get(`${API_URL}/monedas/get`);
    return res.data; // Devuelve el cuerpo de la respuesta.
}

/**
 * @function createMoneda
 * @description Envía un objeto moneda para crear un nuevo registro.
 * @param {Object} moneda - El objeto moneda a crear ({codigo_iso, nombre, pais}).
 * @returns {Promise<Object>} Promesa que resuelve con la respuesta de la API.
 */
export const createMoneda = async(moneda) => {
    // Petición POST con los datos de la nueva moneda en el cuerpo.
    const res = await axios.post(`${API_URL}/monedas/create`, moneda);
    return res.data;
}

/**
 * @function updateMoneda
 * @description Actualiza los datos de una moneda específica.
 * @param {string | number} id - El ID (UUID) de la moneda a actualizar.
 * @param {Object} moneda - El objeto con los datos actualizados.
 * @returns {Promise<Object>} Promesa que resuelve con la respuesta de la API.
 */
export const updateMoneda = async(id, moneda) => {
    // Petición PUT, pasando el ID en la URL y los datos actualizados en el cuerpo.
    const res = await axios.put(`${API_URL}/monedas/update/${id}`, moneda);
    return res.data;
}

/**
 * @function deleteMoneda
 * @description Elimina un registro de moneda por su ID.
 * @param {string | number} id - El ID (UUID) de la moneda a eliminar.
 * @returns {Promise<void>} Promesa que se resuelve tras la eliminación exitosa.
 */
export const deleteMoneda = async(id) => {
    // Petición DELETE, pasando el ID en la URL.
    await axios.delete(`${API_URL}/monedas/delete/${ id }`);
}