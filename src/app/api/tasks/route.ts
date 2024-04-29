import { TaskService } from "@/application/service/task";
import { TaskRepository } from "@/infrastructure/repositories/task.repository";
import { UserRepository } from "@/infrastructure/repositories/user.repository";
import { NextResponse } from "next/server";

const taskRepository = new TaskRepository();
const userRepository = new UserRepository();
const taskService = new TaskService(taskRepository, userRepository);

//"http://localhost:3000/api/task"
export const GET = async (): Promise<NextResponse> => {
  // DB処理を含む操作
  const tasks = await taskService.getAllTasks();
  return NextResponse.json(
    { message: "Success", data: tasks },
    { status: 200 }
  );
};
