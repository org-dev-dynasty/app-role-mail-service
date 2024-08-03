import { Request, Response } from "express";

export function healthCheckHandler(req: Request, res: Response) {
  return res.send("I'm alive! 🚀");
}