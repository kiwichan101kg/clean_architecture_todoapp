import { TaskService } from "@/application/service/task";
import { Task } from "@/domain/task";
import { TaskRepository } from "@/infrastructure/repositories/task.repository";
import { UserRepository } from "@/infrastructure/repositories/user.repository";
import { NextRequest, NextResponse } from "next/server";

const taskRepository = new TaskRepository();
const userRepository = new UserRepository();
const taskService = new TaskService(taskRepository, userRepository);

// "http://localhost:3000/api/task/[id]"
export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: { id: string };
  }
): Promise<NextResponse> {
  const id: string = req.url.split("/task/")[1];
  // const id = params.id;
  const task = await taskService.getTaskById(id);
  console.log("タスク取得API実行", req.url, id, task);
  return NextResponse.json({ message: "Success", data: task }, { status: 200 });
}
