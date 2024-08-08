import express, { Request, Response } from "express";
import { envs } from "./envs";
import { router } from "./routes";
import { STAGE } from "./enums/stage_enum";
import ServerlessHttp from "serverless-http";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(router);
app.use(cors());

if (envs.STAGE === STAGE.TEST) {
  app.listen(3000, () => {
    console.log("Server is running on port 3000 🚀");
  });
} else {
  module.exports.handler = ServerlessHttp(app);
}
