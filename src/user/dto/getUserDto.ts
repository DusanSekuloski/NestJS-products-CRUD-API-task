import { User } from 'src/entities/users.entity';

export class GetUserDto {
  id: number;

  first_name: string;

  last_name: string;

  email: string;

  created_at: Date;

  constructor(user: User) {
    this.id = user.id;
    this.first_name = user.firstName;
    this.last_name = user.lastName;
    this.email = user.email;
    this.created_at = user.createdAt;
  }
}
