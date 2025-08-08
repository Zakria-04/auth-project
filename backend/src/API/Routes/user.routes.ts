import { Router } from "express";
import { authenticateToken } from "../middlewares/auth.middleware";
import { getAccountUsername } from "../Controllers/user.controller";

const userRouter = Router();

userRouter.get("/account/username", authenticateToken, getAccountUsername);

export default userRouter;
