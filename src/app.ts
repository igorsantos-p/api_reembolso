import uploadConfig from '@/configs/upload';
import "express-async-errors"
import express from "express"
import cors from "cors"
import { errorHandler } from "./middlewares/error-handler"
import { routes } from "./routes"

const app = express()
app.use(cors({
  origin: "https://app-reembolso.vercel.app"
}))
app.use(express.json())

app.use("/uploads", express.static(uploadConfig.UPLOADS_FOLDER))

app.use(routes)
app.use(errorHandler)

export { app }
