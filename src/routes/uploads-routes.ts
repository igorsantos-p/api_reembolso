import { Router } from "express"
import { UploadsController } from "@/controllers/uploads-controller";
import { verifyUserAuthorization } from "@/middlewares/verify-user-authorization"
import uploadConfig from "@/configs/upload"
import multer from "multer";

const uploadsRoutes = Router()
const uploadsController = new UploadsController()

const upload = multer(uploadConfig.MULTER)

uploadsRoutes.post("/", verifyUserAuthorization(["employee"]), upload.single("file") ,uploadsController.create)

export { uploadsRoutes}