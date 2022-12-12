import { Expose } from 'class-transformer'

export class User {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  age: number;
  sex: string;
  interests: string;
  city: string;
}
