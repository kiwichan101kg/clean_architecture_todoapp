import { Task } from "@/domain/task";
import Link from "next/link";
import React from "react";
import { DeleteIcon } from "../svg/DeleteIcon";

type TodoListProps = {
  tasks: Task[];
};
export const TodoList = ({ tasks }: TodoListProps) => {
  return (
    <div>
      <ul>
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex justify-between mx-1 my-2 px-4 items-center border-l-4 border-blue-400 rounded shadow-sm hover:scale-95 duration-200"
          >
            <Link href={`/task/${task.id}`} className="flex-grow">
              <p className="block p-4 w-full text-left">{task.title}</p>
            </Link>
            <button className="px-1 py-1 my-1  font-semibold   hover:bg-gray-100 hover:rounded-sm hover:scale-95 duration-200">
              <DeleteIcon size={24} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
