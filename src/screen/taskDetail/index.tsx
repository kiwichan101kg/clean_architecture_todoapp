// "use client";
import { Task, TaskDetail } from "@/domain/task";
import { useParams, useRouter } from "next/navigation";
import React from "react";

const getTaskById = async (taskId: string): Promise<Task | undefined> => {
  try {
    const response = await fetch(`http://localhost:3000/api/task/${taskId}`, {
      cache: "no-cache",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const resJson = await response.json();
    return resJson.data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
};

export const TaskDetailScreen = async ({ id }: { id: string }) => {
  const task = await getTaskById(id);
  console.log("タスク詳細", task);
  const strDate = formatDate(new Date(task!.dueDate));

  return (
    <div className="flex justify-center min-h-screen bg-gray-200">
      <div className="w-10/12 max-w-4xl mx-auto m-10 p-8 flex flex-col text-center rounded-lg bg-white shadow-lg">
        <h1 className="text-left font-bold text-4xl text-gray-800 mb-5">
          {task?.title}
        </h1>

        <div className="flex justify-between items-center py-2 border-b border-gray-300">
          <div className="text-gray-600 text-lg">優先度</div>
          <div className="text-gray-800 text-lg font-medium">
            {task?.priority}
          </div>
        </div>

        <div className="flex justify-between items-center py-2 border-b border-gray-300">
          <div className="text-gray-600 text-lg">期限</div>
          <div className="text-gray-800 text-lg font-medium">{strDate}</div>
        </div>

        <div className="flex justify-between items-center py-2 border-b border-gray-300">
          <div className="text-gray-600 text-lg">ステータス</div>
          <div className="text-gray-800 text-lg font-medium">
            {task?.status || "進行中"}
          </div>
        </div>

        <div className="mt-4">
          <p className="text-left text-gray-700 text-lg">{task?.description}</p>
        </div>
      </div>
    </div>
  );
};

// Date -> YYYY/MM/DD
const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  return `${year}/${month}/${day}`;
};
