import { findHistoricas, findHistoricasById, createHistoricas, updateHistoricas, eliminateHistoricas } from "./historicas.model.js"

export const getHistoricas = async (req, res) => {
    try {
        const result = await findHistoricas();
        res.json({ result });
    } catch (err) {
        res.status(500).json({
            msg: "Error al obtener los registros histórico",
            error: err
        })
    }
}

export const getHistoricasById = async (req, res) => {
    try {
        const result = await findHistoricasById(req.params.id);

        if (!result) {
            return res.status(404).json({
                msg: "Registro histórico no encontrado"
            })
        }

        res.json({ result });
    } catch (err) {
        res.status(500).json({
            msg: "Error al obtener registro histórico",
            error: err
        })
    }
}

export const postHistoricas = async (req, res) => {
    try {
        const { fecha_hora, tipo_transaccion, valor_tasa, entidad_id, moneda_base_id, moneda_objetivo_id } = req.body;

        const newHistorica = await createHistoricas(fecha_hora, tipo_transaccion, valor_tasa, entidad_id, moneda_base_id, moneda_objetivo_id);
        res.status(201).json(newHistorica);
    } catch (err) {
        res.status(500).json({
            msg: "Error al crear el registro histórico",
            error: err
        })
    }
}

export const putHistoricas = async (req, res) => {
    try {
        const { valor_tasa, tipo_transaccion } = req.body;
        const updatedHistorica = await updateHistoricas(req.params.id, valor_tasa, tipo_transaccion);

        if (!updatedHistorica) {
            res.status(404).json({
                msg: "Registro histórico no encontrado"
            });
        }

        res.json(updatedHistorica);
    } catch (err) {
        res.status(500).json({
            msg: "Error al actualizar el registro histórico",
            error: err
        })
    }
}

export const deleteHistoricas = async (req, res) => {
    try {
        const deleted = await eliminateHistoricas(req.params.id);

        if (!deleted) {
            return res.status(404).json({
                msg: "Registro historico no encontrado"
            })
        }

        res.sendStatus(204);
    } catch (err) {
        res.status(500).json({
            msg: "Error al borrar registro historico",
            error: err
        })
    }
}