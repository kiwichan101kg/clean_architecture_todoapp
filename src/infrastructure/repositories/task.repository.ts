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

  async findAllTasks(): Promise<Task[]> {
    const response = await fetch(`${this.baseUrl}/tasks`);
    const tasks = await response.json();
    return tasks.map(
      (taskData: any) =>
        new Task(
          taskData.title,
          taskData.description,
          taskData.dueDate,
          taskData.priority
        )
    );
  }

  async findById(taskId: string): Promise<Task | null> {
    const response = await fetch(`${this.baseUrl}/tasks/${taskId}`);
    if (!response.ok) return null;
    const data = await response.json();
    return new Task(data.title, data.description, data.dueDate, data.priority);
  }

  async delete(taskId: string): Promise<void> {
    await fetch(`${this.baseUrl}/tasks/${taskId}`, {
      method: "DELETE",
    });
  }
}
