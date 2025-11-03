import { Router } from "express";
import { deleteMoneda, getMonedaById, getMonedas, postMoneda, putMoneda } from "./monedas.controller.js";
import { deleteMonedaValidator, getMonedaByIdValidator, postMonedaValidator, putMonedaValidator } from "../../middlewares/monedas-validator.js";

const router = Router();

router.get("/get", getMonedas);

router.get("/get/:id", getMonedaByIdValidator, getMonedaById);

router.post("/create", postMonedaValidator, postMoneda);

router.put("/update/:id", putMonedaValidator, putMoneda);

router.delete("/delete/:id", deleteMonedaValidator, deleteMoneda);


export default router;