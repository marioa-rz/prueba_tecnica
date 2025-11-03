import { body, param } from "express-validator";
import { validateFields } from "./validate-fields.js" 
import { handleErrors } from "./handle-errors.js"

export const getEntidadByIdValidator = [
    param("id").notEmpty().withMessage("El ID es requerido"),
    validateFields,
    handleErrors
];

export const postEntidadValidator = [
    body("nombre").notEmpty().withMessage("El nombre de la entidad es requerido"),
    body("tipo").notEmpty().withMessage("El tipo de entidad es requerido"),
    validateFields,
    handleErrors
];

export const putEntidadValidator = [
    param("id").notEmpty().withMessage("El ID es requerido"),
    body("nombre").notEmpty().withMessage("El nombre de la entidad es requerido"),
    body("tipo").notEmpty().withMessage("El tipo de entidad es requerido"),
    validateFields,
    handleErrors
];

export const deleteEntidadValidator = [
    param("id").notEmpty().withMessage("El ID es requerido"),
    validateFields,
    handleErrors
];