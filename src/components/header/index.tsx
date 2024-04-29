import React from "react";
import { ChevronLeftIcon } from "../svg/ChevronLeftIcon";

export const Header = () => {
  return (
    <header className="bg-sky-500 p-4 shadow-md flex items-center">
      <button className="mr-2">
        <ChevronLeftIcon />
      </button>
    </header>
  );
};
