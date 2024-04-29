import React from "react";

export const NewTaskScreen = () => {
  return (
    <div className="flex justify-center min-h-screen bg-gray-200">
      <div className="w-10/12 max-w-4xl mx-auto m-10 p-8 flex flex-col text-center rounded-lg bg-white shadow-lg">
        <form action="">
          <h1 className="text-left font-bold text-3xl text-gray-800 mb-5">
            <input
              type="text"
              name="title"
              // value={task.title}
              // onChange={handleChange}
              className="form-input w-full p-2 text-3xl font-bold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
              placeholder="タスクのタイトル"
            />
          </h1>

          <div className="flex justify-between items-center py-2 border-b border-gray-300">
            <div className="text-gray-600 text-lg">優先度</div>
            <select
              name="priority"
              // value={task.priority}
              // onChange={handleChange}
              className="form-select px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              <option value="低">低</option>
              <option value="中">中</option>
              <option value="高">高</option>
            </select>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-gray-300">
            <div className="text-gray-600 text-lg">期限</div>
            <input
              type="date"
              name="dueDate"
              // value={task.dueDate.slice(0, 10)}  // yyyy-mm-dd 形式に変換
              // onChange={handleChange}
              className="form-input px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <div className="flex justify-between items-center py-2 border-b border-gray-300">
            <div className="text-gray-600 text-lg">ステータス</div>
            <select
              name="status"
              // value={task.status}
              // onChange={handleChange}
              className="form-select px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              <option value="未着手">未着手</option>
              <option value="進行中">進行中</option>
              <option value="完了">完了</option>
            </select>
          </div>

          <div className="mt-4">
            <textarea
              name="description"
              // value={task.description}
              // onChange={handleChange}
              className="form-textarea w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
              rows={4}
              placeholder="タスクの説明"
            ></textarea>
          </div>

          <button
            type="submit"
            // onClick={handleSave}
            className="mt-4 w-full rounded-md px-3 py-2 bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-white font-bold"
          >
            新規作成
          </button>
        </form>
      </div>
    </div>
  );
};
