import React from "react";
import './index.css';
import keysData from '../data/data-keys.json'

export default function CalculatorPage() {
  return (
    <div className="pt-5 flex flex-col justify-center items-center">
      <div className="p-5 border border-black mt-5 flex flex-col justify-center items-center rounded">
        <div className="w-300 flex flex-row justify-start items-start">
          <p className="font-sans text-2xl font-bold">
            Web Calculator
          </p>
        </div>
        <div className="p-5 border border-black rounded bg-gray-200 w-300 h-75">
          
        </div>
        <div className="w-300 flex flex-row flex-wrap mt-3">
          {
            keysData.map((data) => {
              return (
                <div 
                  className={
                    `${data.box === 'single' ? 's-75' : 's-150'} 
                    flex justify-center items-center border
                    ${data.backgroundColor === 'black' ? 'bg-gray-700' : data.backgroundColor === 'gray' ? 'bg-gray-400' : 'bg-yellow-500'}
                    text-white text-2xl key-pad`
                  }
                >
                  {data.symbol}
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}