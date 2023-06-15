import { User } from './user';

export type Film = {
  id: string;
  title: string;
  duration: string;
  owner: User;
};
