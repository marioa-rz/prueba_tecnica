import axios from "axios";

// =======================================
// CONFIGURACIÓN BASE
// =======================================

// URL base del servidor API.
const API_URL = "http://localhost:4000/api/v1";

// =======================================
// FUNCIONES DE SERVICIO CRUD (Históricas)
// =======================================

/**
 * @function getHistoricas
 * @description Obtiene la lista completa de todos los registros históricos.
 * Se espera que el backend incluya los detalles (JOINs) de entidades y monedas.
 * @returns {Promise<Object>} Promesa que resuelve con la respuesta de la API (ej: { result: [...] }).
 */
export const getHistoricas = async() => {
    const res = await axios.get(`${API_URL}/historicas/get`);
    // La respuesta esperada es { result: [...] }
    return res.data;
}

/**
 * @function createHistorica
 * @description Crea un nuevo registro histórico en la base de datos.
 * @param {Object} historica - El objeto con los datos del registro a crear.
 * (Incluye IDs de clave foránea: entidad_id, moneda_base_id, moneda_objetivo_id).
 * @returns {Promise<Object>} Promesa que resuelve con la respuesta de la API.
 */
export const createHistorica = async(historica) => {
    // Nota: El backend espera: fecha_hora, tipo_transaccion, valor_tasa, etc.
    const res = await axios.post(`${API_URL}/historicas/create`, historica);
    return res.data;
}

/**
 * @function updateHistorica
 * @description Actualiza un registro histórico específico por su ID.
 * @param {string | number} id - El ID (UUID) del registro histórico a actualizar.
 * @param {Object} historica - El objeto con todos los datos actualizados.
 * @returns {Promise<Object>} Promesa que resuelve con la respuesta de la API.
 */
export const updateHistorica = async(id, historica) => {
    // Petición PUT: ID en la URL y datos (incluyendo el ID de nuevo, según el patrón de tu backend) en el cuerpo.
    const res = await axios.put(`${API_URL}/historicas/update/${id}`, historica);
    return res.data;
}

/**
 * @function deleteHistorica
 * @description Elimina un registro histórico por su ID.
 * @param {string | number} id - El ID (UUID) del registro histórico a eliminar.
 * @returns {Promise<void>} Promesa que se resuelve tras la eliminación (código 204 No Content).
 */
export const deleteHistorica = async(id) => {
    await axios.delete(`${API_URL}/historicas/delete/${ id }`);
}