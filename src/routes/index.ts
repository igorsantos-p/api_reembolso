import { Router } from "express";
import { usersRoutes } from "./users-routes";
import { sessionsRoutes } from "./sessions-routes";
import { refundsRoutes } from "./refunds-routes";
import { ensureAuth } from "@/middlewares/ensure-auth";
import { uploadsRoutes } from "./uploads-routes";

const routes = Router()

routes.use("/users", usersRoutes)
routes.use("/sessions", sessionsRoutes)

routes.use("/refunds",ensureAuth, refundsRoutes)
routes.use("/uploads",ensureAuth, uploadsRoutes)

export { routes }