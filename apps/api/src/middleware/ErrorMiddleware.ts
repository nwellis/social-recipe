import { ErrorRequestHandler } from "express";
import { Logger } from "../Logger.js";
import { lgm } from "@acme/logger";
import { inspect } from "util";

export const ErrorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  if (!err || typeof err?.message !== "string") {
    return next(err);
  }

  Logger.error(lgm(500, "", { method: req.method, path: req.path, message: err.message as string }), {
    error: inspect(err)
  })

  const message: string = err.message.replace("Assertion Error: ", "");
  if (!/^\d+/.test(message)) {
    return next(err);
  }

  const [status] = message.split("|");
  res.status(+status || 500).end(message);
}