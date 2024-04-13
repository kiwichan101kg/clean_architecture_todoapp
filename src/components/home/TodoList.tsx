import Link from "next/link";
import React from "react";

export const TodoList = () => {
  const id = "1";
  return (
    <div>
      <ul>
        <div className="flex justify-between mx-1 my-2 px-4 items-center border-l-4 border-blue-400 rounded shadow-sm">
          <Link href={`/todo/${id}`} className="flex-grow">
            <li className="block p-4 w-full text-left">買い物</li>
          </Link>
          <button className="px-2 py-1 m-1 border font-semibold rounded text-red-400 border-red-500 hover:bg-red-100 hover:scale-95 duration-200">
            削除
          </button>
        </div>
      </ul>
    </div>
  );
};
