import { AddTodo } from "@/components/home/AddTodo";
import { TodoList } from "@/components/home/TodoList";
import React from "react";

export const HomeScreen = () => {
  return (
    <div className="flex justify-center min-h-screen bg-gray-200">
      <div className="w-10/12 m-5  p-8  flex flex-col text-center  rounded-md bg-white">
        <h1 className="font-bold text-4xl text-gray-700">TODO APP</h1>

        <div>
          <AddTodo />
          <TodoList />
        </div>
      </div>
    </div>
  );
};
