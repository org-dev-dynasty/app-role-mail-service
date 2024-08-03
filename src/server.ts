import express, { Request, Response } from "express"
import { envs } from "./envs"
import { router } from "./routes"

const app = express()
app.use(express.json())
app.use(router)

app.listen(3000, () => {
  console.log("Server is running on port 3000 🚀")
})


