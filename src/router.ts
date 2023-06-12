import { Router as createRouter } from 'express';
import { DataController } from './controller.js';

const controller = new DataController();
export const dataRouter = createRouter();

dataRouter.get('/', controller.getAll.bind(controller));
dataRouter.get('/:id', controller.getById.bind(controller));
dataRouter.post('/', controller.post.bind(controller));
dataRouter.patch('/:id', controller.patch.bind(controller));
dataRouter.delete('/:id', controller.deleteById.bind(controller));
