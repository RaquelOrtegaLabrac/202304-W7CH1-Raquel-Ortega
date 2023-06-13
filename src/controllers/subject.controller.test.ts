import { NextFunction, Request, Response } from 'express';
import { Subject } from '../repository/subject.repository.js';
import { DataController } from './subject.controller.js';
describe('Given SubjectController class', () => {
  describe('When it is instantiated', () => {
    const mockRepo: Subject = {
      query: jest.fn(),
      queryById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };
    const req = {
      params: { id: 1 },
    } as unknown as Request;
    const res = {
      send: jest.fn(),
    } as unknown as Response;
    const next = jest.fn() as NextFunction;
    const controller = new DataController(mockRepo);
    test('Then method getAll should be used', async () => {
      await controller.getAll(req, res, next);
      expect(res.send).toHaveBeenCalled();
      expect(mockRepo.query).toHaveBeenCalled();
    });
    test('Then method getById should be used', async () => {
      await controller.getById(req, res, next);
      expect(res.send).toHaveBeenCalled();
      expect(mockRepo.queryById).toHaveBeenCalled();
    });
  });
});
