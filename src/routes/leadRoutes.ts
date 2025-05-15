import { Router } from "express";
import { leadController } from "../controllers/leadController";
import { authenticateKey } from "../middleware/auth";

const router = Router();

router.post("/", leadController.createLead);
router.get("/", authenticateKey, leadController.getLeads);

export default router;
