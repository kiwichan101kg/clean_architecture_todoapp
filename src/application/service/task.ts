import { User } from "@/domain/user";
import { TaskRepositoryInterface } from "../interfaces/task.repository";
import { UserRepositoryInterface } from "../interfaces/user.repository";
import { Priority, Status, Task, TaskDetail } from "@/domain/task";

export class TaskService {
  constructor(
    private taskRepository: TaskRepositoryInterface,
    private userRepository: UserRepositoryInterface
  ) {}

  // タスクの新規作成
  async createTask(
    userId: string,
    title: string,
    description: string,
    dueDate: Date,
    priority: Priority
  ) {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new Error("User not found.");
    if (!user.isAdmin()) throw new Error("Only admins can add tasks.");

    const task = new Task(title, description, dueDate, priority);
    return await this.taskRepository.save(task);
  }

  // タスク一覧の取得
  async getAllTasks(): Promise<Task[] | null> {
    return await this.taskRepository.findAllTasks();
  }

  // タスクの取得
  async getTaskById(taskId: string): Promise<Task | null> {
    return await this.taskRepository.findById(taskId);
  }

  // タスクの編集
  async editTask(userId: string, taskId: string, taskDetail: TaskDetail) {
    const task = await this.taskRepository.findById(taskId);
    if (!task) throw new Error("Task not found.");
    const user = await this.userRepository.findById(userId);
    if (!user) throw new Error("User not found.");
    if (!user.isAdmin()) {
      throw new Error("Only admins can edit tasks.");
    }
    if (Object.keys(taskDetail).length) {
      // タスクの更新
      task.updateTask(taskDetail);
      // DBに保存
      return await this.taskRepository.save(task);
    } else {
      throw new Error("edit task details required.");
    }
  }

  // タスクの削除
  async deleteTask(userId: string, taskId: string) {
    const task = await this.taskRepository.findById(taskId);
    if (!task) throw new Error("Task not found.");
    const user = await this.userRepository.findById(userId);
    if (!user) throw new Error("User not found.");
    if (!user.isAdmin()) throw new Error("Only admins can delete tasks.");

    // DBに保存
    return await this.taskRepository.delete(taskId);
  }

  // ステータスの更新
  async editStatus(userId: string, taskId: string, status: Status) {
    const task = await this.taskRepository.findById(taskId);
    if (!task) throw new Error("Task not found.");
    const user = await this.userRepository.findById(userId);
    if (!user) throw new Error("User not found.");

    // ステータスの更新
    task.updateStatus(status);
    // DBに保存
    return this.taskRepository.save(task);
  }
}
