import { Router } from "express"
import { RefundsController } from "@/controllers/refunds-controller"
import { verifyUserAuthorization } from "@/middlewares/verify-user-authorization"

const refundsRoutes = Router()
const refundsController = new RefundsController()

refundsRoutes.post("/", verifyUserAuthorization(["employee"]), refundsController.create)
refundsRoutes.get("/", verifyUserAuthorization(["manager", "employee"]), refundsController.index)
refundsRoutes.get("/:id", verifyUserAuthorization(["manager", "employee"]), refundsController.show)
refundsRoutes.delete("/:id", verifyUserAuthorization(["employee"]), refundsController.delete)


export { refundsRoutes }