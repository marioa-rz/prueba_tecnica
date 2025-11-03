import { Router } from "express";
import { deleteHistoricas, getHistoricas, getHistoricasById, postHistoricas, putHistoricas } from "./historicas.controller";
import { deleteHistoricasValidator, getHistoricasByIdValidator, postHistoricasValidator, putHistoricasValidator } from "../../middlewares/historicas-validator";

const router = Router();

router.get("/get", getHistoricas);

router.get("/get/:id", getHistoricasByIdValidator, getHistoricasById);

router.post("/create", postHistoricasValidator, postHistoricas);

router.put("/update/:id", putHistoricasValidator, putHistoricas);

router.delete("/delete/:id", deleteHistoricasValidator, deleteHistoricas);


export default router;