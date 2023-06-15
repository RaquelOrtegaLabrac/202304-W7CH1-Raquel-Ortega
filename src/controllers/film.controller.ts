import { NextFunction, Request, Response } from 'express';
import { FilmRepo } from '../repository/films.mongo.repository.js';
import { Controller } from './generic.controller.js';
import { Film } from '../entities/film.js';

import createDebug from 'debug';
import { PayloadToken } from '../services/auth.js';
import { UserRepo } from '../repository/user.mongo.repository.js';
const debug = createDebug('W6:FilmController');

export class FilmController extends Controller<Film> {
  // eslint-disable-next-line no-unused-vars
  constructor(protected repo: FilmRepo, private userRepo: UserRepo) {
    super();
    debug('Instantiated');
  }

  async post(request: Request, response: Response, next: NextFunction) {
    try {
      const { id } = request.body.tokenPayload as PayloadToken;
      await this.userRepo.queryById(id);
      delete request.body.tokenPayload;
      request.body.owner = id;
      response.status(201);
      response.send(await this.repo.create(request.body));
    } catch (error) {
      next(error);
    }
  }
}
