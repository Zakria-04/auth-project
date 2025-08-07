import { Router } from "express";
import { createNewUser } from "../Controllers/auth.controller";

const authRouter = Router();

authRouter.post("/auth/register", createNewUser);

export default authRouter;
