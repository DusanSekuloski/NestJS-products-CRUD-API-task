import { User } from '../../entities/users.entity';

export class GetUserDto {
  id: number;

  firstName: string;

  lastName: string;

  email: string;

  createdAt: Date;

  constructor(user: User) {
    this.id = user.id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.createdAt = user.createdAt;
  }
}
