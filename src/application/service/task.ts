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
  async createTask(req: {
    userId: string;
    title: string;
    description: string;
    dueDate: string;
    priority: Priority;
  }) {
    // ユーザーの存在とユーザーの権限の確認
    const user = await this.userRepository.findById(req.userId);
    if (!user) throw new Error("User not found.");
    if (!User.isAdmin(user.role)) throw new Error("Only admins can add tasks.");

    const task = new Task(
      req.title,
      req.description,
      req.dueDate,
      req.priority
    );

    // DBに保存
    return await this.taskRepository.save(task);
  }

  // タスク一覧の取得
  async getAllTasks(): Promise<Task[] | null> {
    // タスク一覧をDBから検索
    return await this.taskRepository.findAllTasks();
  }

  // タスクの取得
  async getTaskById(taskId: string): Promise<Task | null> {
    // タスクをDBから検索
    return await this.taskRepository.findById(taskId);
  }

  // タスクの編集
  async editTask(req: {
    userId: string;
    taskId: string;
    title?: string;
    description?: string;
    dueDate?: string;
    priority?: Priority;
  }) {
    // タスクの存在確認
    const task = await this.taskRepository.findById(req.taskId);
    if (!task) throw new Error("Task not found.");
    // ユーザーの存在とユーザーの権限の確認
    const user = await this.userRepository.findById(req.userId);
    if (!user) throw new Error("User not found.");
    if (!User.isAdmin(user.role)) throw new Error("Only admins can add tasks.");

    if (
      req.title !== undefined ||
      req.description !== undefined ||
      req.dueDate !== undefined ||
      req.priority !== undefined
    ) {
      const updateTask: TaskDetail = {
        title: req.title,
        description: req.description,
        dueDate: req.dueDate,
        priority: req.priority,
      };
      // 編集内容に応じてタスクデータを更新
      task.updateTask(updateTask);

      // DBに保存
      return await this.taskRepository.update(task);
    } else {
      throw new Error("At least one edit task detail required.");
    }
  }

  // タスクの削除
  async deleteTask(req: { userId: string; taskId: string }) {
    // タスクの存在確認
    const task = await this.taskRepository.findById(req.taskId);
    if (!task) throw new Error("Task not found.");
    // ユーザーの存在とユーザーの権限の確認
    const user = await this.userRepository.findById(req.userId);
    if (!user) throw new Error("User not found.");
    if (!User.isAdmin(user.role))
      throw new Error("Only admins can delete tasks.");

    // DBから削除
    return await this.taskRepository.delete(req.taskId);
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
