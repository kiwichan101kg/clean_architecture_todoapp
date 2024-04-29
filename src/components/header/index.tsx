import React from "react";
import { ChevronLeftIcon } from "../svg/ChevronLeftIcon";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="bg-sky-500 p-4 shadow-md flex items-center">
      <Link href="/" className="mr-2">
        <ChevronLeftIcon />
      </Link>
    </header>
  );
};
