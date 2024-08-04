/// <reference path="./envs.d.ts" />

import { config } from "dotenv";
import path from "path";


config({ path: path.resolve(__dirname, "../.env")});


export const envs = {
  AWS_ACCOUNT_ID: process.env.AWS_ACCOUNT_ID,
  STACK_NAME: process.env.STACK_NAME,
  AWS_REGION: process.env.AWS_REGION,
  GITHUB_REF_NAME: process.env.GITHUB_REF,
  STAGE: process.env.STAGE,
  EMAIL_LOGIN: process.env.EMAIL_LOGIN,
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
}

