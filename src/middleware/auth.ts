import { Request, Response, NextFunction } from "express";

export const authenticateKey = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const apiKey = req.headers["x-api-key"];

  if (apiKey && apiKey === process.env.API_KEY) {
    next();
  } else {
    res.status(401).json({
      status: "error",
      message: "Unauthorized: Invalid API Key",
    });
  }
};
