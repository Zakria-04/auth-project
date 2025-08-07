import { Router } from "express";
import { createNewUser, loginUser } from "../Controllers/auth.controller";

const authRouter = Router();

authRouter.post("/auth/register", createNewUser);
authRouter.post("/auth/login", loginUser);

export default authRouter;
