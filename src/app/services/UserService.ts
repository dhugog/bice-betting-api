import { User } from "../models/User";
import UserRepository from "../repositories/UserRepository";

class UserService {
  async getUser(id: number): Promise<User | null> {
    return UserRepository.getUser(id);
  }

  async getUsersList(): Promise<User[]> {
    return UserRepository.getUsersList();
  }

  async createUser(userData: { name: string, balance: number }): Promise<User> {
    return UserRepository.createUser(User.build(userData));
  }
}

export default new UserService();