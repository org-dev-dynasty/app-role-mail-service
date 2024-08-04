import { Router } from "express";
import { healthCheckHandler } from "../handlers/health_check_handler";
import { emailHandler } from "../handlers/mail_handler";

export const router = Router();

router.get("/health", healthCheckHandler);
router.post("/send-email", emailHandler);
