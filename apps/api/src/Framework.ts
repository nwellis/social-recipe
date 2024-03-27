import type { Request as ExpressRequest, Response as ExpressResponse } from "express";
import { Session, User } from "lucia";

export type Request = ExpressRequest & {
  session: Session;
  user: User;
}

export type Response = ExpressResponse