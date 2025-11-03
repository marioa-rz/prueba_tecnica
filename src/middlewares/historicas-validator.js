import { body, param } from "express-validator";
import { validateFields } from "./validate-fields.js"
import { handleErrors } from "./handle-errors.js"

export const getHistoricasByIdValidator = [
    param("id").notEmpty().withMessage("El ID es requerido"),
    validateFields,
    handleErrors
];

export const postHistoricasValidator = [
    body("fecha_hora").isISO8601().withMessage("La fecha y hora deben ser válidas"),
    body("tipo_transaccion").isIn(['compra', 'venta']).withMessage("El tipo debe ser 'compra' o 'venta'"),
    body("valor_tasa").isFloat({ gt: 0 }).withMessage("El valor de la tasa debe ser un número positivo"),
    body("entidad_id").isUUID().withMessage("El ID de la entidad debe ser un UUID válido"),
    body("moneda_base_id").isUUID().withMessage("El ID de la moneda base debe ser un UUID válido"),
    body("moneda_objetivo_id").isUUID().withMessage("El ID de la moneda objetivo debe ser un UUID válido"),
    validateFields,
    handleErrors
];

export const putHistoricasValidator = [
    param("id").isUUID().withMessage("El ID del registro debe ser un UUID válido"),
    body("valor_tasa").isFloat({ gt: 0 }).withMessage("El valor de la tasa debe ser un número positivo"),
    body("tipo_transaccion").isIn(['compra', 'venta']).optional().withMessage("El tipo debe ser 'compra' o 'venta'"),
    validateFields,
    handleErrors
];

export const deleteHistoricasValidator = [
    param("id").notEmpty().withMessage("El ID es requerido"),
    validateFields,
    handleErrors
];