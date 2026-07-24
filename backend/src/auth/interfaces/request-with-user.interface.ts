import { Request } from 'express';

export interface RequestWithUser extends Request {
  user: {
    id: number;
    email: string;
    role:string;
    // Add any other properties your JWT payload contains
  };
}
