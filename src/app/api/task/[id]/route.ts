import { TaskService } from "@/application/service/task";
import { TaskRepository } from "@/infrastructure/repositories/task.repository";
import { UserRepository } from "@/infrastructure/repositories/user.repository";
import { NextRequest, NextResponse } from "next/server";

const taskRepository = new TaskRepository();
const userRepository = new UserRepository();
const taskService = new TaskService(taskRepository, userRepository);

// "http://localhost:3000/api/task/[id]"
export async function GET(req: NextRequest): Promise<NextResponse> {
  const id: string = req.url.split("/task/")[1];
  const task = await taskService.getTaskById(id);
  return NextResponse.json({ message: "Success", data: task }, { status: 200 });
}
