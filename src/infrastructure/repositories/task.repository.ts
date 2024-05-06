import { TaskRepositoryInterface } from "@/application/interfaces/task.repository";
import { Task } from "@/domain/task";

export class TaskRepository implements TaskRepositoryInterface {
  private baseUrl: string = "http://localhost:3001";

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

  async findAllTasks(): Promise<Task[]> {
    const response = await fetch(`${this.baseUrl}/tasks`);
    const tasks = await response.json();
    return tasks;
  }

  async findById(taskId: string): Promise<Task | null> {
    const response = await fetch(`${this.baseUrl}/tasks/${taskId}`);
    if (!response.ok) return null;
    const taskData = await response.json();

    // Task クラスのコンストラクタを使用してインスタンスを作成
    const task = new Task(
      taskData.title,
      taskData.description,
      new Date(taskData.dueDate),
      taskData.priority,
      taskData.id
    );
    return task;
  }

  async delete(taskId: string): Promise<void> {
    await fetch(`${this.baseUrl}/tasks/${taskId}`, {
      method: "DELETE",
    });
  }
}
