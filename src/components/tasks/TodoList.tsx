"use client";
import { Task } from "@/domain/task";
import Link from "next/link";
import React from "react";
import { DeleteIcon } from "../svg/DeleteIcon";
import { useRouter } from "next/navigation";

type TodoListProps = {
  tasks: Task[];
};
export const TodoList = ({ tasks }: TodoListProps) => {
  const router = useRouter();
  const handleDeleteById = async (taskId: string) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/tasks/${taskId}`,
        {
          cache: "no-cache",
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const resJson = await response.json();
      alert("タスクが正常に削除されました");
      router.refresh();
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      alert("タスクの削除に失敗しました");
    }
  };
  return (
    <div>
      <ul>
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex justify-between mx-1 my-2 px-4 items-center border-l-4 border-blue-400 rounded shadow-sm hover:scale-95 duration-200"
          >
            <Link href={`/tasks/${task.id}`} className="flex-grow">
              <p className="block p-4 w-full text-left">{task.title}</p>
            </Link>
            <button
              onClick={() => handleDeleteById(task.id)}
              className="px-1 py-1 my-1  font-semibold   hover:bg-gray-100 hover:rounded-sm hover:scale-95 duration-200"
            >
              <DeleteIcon size={24} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
