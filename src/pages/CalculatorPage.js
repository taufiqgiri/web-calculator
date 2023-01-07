import React from "react";
import './index.css';

export default function CalculatorPage() {
  return (
    <div className="pt-5 flex flex-col justify-center items-center">
      <div className="p-5 border border-black mt-5 flex flex-col justify-center items-center rounded">
        <div className="w-200 flex flex-row justify-start items-start">
          <p className="font-sans text-2xl font-bold">
            Web Calculator
          </p>
        </div>
        <div className="p-5 border border-black rounded bg-gray-200 w-200 h-50">
          
        </div>
        <div className="w-200 flex flex-row flex-wrap mt-3">
          {
            ["1", "2", "3", "4", "5", "6"].map((data) => {
              return (
                <div className="s-100 flex justify-center items-center border">
                  {data}
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}