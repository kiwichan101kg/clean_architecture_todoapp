import { Task } from "@/domain/task";

export interface TaskRepositoryInterface {
  save(task: Task): Promise<Task>;
  findById(taskId: string): Promise<Task | null>;
  findAllTasks(): Promise<Task[] | null>;
  delete(taskId: string): void;
}
