import fs from 'fs/promises';
import createDebug from 'debug';
const debug = createDebug('W6:SampleRepo');

type Subject = {
  id: string;
  name: string;
};

const file = './data.json';

export class DataRepo {
  constructor() {
    debug('Data Repo');
  }

  async readAll() {
    const stringData = await fs.readFile(file, { encoding: 'utf-8' });
    const aData = JSON.parse(stringData) as Subject[];
    return aData;
  }

  async readById(id: string) {
    const stringData = await fs.readFile(file, { encoding: 'utf-8' });
    const subjectData = JSON.parse(stringData) as Subject[];
    const result = subjectData.find((item) => item.id === id);
    if (!result) throw new Error();
    return result;
  }

  async addSubject(subject: Subject) {
    const stringData = await fs.readFile(file, { encoding: 'utf-8' });
    const subjectData = JSON.parse(stringData) as Subject[];
    const newSubjectList = JSON.stringify([...subjectData, subject]);
    await fs.writeFile(file, newSubjectList, {
      encoding: 'utf-8',
    });
  }

  async update(id: string, newSubject: Subject) {
    const stringData = await fs.readFile(file, { encoding: 'utf-8' });
    const subjectData = JSON.parse(stringData) as Subject[];
    const updatedList = subjectData.map((item) =>
      item.id === id ? { ...item, ...newSubject } : item
    );
    const updatedFile = JSON.stringify(updatedList);
    await fs.writeFile(file, updatedFile, { encoding: 'utf-8' });
  }

  async delete(id: string) {
    const stringData = await fs.readFile(file, { encoding: 'utf-8' });
    const subjectData = JSON.parse(stringData) as Subject[];
    const updatedList = subjectData.filter((item) => item.id !== id);
    const updatedFile = JSON.stringify(updatedList);
    await fs.writeFile(file, updatedFile, { encoding: 'utf-8' });
  }
}
