import { TaskService } from "@/application/service/task";
import { Task } from "@/domain/task";
import { TaskRepository } from "@/infrastructure/repositories/task.repository";
import { UserRepository } from "@/infrastructure/repositories/user.repository";

const taskRepository = new TaskRepository();
const userRepository = new UserRepository();
const taskService = new TaskService(taskRepository, userRepository);

//"http://localhost:3000/api/task"
export const GET = async (): Promise<any> => {
  // DB処理を含む操作
  const tasks = await taskService.getAllTasks();
  return tasks;
};
