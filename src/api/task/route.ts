import { TaskService } from "@/application/service/task";
import { Task } from "@/domain/task";
import { TaskRepository } from "@/infrastructure/repositories/task.repository";
import { UserRepository } from "@/infrastructure/repositories/user.repository";

const taskRepository = new TaskRepository();
const userRepository = new UserRepository();
const taskService = new TaskService(taskRepository, userRepository);

export const getAllTasks = async (): Promise<Task[] | null> => {
  const tasks = await taskService.getAllTasks();
  return tasks;
};
