import { Task } from "@/domain/task";
import Link from "next/link";
import React from "react";

type TodoListProps = {
  tasks: Task[];
};
export const TodoList = ({ tasks }: TodoListProps) => {
  const id = "1";
  return (
    <div>
      <ul>
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex justify-between mx-1 my-2 px-4 items-center border-l-4 border-blue-400 rounded shadow-sm"
          >
            <Link href={`/todo/${task.id}`} className="flex-grow">
              <p className="block p-4 w-full text-left">{task.title}</p>
            </Link>
            <button className="px-2 py-1 m-1 border font-semibold rounded text-red-400 border-red-500 hover:bg-red-100 hover:scale-95 duration-200">
              削除
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
