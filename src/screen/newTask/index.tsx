"use client";
import { Priority } from "@/domain/task";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

type FormValue = {
  title: string;
  description: string;
  dueDate: Date;
  priority: Priority;
};

export const NewTaskScreen = () => {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm<FormValue>({
    defaultValues: {
      title: "",
      description: "",
      dueDate: undefined,
      priority: undefined,
    },
  });

  const today = new Date();

  const onSubmit = async (data: FormValue) => {
    console.log("Submitting data", data);

    try {
      const response = await fetch("http://localhost:3000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: data.title,
          description: data.description,
          priority: data.priority,
          userId: "xxx",
          dueDate: data.dueDate, // ここでは適宜Date型のデータを扱うようにするか、適切な形式に変換
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Response:", result);
      alert("タスクが正常に作成されました");
      router.push("/tasks");
    } catch (error) {
      console.error("Failed to submit task:", error);
      alert("タスクの作成に失敗しました");
    }
  };

  return (
    <div className="flex justify-center min-h-screen bg-gray-200">
      <div className="w-10/12 max-w-4xl mx-auto m-10 p-8 flex flex-col text-center rounded-lg bg-white shadow-lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-left font-bold text-3xl text-gray-800 mb-2">
            <input
              type="text"
              {...register("title", { required: "タスクのタイトルは必須です" })}
              className={`form-input w-full p-2 text-3xl  border ${
                errors.title
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-sky-500"
              } rounded-md focus:outline-none focus:ring-2`}
              placeholder="タスクのタイトル"
            />
          </h1>
          <div className="text-red-500 text-sm mb-5 text-right">
            {errors.title && <p>{errors.title.message}</p>}
          </div>

          <div className="flex justify-between items-center py-2 border-b border-gray-300">
            <div className="text-gray-600 text-lg">優先度</div>
            <select
              {...register("priority", { required: "優先度の選択は必須です" })}
              className={`form-select px-4 py-2 border ${
                errors.priority
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-sky-500"
              } rounded-md text-gray-700 focus:outline-none focus:ring-2`}
            >
              <option value="">選択してください</option>
              <option value="低">低</option>
              <option value="中">中</option>
              <option value="高">高</option>
            </select>
          </div>
          <div className="text-red-500 text-sm mb-5 text-right">
            {errors.priority && <p>{errors.priority.message}</p>}
          </div>

          <div className="flex justify-between items-center py-2 border-b border-gray-300">
            <div className="text-gray-600 text-lg">期限</div>
            <input
              type="date"
              {...register("dueDate", {
                required: "期限の設定は必須です",
                // validate: (value) =>
                //   value >= today || "過去の日付は選択できません",
              })}
              className={`form-input px-4 py-2 border ${
                errors.dueDate
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-sky-500"
              } rounded-md focus:outline-none focus:ring-2`}
            />
          </div>
          <div className="text-red-500 text-sm mb-5 text-right">
            {errors.dueDate && <p>{errors.dueDate.message}</p>}
          </div>

          <div className="mt-4">
            <textarea
              {...register("description", {
                required: "タスクの説明は必須です",
              })}
              className={`form-textarea w-full px-4 py-2 border ${
                errors.description
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-sky-500"
              } rounded-md focus:outline-none focus:ring-2`}
              rows={4}
              placeholder="タスクの説明"
            ></textarea>
          </div>
          <div className="text-red-500 text-sm mb-5 text-right">
            {errors.description && <p>{errors.description.message}</p>}
          </div>

          <button
            type="submit"
            className="mt-4 w-full rounded-md px-3 py-2 bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-white font-bold"
          >
            新規作成
          </button>
        </form>
      </div>
    </div>
  );
};
