import { TaskRepositoryInterface } from "@/application/interfaces/task.repository";
import { Priority, Task } from "@/domain/task";
import db from "@/lib/firebase/firebase";
import {
  Timestamp,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

export class TaskRepository implements TaskRepositoryInterface {
  private baseUrl: string = "http://localhost:3001";

  // タスクの保存
  async save(task: Task): Promise<Task> {
    // DBにタスクを保存する処理の具体的な実装
    const response = await fetch(`${this.baseUrl}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
    const data = await response.json();
    return new Task(data.title, data.description, data.dueDate, data.priority);
  }

  // タスク一覧の取得
  async findAllTasks(): Promise<Task[]> {
    const tasks = await getDocs(collection(db, "tasks")).then((snapshot) =>
      snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: data.id,
          title: data.title as string,
          description: data.description as string,
          dueDate: formatDate(data.dueDate), // timestamp -> string
          priority: data.priority as Priority,
          status: data.status as string,
        } as Task;

        // const task = new Task(
        //   data.title as string,
        //   data.description as string,
        //   String(data.dueDate),
        //   data.priority as Priority,
        //   data.id as string
        // );
        // return task;

        // return { ...doc.data() } as Task;
      })
    );
    return tasks;
  }

  // タスクの取得
  async findById(taskId: string): Promise<Task | null> {
    const col = collection(db, "tasks");
    const q = query(col, where("id", "==", taskId));
    const task = await getDocs(q).then((snapshot) => {
      const data = snapshot.docs[0].data();
      return {
        id: data.id,
        title: data.title,
        description: data.description,
        dueDate: formatDate(data.dueDate),
        priority: data.priority as Priority,
        status: data.status,
      } as Task;
    });
    return task;
  }

  // タスクの更新
  async update(task: Task): Promise<Task> {
    // DBにタスクを保存する処理の具体的な実装
    const response = await fetch(`${this.baseUrl}/tasks/${task.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
    const data = await response.json();
    return new Task(
      data.title,
      data.description,
      data.dueDate,
      data.priority,
      data.id
    );
  }

  // タスクの削除
  async delete(taskId: string): Promise<void> {
    await fetch(`${this.baseUrl}/tasks/${taskId}`, {
      method: "DELETE",
    });
  }
}

const formatDate = (timestamp: Timestamp): string => {
  const date = timestamp.toDate();
  return date.toISOString().split("T")[0]; // "YYYY-MM-DD"形式に変換
};
