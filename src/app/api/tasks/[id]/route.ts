import { TaskService } from "@/application/service/task";
import { TaskRepository } from "@/infrastructure/repositories/task.repository";
import { UserRepository } from "@/infrastructure/repositories/user.repository";
import { NextRequest, NextResponse } from "next/server";

const taskRepository = new TaskRepository();
const userRepository = new UserRepository();
const taskService = new TaskService(taskRepository, userRepository);

// "http://localhost:3000/api/tasks/[id]"
export async function GET(req: NextRequest): Promise<NextResponse> {
  const id: string = req.url.split("/tasks/")[1]; //　パスパラメーターの上手い取得方法がわからなかった
  const task = await taskService.getTaskById(id);
  return NextResponse.json({ message: "Success", data: task }, { status: 200 });
}

// "http://localhost:3000/api/tasks/[id]"
export async function PUT(req: NextRequest): Promise<NextResponse> {
  const id: string = req.url.split("/tasks/")[1]; //　パスパラメーターの上手い取得方法がわからなかった
  const editTask = await req.json();

  const editTaskReq = {
    taskId: id,
    userId: "xxx",
    ...editTask,
  };
  const task = await taskService.editTask(editTaskReq);
  return NextResponse.json({ message: "Success", data: task }, { status: 200 });
}

// "http://localhost:3000/api/tasks/[id]"
export async function DELETE(req: NextRequest): Promise<NextResponse> {
  const id: string = req.url.split("/tasks/")[1]; //　パスパラメーターの上手い取得方法がわからなかった
  console.log("リクエスト", id);

  const deleteTaskReq = {
    userId: "xxx",
    taskId: id,
  };
  const task = await taskService.deleteTask(deleteTaskReq);
  return NextResponse.json({ message: "Success", data: task }, { status: 200 });
}
