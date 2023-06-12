import { Request, Response } from 'express';
import { DataRepo } from './repository.js';
import createDebug from 'debug';
const debug = createDebug('W6:DataController');

export class DataController {
  repo: DataRepo;
  constructor() {
    this.repo = new DataRepo();
    debug('Instantiated DataController');
    debug(this.repo);
  }

  async getAll(_request: Request, response: Response) {
    response.send(await this.repo.readAll());
  }

  async getById(request: Request, response: Response) {
    response.send(await this.repo.readById(request.params.id));
  }

  async post(request: Request, response: Response) {
    await this.repo.addSubject(request.body);
    response.send('New subject added.');
  }

  async patch(request: Request, response: Response) {
    await this.repo.update(request.params.id, request.body);
    response.send('The subject has been updated.');
  }

  async deleteById(request: Request, response: Response) {
    await this.repo.delete(request.params.id);
    response.send('The subject has been removed.');
  }
}
