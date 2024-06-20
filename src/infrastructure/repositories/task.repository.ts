import { TaskRepositoryInterface } from "@/application/interfaces/task.repository";
import { Priority, Task } from "@/domain/task";
import { db } from "@/lib/firebase/firebase";
import {
  Timestamp,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

export class TaskRepository implements TaskRepositoryInterface {
  // タスクの保存
  async save(task: Task): Promise<void> {
    // DBにタスクを保存する処理の具体的な実装
    const docData = {
      id: task.id,
      title: task.title,
      description: task.description,
      dueDate: dateStringToTimestamp(task.dueDate), // Date -> timestamp
      priority: task.priority,
      status: task.status,
    };

    await setDoc(doc(db, "tasks", task.id), docData);
    return;
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
  async update(taskId: string, task: Partial<Task>): Promise<void> {
    // DBにタスクを保存する処理の具体的な実装
    const updateDocData = {
      id: taskId,
      title: task.title || null,
      description: task.description || null,
      dueDate: task.dueDate ? dateStringToTimestamp(task.dueDate) : null,
      priority: task.priority || null,
      status: task.status || null,
    };
    await updateDoc(doc(db, "tasks", taskId), updateDocData);
    return;
  }

  // タスクの削除
  async delete(taskId: string): Promise<void> {
    console.log("削除", taskId);

    await deleteDoc(doc(db, "tasks", taskId));
  }
}

// Timestamp -> "YYYY-MM-DD"
const formatDate = (timestamp: Timestamp): string => {
  const date = timestamp.toDate();
  return date.toISOString().split("T")[0]; // "YYYY-MM-DD"形式に変換
};

// "YYYY-MM-DD" -> Timestamp
function dateStringToTimestamp(dateString: string): Timestamp {
  const date = new Date(dateString);
  return Timestamp.fromDate(date);
}
