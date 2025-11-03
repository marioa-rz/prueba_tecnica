import pool from "../../config/postgresql.js";

// READ (ALL) - A menudo se necesita filtrar o paginar en un historial
export const findHistoricas = async () => {
    // Es recomendable hacer JOINs para devolver el nombre de la moneda/entidad, no solo el ID
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

// READ (BY ID)
export const findHistoricasById = async (id) => {
    // También con JOINs para tener la data completa
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
    return rows[0];
}

// CREATE (Se reciben los IDs de las claves foráneas)
export const createHistoricas = async (fecha_hora, tipo_transaccion, valor_tasa, entidad_id, moneda_base_id, moneda_objetivo_id) => {
    const { rows } = await pool.query(
        `INSERT INTO tasas_crc.historicas 
            (fecha_hora, tipo_transaccion, valor_tasa, entidad_id, moneda_base_id, moneda_objetivo_id) 
         VALUES ($1, $2, $3, $4, $5, $6) 
         RETURNING *`,
        [fecha_hora, tipo_transaccion, valor_tasa, entidad_id, moneda_base_id, moneda_objetivo_id]
    );
    return rows[0];
}

// UPDATE (Solo se actualiza la tasa y/o el tipo)
export const updateHistoricas = async (id, valor_tasa, tipo_transaccion) => {
    const { rows } = await pool.query(
        "UPDATE tasas_crc.historicas SET valor_tasa = $1, tipo_transaccion = $2 WHERE id = $3 RETURNING *",
        [valor_tasa, tipo_transaccion, id]
    );
    return rows[0];
}

// DELETE
export const eliminateHistoricas = async (id) => {
    const { rowCount } = await pool.query
        ("DELETE FROM tasas_crc.historicas WHERE id = $1",
            [id]
        );
    return rowCount;
}