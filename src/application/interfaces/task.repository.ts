import { Task } from "@/domain/task";

export interface TaskRepositoryInterface {
  save(task: Task): Promise<void>;
  update(taskId: string, task: Partial<Task>): Promise<void>;
  findById(taskId: string): Promise<Task | null>;
  findAllTasks(): Promise<Task[] | null>;
  delete(taskId: string): void;
}
