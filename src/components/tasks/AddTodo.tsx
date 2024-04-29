import React from "react";
import { PlusIcon } from "../svg/PlusIcon";

export const AddTodo = () => {
  return (
    <div>
      <button className="w-full flex items-center justify-center rounded-md px-3 py-2 my-3  bg-sky-500  hover:bg-sky-700 hover:scale-95 duration-200  ">
        <PlusIcon />
      </button>
    </div>
  );
};
