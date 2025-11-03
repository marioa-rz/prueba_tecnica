/**
 * Módulo de Repositorio para la tabla 'tasas_crc.monedas'.
 * Contiene las funciones CRUD (Crear, Leer, Actualizar, Eliminar)
 * para interactuar con los datos de las monedas.
 */
import pool from "../../config/postgresql.js";

/**
 * @function findMonedas
 * @description Obtiene todas las filas de la tabla de monedas.
 * @returns {Promise<Array<Object>>} Un array de objetos que representan todas las monedas.
 */
export const findMonedas = async () => {
    // Consulta SQL para seleccionar todos los registros de la tabla
    const { rows } = await pool.query
        ("SELECT * FROM tasas_crc.monedas");

    return rows;
}

/**
 * @function findMonedaById
 * @description Obtiene una moneda específica usando su identificador único (ID).
 * @param {Number} id - El ID de la moneda que se desea buscar.
 * @returns {Promise<Object | undefined>} El objeto de la moneda si se encuentra, o undefined.
 */
export const findMonedaById = async (id) => {
    // Consulta SQL con cláusula WHERE para filtrar por ID
    const { rows } = await pool.query
        ("SELECT * FROM tasas_crc.monedas WHERE id = $1", [id]);

    return rows[0]; // Retorna el primer (y único) registro encontrado
}

/**
 * @function createMoneda
 * @description Inserta una nueva moneda en la base de datos.
 * @param {String} codigo_iso - El código ISO de 3 letras de la moneda (ej: "CRC", "USD").
 * @param {String} nombre - El nombre completo de la moneda.
 * @param {String} pais - El país asociado a la moneda.
 * @returns {Promise<Object>} El objeto de la moneda recién creada, incluyendo su ID generado.
 */
export const createMoneda = async (codigo_iso, nombre, pais) => {
    // Consulta SQL INSERT. RETURNING * asegura que el registro creado es devuelto.
    const { rows } = await pool.query
        ("INSERT INTO tasas_crc.monedas (codigo_iso, nombre, pais) VALUES ($1, $2, $3) RETURNING *",
            [codigo_iso, nombre, pais]
        );

    return rows[0];
}

/**
 * @function updateMoneda
 * @description Actualiza los detalles de una moneda existente usando su ID.
 * @param {Number} id - El ID de la moneda a actualizar.
 * @param {String} codigo_iso - El nuevo código ISO.
 * @param {String} nombre - El nuevo nombre.
 * @param {String} pais - El nuevo país.
 * @returns {Promise<Object | undefined>} El objeto de la moneda actualizada, o undefined.
 */
export const updateMoneda = async (id, codigo_iso, nombre, pais) => {
    // Consulta SQL UPDATE. RETURNING * devuelve el registro después de la actualización.
    const { rows } = await pool.query
        ("UPDATE tasas_crc.monedas SET codigo_iso = $1, nombre = $2, pais = $3 WHERE id = $4 RETURNING *",
            [codigo_iso, nombre, pais, id]
        );

    return rows[0];
}

/**
 * @function eliminateMoneda
 * @description Elimina una moneda de la base de datos usando su ID.
 * @param {Number} id - El ID de la moneda a eliminar.
 * @returns {Promise<Number>} El número de filas eliminadas (1 si tuvo éxito, 0 si el ID no existe).
 */
export const eliminateMoneda = async (id) => {
    // Consulta SQL DELETE. rowCount nos indica cuántas filas fueron afectadas.
    const { rowCount } = await pool.query
        ("DELETE FROM tasas_crc.monedas WHERE id = $1",
            [id]
        );

    return rowCount;
}