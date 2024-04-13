import React from "react";

type ChevronLeftIconProps = {
  width?: string;
  height?: string;
  color?: string;
};
export const ChevronLeftIcon = ({
  width = "32",
  height = "32",
  color = "#fff",
}: ChevronLeftIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
};
