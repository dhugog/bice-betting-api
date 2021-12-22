import { User } from "../models/User";

class UserRepository {
  async getUser(id: number): Promise<User | null> {
    return User.findByPk(id);
  }

  async getUsersList(): Promise<User[]> {
    return User.findAll();
  }

  async createUser(user: User): Promise<User> {
    return user.save();
  }
}

export default new UserRepository();