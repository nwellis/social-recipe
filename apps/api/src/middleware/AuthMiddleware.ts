import { RequestHandler } from "express";
import { lucia } from "../lib/Lucia.js";
import { Session, User } from "lucia";

declare global {
  namespace Express {
    interface Request {
      session: Session;
      user: User;
    }
  }
}

export const AuthMiddleware: RequestHandler = async (req, res, next) => {
  const { session, user } = await lucia.validateSession(req.cookies.auth_session)

  if (!session) {
    return res.status(401).end()
  }
  req.session = session
  req.user = user

  return next()
}