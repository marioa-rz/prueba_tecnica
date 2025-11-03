import { createEntidad, findEntidadById, findEntidades, updateEntidad, eliminateEntidad } from "./entidades.model.js"

export const getEntidades = async (req, res) => {
    try {
        const result = await findEntidades();
        res.json({ result });
    } catch (err) {
        res.status(500).json({
            msg: "Error al obtener las entidades",
            error: err
        })
    }
}

export const getEntidadById = async (req, res) => {
    try {
        const result = await findEntidadById(req.params.id);

        if (!result) {
            return res.status(404).json({
                msg: "Entidad no encontrada"
            })
        }

        res.json({ result });
    } catch (err) {
        res.status(500).json({
            msg: "Error al obtener entidad",
            error: err
        })
    }
}

export const postEntidad = async (req, res) => {
    try {
        const { nombre, tipo } = req.body

        const newEntidad = await createEntidad(nombre, tipo);
        res.status(201).json(newEntidad);
    } catch (err) {
        res.status(500).json({
            msg: "Error al crear la entidad",
            error: err
        })
    }
}

export const putEntidad = async (req, res) => {
    try {
        const { nombre, tipo } = req.body;
        const updatedEntidad = await updateEntidad(req.params.id, nombre, tipo);

        if (!updatedEntidad) {
            res.status(404).json({
                msg: "Entidad no encontrada"
            });
        }
        res.json(updatedEntidad);
    } catch (err) {
        res.status(500).json({
            msg: "Error al actualizar la entidad",
            error: err
        })
    }
}

export const deleteEntidad = async (req, res) => {
    try {
        const deleted = await eliminateEntidad(req.params.id);

        if (!deleted) {
            return res.status(404).json({
                msg: "Entidad no encontrada"
            })
        }

        res.sendStatus(204);
    } catch (err) {
        res.status(500).json({
            msg: "Error al borrar entidad",
            error: err
        })
    }
}