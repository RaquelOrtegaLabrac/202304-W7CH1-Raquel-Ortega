import { hash, compare } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';
import { secret } from '../config';

export class AuthServices {
  private static salt = 10;

  static createJWT() {
    sign({}, secret);
  }

  static hash(value: string) {
    return hash(value, AuthServices.salt);
  }

  static compare(value: string, hash: string) {
    return compare(value, hash);
  }
}
