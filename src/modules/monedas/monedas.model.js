import pool from "../../config/postgresql.js";

export const findMonedas = async () => {
    const { rows } = await pool.query
        ("SELECT * FROM tasas_crc.monedas");

    return rows;
}

export const findMonedaById = async (id) => {
    const { rows } = await pool.query
        ("SELECT * FROM tasas_crc.monedas WHERE id = $1", [id]);

    return rows[0];
}

export const createMoneda = async (codigo_iso, nombre, pais) => {
    const { rows } = await pool.query
        ("INSERT INTO tasas_crc.monedas (codigo_iso, nombre, pais) VALUES ($1, $2, $3) RETURNING *",
            [codigo_iso, nombre, pais]
        );

    return rows[0];
}

export const updateMoneda = async (id, codigo_iso, nombre, pais) => {
    const { rows } = await pool.query
        ("UPDATE tasas_crc.monedas SET codigo_iso = $1, nombre = $2, pais = $3 WHERE id = $4 RETURNING *",
            [codigo_iso, nombre, pais, id]
        );

    return rows[0];
}

export const eliminateMoneda = async (id) => {
    const { rowCount } = await pool.query
        ("DELETE FROM tasas_crc.monedas WHERE id = $1",
            [id]
        );

    return rowCount;
}