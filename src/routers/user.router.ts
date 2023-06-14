import { Router as createRouter } from 'express';
import createDebug from 'debug';
import { UserController } from '../controllers/user.controller.js';
import { UserRepo } from '../repository/user.mongo.respository.js';
import { User } from '../entities/user.js';
import { Repo } from '../repository/repo.js';
const debug = createDebug('W6:UserRouter');

debug('Executed');

const repo: Repo<User> = new UserRepo() as Repo<User>;
const controller = new UserController(repo);
export const userRouter = createRouter();

// DataRouter.get('/', controller.getAll.bind(controller));
// dataRouter.get('/:id', controller.getById.bind(controller));
userRouter.post('/register', controller.register.bind(controller));
userRouter.patch('/login', controller.login.bind(controller));
// DataRouter.delete('/:id', controller.deleteById.bind(controller));
