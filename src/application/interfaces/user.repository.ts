import { User } from "@/domain/user";

export interface UserRepositoryInterface {
  save(user: User): Promise<void>;
  findById(userId: string): Promise<User | null>;
}
