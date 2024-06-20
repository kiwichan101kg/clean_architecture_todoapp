import { UserRepositoryInterface } from "@/application/interfaces/user.repository";
import { User } from "@/domain/user";
import { db } from "@/lib/firebase/firebase";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";

export class UserRepository implements UserRepositoryInterface {
  async save(user: User): Promise<void> {
    // DBにユーザーを保存する処理の具体的な実装
    const docData = {
      id: user.id,
      username: user.username,
      passwordHash: user.passwordHash,
      role: user.role,
    };

    await setDoc(doc(db, "tasks", user.id), docData);
  }

  async findById(userId: string): Promise<User | null> {
    // DBからユーザーを検索する処理の具体的な実装
    const col = collection(db, "users");
    const q = query(col, where("id", "==", userId));
    const user = await getDocs(q).then((snapshot) => {
      const data = snapshot.docs[0].data();
      return {
        id: data.id,
        username: data.username,
        passwordHash: data.passwordHash,
        role: data.role,
      } as User;
    });
    return user;
  }
}
