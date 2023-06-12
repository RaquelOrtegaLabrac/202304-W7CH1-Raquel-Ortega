import { Router as createRouter } from 'express';
import { DataController } from './controller.js';
import { Subject } from './entities/subject.js';
import { Repo } from './repository/repo.js';
import { DataRepo } from './repository/repository.js';

const repo: Repo<Subject> = new DataRepo();
const controller = new DataController(repo);
export const dataRouter = createRouter();

dataRouter.get('/', controller.getAll.bind(controller));
dataRouter.get('/:id', controller.getById.bind(controller));
dataRouter.post('/', controller.post.bind(controller));
dataRouter.patch('/:id', controller.patch.bind(controller));
dataRouter.delete('/:id', controller.deleteById.bind(controller));
