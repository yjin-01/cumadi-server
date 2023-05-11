import { Request, Response } from 'express';

export interface IAuthUser {
  user?: {
    userId: string;
  };
}

export interface IContext {
  req: Request & IAuthUser;
  res: Response;
}
