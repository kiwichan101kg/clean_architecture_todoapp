import { SighIn } from "@/components/home/SighIn";
import React from "react";

export const HomeScreen = async () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      <div className="w-10/12 max-w-4xl m-5 p-8 flex flex-col text-center rounded-md bg-white shadow-lg">
        <h1 className="font-bold text-4xl text-gray-700 mb-4">TASK MANAGERS</h1>
        <p className="text-gray-600 mb-8">
          タスクを管理し、生産性を向上させましょう。
        </p>
        <div className="flex justify-center gap-4 mb-4">
          <SighIn />
        </div>
        <footer className="text-sm text-gray-500 mt-10">
          © 2024 TODO APP, Inc. All rights reserved.
        </footer>
      </div>
    </div>
  );
};
