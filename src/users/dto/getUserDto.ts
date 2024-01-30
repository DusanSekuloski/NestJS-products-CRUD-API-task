import { Users } from 'src/entities/users.entity';

export class GetUserDto {
  id: number;

  first_name: string;

  last_name: string;

  email: string;

  created_at: Date;

  constructor(user: Users) {
    this.id = user.id;
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.email = user.email;
    this.created_at = user.created_at;
  }
}
