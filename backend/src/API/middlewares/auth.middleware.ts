import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../../utils/jwt";

interface UserPayload {
  id: string;
  email: string;
  username: string;
}

// Extend Express Request interface to include 'user'
declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.accessToken;

  if (!token) {
    res.status(401).json({ message: "Access token required" });
    return;
  }

  try {
    const user = verifyAccessToken(token);
    req.user = user as UserPayload;
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid or expired token" });
    return;
  }
};
