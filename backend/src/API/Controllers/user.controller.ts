import { Request, Response } from "express";
import { serverError } from "../../utils/serverError";

const getAccountUsername = (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    res.status(200).json({ username: user.username });
  } catch (error) {
    serverError(res, error);
  }
};

export { getAccountUsername };
