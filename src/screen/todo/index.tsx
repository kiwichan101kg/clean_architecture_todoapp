import { AddTodo } from "@/components/home/AddTodo";
import { TodoList } from "@/components/home/TodoList";
import React from "react";

export const TodoDetailScreen = () => {
  return (
    <div className="flex justify-center min-h-screen bg-gray-200">
      <div className="w-10/12 max-w-4xl mx-auto m-10 p-8 flex flex-col text-center rounded-lg bg-white shadow-lg">
        <h1 className="text-left font-bold text-4xl text-gray-800 mb-5">
          買い物
        </h1>

        <div className="flex justify-between items-center py-2 border-b border-gray-300">
          <div className="text-gray-600 text-lg">優先度</div>
          <div className="text-gray-800 text-lg font-medium">高</div>
        </div>

        <div className="flex justify-between items-center py-2 border-b border-gray-300">
          <div className="text-gray-600 text-lg">期限</div>
          <div className="text-gray-800 text-lg font-medium">2024/05/01</div>
        </div>

        <div className="flex justify-between items-center py-2 border-b border-gray-300">
          <div className="text-gray-600 text-lg">ステータス</div>
          <div className="text-gray-800 text-lg font-medium">進行中</div>
        </div>

        <div className="mt-4">
          <p className="text-left text-gray-700 text-lg">
            西友に焼肉の材料を買いに行く
          </p>
        </div>
      </div>
    </div>
  );
};
