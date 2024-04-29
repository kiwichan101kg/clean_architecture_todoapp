import { AddTodo } from "@/components/home/AddTodo";
import { TodoList } from "@/components/home/TodoList";
import React from "react";

const getAllTasks = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/task");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
};

export const HomeScreen = async () => {
  const data = await getAllTasks();
  console.log("レスポンス", data);

  return (
    <div className="flex justify-center min-h-screen bg-gray-200">
      <div className="w-10/12 m-5  p-8  flex flex-col text-center  rounded-md bg-white">
        <h1 className="font-bold text-4xl text-gray-700">TODO APP</h1>
        <div>
          <AddTodo />
          <TodoList tasks={data.tasks || []} />
        </div>
      </div>
    </div>
  );
};
