import { config } from "dotenv";
import path from "path";


config({ path: path.resolve(__dirname, "../.env") });


export const envs = {
  PINTO: process.env.PINTO,
}