import { User } from "@/domain/user";

export interface UserRepositoryInterface {
  save(user: User): Promise<User>;
  findById(userId: string): Promise<User | null>;
}
