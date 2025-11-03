import pool from "../../config/postgresql.js";

// READ (ALL)
export const findEntidades = async () => {
    const { rows } = await pool.query
        ("SELECT * FROM tasas_crc.entidades");
    return rows;
}

// READ (BY ID)
export const findEntidadById = async (id) => {
    const { rows } = await pool.query
        ("SELECT * FROM tasas_crc.entidades WHERE id = $1", [id]);
    return rows[0];
}

// CREATE
export const createEntidad = async (nombre, tipo) => {
    const { rows } = await pool.query
        ("INSERT INTO tasas_crc.entidades (nombre, tipo) VALUES ($1, $2) RETURNING *",
            [nombre, tipo]
        );
    return rows[0];
}

// UPDATE
export const updateEntidad = async (id, nombre, tipo) => {
    const { rows } = await pool.query
        ("UPDATE tasas_crc.entidades SET nombre = $1, tipo = $2 WHERE id = $3 RETURNING *",
            [nombre, tipo, id]
        );
    return rows[0];
}

// DELETE
export const eliminateEntidad = async (id) => {
    const { rowCount } = await pool.query
        ("DELETE FROM tasas_crc.entidades WHERE id = $1",
            [id]
        );
    // Si la entidad es borrada, las tasas históricas relacionadas también se borran (ON DELETE CASCADE)
    return rowCount; 
}