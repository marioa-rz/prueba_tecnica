import { createMoneda, findMonedaById, findMonedas, updateMoneda, eliminateMoneda} from "./monedas.model.js"

export const getMonedas = async (req, res) => {
    try {
        const result = await findMonedas();
        res.json({ result });
    } catch (err) {
        res.status(500).json({
            msg: "Error al obtener las monedas",
            error: err
        })
    }
}

export const getMonedaById = async (req, res) => {
    try {
        const result = await findMonedaById(req.params.id);

        if(!result){
            return res.status(404).json({
                msg: "Moneda no encontrada"
            })
        }

        res.json({ result });
    } catch (err) {
        res.status(500).json({
            msg: "Error al obtener moneda",
            error: err
        })
    }
}

export const postMoneda = async(req, res) => {
    try{
        const {codigo_iso, nombre, pais} = req.body;
        
        const newMoneda = await createMoneda(codigo_iso, nombre, pais);
        res.status(201).json(newMoneda);
    }catch(err){
        res.status(500).json({
            msg: "Error al crear la moneda",
            error: err
        })
    }
}

export const putMoneda = async(req, res) => {
    try{
        const {codigo_iso, nombre, pais} = req.body;
        const updatedMoneda = await updateMoneda(req.params.id, codigo_iso, nombre, pais);

        if(!updatedMoneda){
            res.status(404).json({
                msg: "Moneda no encontrada"
            });
        }
        res.json(updatedMoneda);
    }catch(err){
        res.status(500).json({
            msg: "Error al actualizar moneda",
            error: err
        })
    }
}

export const deleteMoneda = async(req, res) => {
    try{
        const deleted = await eliminateMoneda(req.params.id);

        if(!deleted){
            return res.status(404).json({
                msg: "Moneda no encontrada"
            })
        }

        res.sendStatus(204);
    }catch(err){
        res.status(500).json({
            msg: "Error al borrar moneda",
            error: err
        })
    }
}