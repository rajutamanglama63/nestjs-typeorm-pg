import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {

  // inject user repository
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    let user: User = new User()
    user.firstname = createUserDto.firstname;
    user.lastname = createUserDto.lastname;
    user.age = createUserDto.age;
    return this.userRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.userRepository.findOne({
      where: {
        id: id
      }
    })
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    let user: User = new User()
    user.firstname = updateUserDto.firstname;
    user.lastname = updateUserDto.lastname;
    user.age = updateUserDto.age;
    user.id = id;
    return this.userRepository.save(user);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
