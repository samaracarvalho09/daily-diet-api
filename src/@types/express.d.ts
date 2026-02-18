import { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      // user?: JwtPayload | { sub: string };
      user: { sub: string }; // garante que sempre existe sub
    }
  }
}
