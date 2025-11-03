/**
 * Módulo de Repositorio para la tabla 'tasas_crc.historicas'.
 * Contiene funciones CRUD para gestionar registros de tasas de cambio históricas.
 * Nota: Las funciones de lectura utilizan JOINs para enriquecer los datos de salida
 * con información de las tablas relacionadas (entidades, monedas).
 */
import pool from "../../config/postgresql.js";

/**
 * @function findHistoricas
 * @description Obtiene todos los registros históricos de tasas de cambio.
 * Incluye JOINs con las tablas 'entidades' y 'monedas' para devolver el nombre
 * de la entidad y los códigos ISO de las monedas base y objetivo, en lugar de solo los IDs.
 * Los resultados se ordenan por fecha_hora de forma descendente.
 * @returns {Promise<Array<Object>>} Un array de objetos que representan las tasas históricas.
 */
export const findHistoricas = async () => {
    // Consulta SQL con JOINs para obtener datos completos y ordenados
    const { rows } = await pool.query(`
        SELECT 
            h.id, h.fecha_hora, h.tipo_transaccion, h.valor_tasa,
            e.nombre AS entidad_nombre,
            mb.codigo_iso AS moneda_base_iso,
            mo.codigo_iso AS moneda_objetivo_iso
        FROM tasas_crc.historicas h
        JOIN tasas_crc.entidades e ON h.entidad_id = e.id
        JOIN tasas_crc.monedas mb ON h.moneda_base_id = mb.id
        JOIN tasas_crc.monedas mo ON h.moneda_objetivo_id = mo.id
        ORDER BY h.fecha_hora DESC
    `);
    return rows;
}

/**
 * @function findHistoricasById
 * @description Obtiene un registro de tasa histórica específico por su identificador único (ID).
 * Utiliza JOINs para incluir los nombres y códigos ISO de las entidades y monedas relacionadas.
 * @param {Number} id - El ID del registro histórico que se desea buscar.
 * @returns {Promise<Object | undefined>} El objeto del registro histórico con datos enriquecidos si se encuentra, o undefined.
 */
export const findHistoricasById = async (id) => {
    // Consulta SQL con JOINs y cláusula WHERE para filtrar por ID
    const { rows } = await pool.query(`
        SELECT 
            h.*, e.nombre AS entidad_nombre,
            mb.codigo_iso AS moneda_base_iso,
            mo.codigo_iso AS moneda_objetivo_iso
        FROM tasas_crc.historicas h
        JOIN tasas_crc.entidades e ON h.entidad_id = e.id
        JOIN tasas_crc.monedas mb ON h.moneda_base_id = mb.id
        JOIN tasas_crc.monedas mo ON h.moneda_objetivo_id = mo.id
        WHERE h.id = $1
    `, [id]);
    return rows[0]; // Retorna el único registro encontrado
}

/**
 * @function createHistoricas
 * @description Inserta un nuevo registro de tasa de cambio histórica.
 * Requiere los IDs de las claves foráneas (entidad, moneda base, moneda objetivo).
 * @param {String} fecha_hora - La fecha y hora de la tasa (generalmente tipo timestamp).
 * @param {String} tipo_transaccion - El tipo de tasa (ej: 'Compra', 'Venta', 'Referencia').
 * @param {Number} valor_tasa - El valor numérico de la tasa de cambio.
 * @param {Number} entidad_id - ID de la entidad que reporta la tasa (clave foránea).
 * @param {Number} moneda_base_id - ID de la moneda base (clave foránea).
 * @param {Number} moneda_objetivo_id - ID de la moneda objetivo (clave foránea).
 * @returns {Promise<Object>} El objeto del registro histórico recién creado, incluyendo su ID.
 */
export const createHistoricas = async (fecha_hora, tipo_transaccion, valor_tasa, entidad_id, moneda_base_id, moneda_objetivo_id) => {
    // Consulta SQL INSERT con RETURNING *
    const { rows } = await pool.query(
        `INSERT INTO tasas_crc.historicas 
            (fecha_hora, tipo_transaccion, valor_tasa, entidad_id, moneda_base_id, moneda_objetivo_id) 
         VALUES ($1, $2, $3, $4, $5, $6) 
         RETURNING *`,
        [fecha_hora, tipo_transaccion, valor_tasa, entidad_id, moneda_base_id, moneda_objetivo_id]
    );
    return rows[0];
}

/**
 * @function updateHistoricas
 * @description Actualiza el valor de la tasa y/o el tipo de transacción de un registro histórico.
 * Los demás campos (fecha, IDs de monedas/entidad) se consideran inmutables.
 * @param {Number} id - El ID del registro histórico a actualizar.
 * @param {Number} valor_tasa - El nuevo valor de la tasa.
 * @param {String} tipo_transaccion - El nuevo tipo de transacción.
 * @returns {Promise<Object | undefined>} El objeto del registro histórico actualizado, o undefined.
 */
export const updateHistoricas = async (id, valor_tasa, tipo_transaccion) => {
    // Consulta SQL UPDATE
    const { rows } = await pool.query(
        "UPDATE tasas_crc.historicas SET valor_tasa = $1, tipo_transaccion = $2 WHERE id = $3 RETURNING *",
        [valor_tasa, tipo_transaccion, id]
    );
    return rows[0];
}

/**
 * @function eliminateHistoricas
 * @description Elimina un registro de tasa histórica por su ID.
 * @param {Number} id - El ID del registro histórico a eliminar.
 * @returns {Promise<Number>} El número de filas eliminadas (1 si se eliminó, 0 si no se encontró).
 */
export const eliminateHistoricas = async (id) => {
    // Consulta SQL DELETE
    const { rowCount } = await pool.query
        ("DELETE FROM tasas_crc.historicas WHERE id = $1",
            [id]
        );
    return rowCount;
}