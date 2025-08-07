import { Response } from "express";

export const serverError = (res: Response, err: unknown) => {
  const errorMessage =
    err instanceof Error ? err.message : "An unexpected error occurred";
  res.status(500).json({ error: errorMessage });
};