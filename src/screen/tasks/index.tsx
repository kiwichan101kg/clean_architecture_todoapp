import { TaskService } from "@/application/service/task";
import { AddTodo } from "@/components/tasks/AddTodo";
import { TodoList } from "@/components/tasks/TodoList";
import { Task } from "@/domain/task";
import { TaskRepository } from "@/infrastructure/repositories/task.repository";
import { UserRepository } from "@/infrastructure/repositories/user.repository";
import db from "@/lib/firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import React from "react";

// const getAllTasks = async () => {
//   try {
//     const response = await fetch("http://localhost:3000/api/tasks", {
//       cache: "no-cache",
//     });
//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }
//     const resJson = await response.json();
//     return resJson.data;
//   } catch (error) {
//     console.error("There was a problem with the fetch operation:", error);
//   }
// };

// サーバーコンポーネントで直接呼び出すことができる
const getAllTask = async () => {
  const taskRepository = new TaskRepository();
  const userRepository = new UserRepository();
  const taskService = new TaskService(taskRepository, userRepository);

  // DB処理を含む操作
  const tasks = await taskService.getAllTasks();
  return tasks;
};

export const TasksScreen = async () => {
  const tasks = await getAllTask();

  return (
    <div className="flex justify-center min-h-screen bg-gray-200">
      <div className="w-10/12 m-5  p-8  flex flex-col text-center  rounded-md bg-white">
        <h1 className="font-bold text-4xl text-gray-700">タスク一覧</h1>
        <div>
          <AddTodo />
          {/* <TodoList tasks={(tasksData as unknown as Task[]) || []} /> */}
          <TodoList tasks={tasks || []} />
        </div>
      </div>
    </div>
  );
};
