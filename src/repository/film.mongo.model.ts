import { Schema, model } from 'mongoose';
import { Film } from '../entities/film';

const filmSchema = new Schema<Film>({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  duration: {
    type: String,
    required: true,
  },
});

filmSchema.set('toJSON', {
  transform(_document, returnedObject) {
    returnedObject.id = returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject._id;
    delete returnedObject.password;
  },
});

export const FilmModel = model('Film', filmSchema, 'films');
