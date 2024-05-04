import { UserRepositoryInterface } from "@/application/interfaces/user.repository";
import { User } from "@/domain/user";

export class UserRepository implements UserRepositoryInterface {
  private baseUrl: string = "http://localhost:3001";

  async save(user: User): Promise<User> {
    // DBにユーザーを保存する処理の具体的な実装
    const response = await fetch(`${this.baseUrl}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    return new User(data.username, data.password, data.role);
  }

  async findById(userId: string): Promise<User | null> {
    // DBからユーザーを検索する処理の具体的な実装
    const response = await fetch(`${this.baseUrl}/users/${userId}`);
    if (!response.ok) return null;
    const user = await response.json();
    return user;
  }
}
