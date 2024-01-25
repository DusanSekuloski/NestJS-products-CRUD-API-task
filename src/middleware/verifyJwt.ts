import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class VerifyJwtMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
      return res
        .status(401)
        .json({ error: 'Unauthorized - Missing JWT token' });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res
          .status(403)
          .json({ error: 'Access forbidden. Invalid or expired token.' });
      }

      req.user = {
        id: Number((decoded as any).user.id),
        email: (decoded as any).user.email,
      };

      next();
    });
  }
}
