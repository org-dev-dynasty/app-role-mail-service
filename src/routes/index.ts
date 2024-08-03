import { Router } from "express";
import { healthCheckHandler } from "../handlers/health_check_handler";

export const router = Router()

router.get("/health", healthCheckHandler) 