import { body, param } from "express-validator";
import { validateFields } from "./validate-fields.js"
import { handleErrors } from "./handle-errors.js"

export const getMonedaByIdValidator = [
    param("id").notEmpty().withMessage("El ID es requerido"),
    validateFields,
    handleErrors
];

export const postMonedaValidator = [
    body("codigo_iso").notEmpty().withMessage("El codigo iso es requerido"),
    body("nombre").notEmpty().withMessage("El nombre es requerido"),
    body("pais").notEmpty().withMessage("El pais es requerido"),
    validateFields,
    handleErrors
];

export const putMonedaValidator = [
    body("id").notEmpty().withMessage("El id es requerido"),
    body("codigo_iso").notEmpty().withMessage("El codigo iso es requerido"),
    body("nombre").notEmpty().withMessage("El nombre es requerido"),
    body("pais").notEmpty().withMessage("El pais es requerido"),
    validateFields,
    handleErrors
];

export const deleteMonedaValidator = [
    param("id").notEmpty().withMessage("El ID es requerido"),
    validateFields,
    handleErrors
];