import React from "react";

export const AddTodo = () => {
  return (
    <div>
      <form>
        <label className="block">
          <input
            type="text"
            // value={input}
            className="mt-3 px-3 py-2 bg-white border shadow-sm border-slate-300 focus:outline-none focus:border-sky-400 block w-full rounded-md sm:text-sm focus:ring-1"
          />
        </label>
        <button className="w-full rounded-md px-3 py-2 my-3 text-white bg-sky-500  hover:bg-sky-700 hover:scale-95 duration-200  ">
          Add Task
        </button>
      </form>
    </div>
  );
};
