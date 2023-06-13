import { FilmRepo } from './films.mongo.repository.js';
import { FilmModel } from './film.mongo.model.js';

jest.mock('./film.mongo.model.js');

// (FilmModel as unknown as jest.Mock).mockReturnValue({
//   find: jest.fn().mockResolvedValueOnce({
//     exec: jest.fn().mockResolvedValue([]),
//   }),
//   findById: jest.fn(),
//   create: jest.fn(),
//   findByIdAndUpdate: jest.fn(),
//   findByIdAndDelete: jest.fn(),
// });
describe('Given FilmRepo Class', () => {
  describe('When I instantiate it', () => {
    const repo = new FilmRepo();

    test('Then method query should be used', async () => {
      FilmModel.find = jest.fn().mockReturnValueOnce({
        exec: jest.fn().mockResolvedValue([]),
      });
      const result = await repo.query();
      expect(FilmModel.find).toHaveBeenCalled();
      expect(result).toEqual([]);
    });

    // Test('Then method queryById should be used', async () => {
    //   const mockSubject = [{ id: '1' }];
    //   (fs.readFile as jest.Mock).mockResolvedValueOnce(
    //     JSON.stringify(mockSubject)
    //   );
    //   const result = await repo.queryById('1');
    //   expect(fs.readFile).toHaveBeenCalled();
    //   expect(result).toEqual(mockSubject[0]);
    // });
  });
});
