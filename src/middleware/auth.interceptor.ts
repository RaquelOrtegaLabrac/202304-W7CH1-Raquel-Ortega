import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../types/http.error.js';
import { AuthServices } from '../services/auth.js';

import createDebug from 'debug';
const debug = createDebug('W6:AuthInterceptor');

export class AuthInterceptor {
  constructor() {
    debug('Instantiated');
  }

  logged(request: Request, response: Response, next: NextFunction) {
    try {
      const authHeader = request.get('Authorization');
      if (!authHeader) {
        throw new HttpError(401, 'Not Authorized', 'Not Authorization header');
      }

      if (!authHeader.startsWith('Bearer')) {
        throw new HttpError(
          401,
          'Not Authorized',
          'Not Bearer in Authorization header'
        );
      }

      const token = authHeader.slice(7);
      const payload = AuthServices.verifyJWTGettingPayload(token);
      request.body.tokenPayload = payload;
      next();
    } catch (error) {
      next(error);
    }
  }
}
