import { Router } from "express";
import { deleteEntidad, getEntidadById, getEntidades, postEntidad, putEntidad } from "./entidades.controller";
import { deleteEntidadValidator, getEntidadByIdValidator, postEntidadValidator, putEntidadValidator } from "../../middlewares/entidades-validator";

const router = Router();

router.get("/get", getEntidades);

router.get("/get/:id", getEntidadByIdValidator, getEntidadById);

router.post("/create", postEntidadValidator, postEntidad);

router.put("/update/:id", putEntidadValidator, putEntidad);

router.delete("/delete/:id", deleteEntidadValidator, deleteEntidad);


export default router;