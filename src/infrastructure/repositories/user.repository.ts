import { UserRepositoryInterface } from "@/application/interfaces/user.repository";
import { Task } from "@/domain/task";
import { User } from "@/domain/user";

export class UserRepository implements UserRepositoryInterface {
  async save(user: User): Promise<User> {
    // DBにユーザーを保存する処理の具体的な実装
    return user;
  }

  async findById(userId: string): Promise<User | null> {
    // DBからユーザーを検索する処理の具体的な実装
    return null;
  }
}
