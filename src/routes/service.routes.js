import { Router } from "express";
import {
  uploadServicesJsonToDB,
  getallServices,
} from "../controllers/servicio.controller.js";

const router = Router();

router.get("/", getallServices);
router.post("/upload", uploadServicesJsonToDB);

export default router;
