import React from "react";

export default function CalculatorPad({ data, onClick }) {
  return (
    <div 
      className={
        `${data.box === 'single' ? 's-75' : 's-150'} 
        flex justify-center items-center border
        ${
          data.backgroundColor === 'black' ? 
          'bg-gray-700' : data.backgroundColor === 'gray' ? 
          'bg-gray-400' : 'bg-yellow-500'
        }
        text-white text-2xl key-pad 
        ${data.symbol !== "backspace" && "font-bold"}`
      }
      onClick={onClick}
    >
      {data.symbol === "backspace" ? (
        <svg 
          className="h-12 w-12 text-white" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          strokeWidth="2" 
          stroke="currentColor" 
          fill="none" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z"/>
          <line x1="5" y1="12" x2="19" y2="12" />
          <line x1="5" y1="12" x2="9" y2="16" />
          <line x1="5" y1="12" x2="9" y2="8" />
        </svg>
      ) : data.symbol}
    </div>
  )
}