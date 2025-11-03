/**
 * Módulo de Repositorio para la tabla 'tasas_crc.entidades'.
 * Contiene funciones CRUD (Crear, Leer, Actualizar, Eliminar)
 * para interactuar con los datos de las entidades (ej: bancos, instituciones).
 */
import pool from "../../config/postgresql.js";

/**
 * @function findEntidades
 * @description Obtiene todas las filas de la tabla de entidades.
 * @returns {Promise<Array<Object>>} Un array de objetos que representan todas las entidades.
 */
export const findEntidades = async () => {
    // Consulta SQL para seleccionar todos los registros
    const { rows } = await pool.query
        ("SELECT * FROM tasas_crc.entidades");
    return rows;
}

/**
 * @function findEntidadById
 * @description Obtiene una entidad específica usando su identificador único (ID).
 * @param {Number} id - El ID de la entidad que se desea buscar.
 * @returns {Promise<Object | undefined>} El objeto de la entidad si se encuentra, o undefined.
 */
export const findEntidadById = async (id) => {
    // Consulta SQL con cláusula WHERE para filtrar por ID
    const { rows } = await pool.query
        ("SELECT * FROM tasas_crc.entidades WHERE id = $1", [id]);
    return rows[0]; // Retorna el único registro encontrado
}

/**
 * @function createEntidad
 * @description Inserta una nueva entidad en la base de datos.
 * @param {String} nombre - El nombre de la entidad (ej: "Banco Central").
 * @param {String} tipo - El tipo de entidad (ej: "Banco", "Institución Financiera").
 * @returns {Promise<Object>} El objeto de la entidad recién creada, incluyendo su ID.
 */
export const createEntidad = async (nombre, tipo) => {
    // Consulta SQL INSERT con RETURNING *
    const { rows } = await pool.query
        ("INSERT INTO tasas_crc.entidades (nombre, tipo) VALUES ($1, $2) RETURNING *",
            [nombre, tipo]
        );
    return rows[0];
}

/**
 * @function updateEntidad
 * @description Actualiza el nombre y/o tipo de una entidad existente usando su ID.
 * @param {Number} id - El ID de la entidad a actualizar.
 * @param {String} nombre - El nuevo nombre de la entidad.
 * @param {String} tipo - El nuevo tipo de entidad.
 * @returns {Promise<Object | undefined>} El objeto de la entidad actualizada, o undefined.
 */
export const updateEntidad = async (id, nombre, tipo) => {
    // Consulta SQL UPDATE con RETURNING *
    const { rows } = await pool.query(
        "UPDATE tasas_crc.entidades SET nombre = $1, tipo = $2 WHERE id = $3 RETURNING *",
        [nombre, tipo, id]
    );
    return rows[0];
}

/**
 * @function eliminateEntidad
 * @description Elimina una entidad de la base de datos usando su ID.
 * Nota: Si la tabla 'historicas' tiene una restricción ON DELETE CASCADE,
 * los registros históricos asociados a esta entidad también se eliminarán automáticamente.
 * @param {Number} id - El ID de la entidad a eliminar.
 * @returns {Promise<Number>} El número de filas eliminadas (1 si tuvo éxito, 0 si el ID no existe).
 */
export const eliminateEntidad = async (id) => {
    // Consulta SQL DELETE
    const { rowCount } = await pool.query
        ("DELETE FROM tasas_crc.entidades WHERE id = $1",
            [id]
        );
    return rowCount;
}