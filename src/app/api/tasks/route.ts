import { TaskService } from "@/application/service/task";
import { Priority, Task } from "@/domain/task";
import { TaskRepository } from "@/infrastructure/repositories/task.repository";
import { UserRepository } from "@/infrastructure/repositories/user.repository";
import { NextRequest, NextResponse } from "next/server";

const taskRepository = new TaskRepository();
const userRepository = new UserRepository();
const taskService = new TaskService(taskRepository, userRepository);

// "http://localhost:3000/api/tasks"
export const GET = async (): Promise<NextResponse> => {
  // DB処理を含む操作
  const tasks = await taskService.getAllTasks();
  return NextResponse.json(
    { message: "Success", data: tasks },
    { status: 200 }
  );
};

type createTaskReq = {
  userId: string;
  title: string;
  description: string;
  dueDate: Date;
  priority: Priority;
};
// "http://localhost:3000/api/tasks"
export const POST = async (req: Request): Promise<NextResponse> => {
  // DB処理を含む操作
  try {
    const newTask: createTaskReq = await req.json();
    const task = await taskService.createTask(newTask);
    return NextResponse.json(
      { message: "Success", data: task },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error parsing request body:", error);
    return NextResponse.json(
      { message: "Error parsing request body" },
      { status: 400 }
    );
  }
};
