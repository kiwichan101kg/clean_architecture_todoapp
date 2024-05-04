import { TaskService } from "@/application/service/task";
import { TaskRepository } from "@/infrastructure/repositories/task.repository";
import { UserRepository } from "@/infrastructure/repositories/user.repository";
import { NextRequest, NextResponse } from "next/server";

const taskRepository = new TaskRepository();
const userRepository = new UserRepository();
const taskService = new TaskService(taskRepository, userRepository);

// "http://localhost:3000/api/task/[id]"
export async function GET(req: NextRequest): Promise<NextResponse> {
  const id: string = req.url.split("/tasks/")[1]; //　パスパラメーターの上手い取得方法がわからなかった
  const task = await taskService.getTaskById(id);
  return NextResponse.json({ message: "Success", data: task }, { status: 200 });
}
