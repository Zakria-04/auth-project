import { Router } from "express";
import { createNewUser, loginUser, refreshTokenController } from "../Controllers/auth.controller";

const authRouter = Router();

authRouter.post("/auth/register", createNewUser);
authRouter.post("/auth/login", loginUser);
authRouter.post("/auth/refresh-token", refreshTokenController);

export default authRouter;
