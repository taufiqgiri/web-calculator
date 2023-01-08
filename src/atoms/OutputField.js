import React from "react";

export default function OutputField({ firstValue, secondValue }) {
  return (
    <div className="p-5 border border-black rounded bg-gray-200 w-300 h-75">
      <p className="font-sans text-2xl font-bold">
        {secondValue === "" ? firstValue : secondValue}
      </p>
    </div>
  )
}