import { NextFunction, Request, Response } from 'express';
import { UserRepo } from '../repository/user.mongo.repository.js';
import { AuthServices, PayloadToken } from '../services/auth.js';
import { HttpError } from '../types/http.error.js';
import { LoginResponse } from '../types/response.api.js';

import createDebug from 'debug';
const debug = createDebug('W6:UserController');

export class UserController {
  // eslint-disable-next-line no-unused-vars
  constructor(protected repo: UserRepo) {
    debug('Instantiated');
  }

  async register(request: Request, response: Response, next: NextFunction) {
    try {
      const password = await AuthServices.hash(request.body.password);
      request.body.password = password;
      response.status(201);
      response.send(await this.repo.create(request.body));
    } catch (error) {
      next(error);
    }
  }

  async login(request: Request, response: Response, next: NextFunction) {
    try {
      if (!request.body.user || !request.body.password) {
        throw new HttpError(400, 'Bad request', 'User or password invalid (1)');
      }

      let data = await this.repo.search({
        key: 'userName',
        value: request.body.user,
      });

      if (!data.length) {
        data = await this.repo.search({
          key: 'email',
          value: request.body.user,
        });
      }

      if (!data.length) {
        throw new HttpError(400, 'Bad request', 'User or password invalid (2)');
      }

      const isUserValid = await AuthServices.compare(
        request.body.password,
        data[0].password
      );
      if (!isUserValid) {
        throw new HttpError(400, 'Bad request', 'User or password invalid (3)');
      }

      const payload: PayloadToken = {
        id: data[0].id,
        username: data[0].userName,
      };
      const token = AuthServices.createJWT(payload);
      const res: LoginResponse = {
        token,
        user: data[0],
      };

      response.send(res);
    } catch (error) {
      next(error);
    }
  }
}
