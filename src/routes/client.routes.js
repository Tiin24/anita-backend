import { Router } from "express";
import {
  createClient,
  getClients,
  getClientById,
} from "../controllers/client.controller.js";

const router = Router();

router.get("/", getClients);
router.get("/:id", getClientById);
router.post("/", createClient);

export default router;
