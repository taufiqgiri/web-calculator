import React, { useState } from "react";
import './index.css';
import keysData from '../data/data-keys.json';

export default function CalculatorPage() {
  const [firstValue, setFirstValue] = useState("")
  const [secondValue, setSecondValue] = useState("")
  const [operatorSelected, setOperatorSelected] = useState("")

  function clickNumPad(dataKey) {
    if (dataKey.type === "number") {
      addCharacterValue(dataKey.symbol)
    } else if (dataKey.type === "reset") {
      resetCalculator()
    } else {
      switch (dataKey.symbol) {
        case "backspace":
          return deleteCharacterValue()
        case "+/-":
          return addPlusMinusSymbol()
        case "%":
          return addPercent()
        case "=":
          return getResult()
        default:
          return addOperator(dataKey.symbol)
      }
    }
  }

  function addCharacterValue(character) {
    if (secondValue || (firstValue && operatorSelected)) {
      if (secondValue !== "0") {
        setSecondValue(secondValue + character)
      } else {
        setSecondValue(character)
      }
    } else {
      if (firstValue !== "0") {
        setFirstValue(firstValue + character)
      } else {
        setFirstValue(character)
      }
    }
  }

  function deleteCharacterValue() {
    if (secondValue) {
      if (secondValue.length > 1) {
        setSecondValue(secondValue.slice(0, secondValue.length - 1))
      } else {
        setSecondValue("0")
      }
    } else {
      if (firstValue.length > 1) {
        setFirstValue(firstValue.slice(0, firstValue.length - 1))
      } else {
        setFirstValue("0")
      }
    }
  }

  function resetCalculator() {
    setFirstValue("")
    setSecondValue("")
  }

  function addPlusMinusSymbol() {
    if (secondValue && secondValue !== "0") {
      if (secondValue[0] === "-") {
        setSecondValue(secondValue.slice(1, secondValue.length))
      } else {
        setSecondValue("-" + secondValue)
      }
    } else if (firstValue && firstValue !== "0") {
      if (firstValue[0] === "-") {
        setFirstValue(firstValue.slice(1, firstValue.length))
      } else {
        setFirstValue("-" + firstValue)
      }
    }
  }

  function addPercent() {
    if (secondValue && secondValue !== "0") {
      setSecondValue(String(Number(secondValue) / 100))
    } else {
      setFirstValue(String(Number(firstValue) / 100))
    }
  }

  function addOperator(symbol) {
    setOperatorSelected(symbol)
  }

  function getResult() {
    let result = ""
    if (firstValue && secondValue && operatorSelected) {
      switch (operatorSelected) {
        case "x":
          result = String(Number(firstValue) * Number(secondValue))
          setFirstValue(result)
          setSecondValue("")
          setOperatorSelected("")
          break
        case "/":
          result = String(Number(firstValue) / Number(secondValue))
          setFirstValue(result)
          setSecondValue("")
          setOperatorSelected("")
          break
        case "+":
          result = String(Number(firstValue) + Number(secondValue))
          setFirstValue(result)
          setSecondValue("")
          setOperatorSelected("")
          break
        case "-":
          result = String(Number(firstValue) - Number(secondValue))
          setFirstValue(result)
          setSecondValue("")
          setOperatorSelected("")
          break
        default:
          break
      }
    }
  }

  return (
    <div className="pt-5 flex flex-col justify-center items-center">
      <div className="p-5 border border-black mt-5 flex flex-col justify-center items-center rounded">
        <div className="w-300 flex flex-row justify-start items-start">
          <p className="font-sans text-2xl font-bold">
            Web Calculator
          </p>
        </div>
        <div className="p-5 border border-black rounded bg-gray-200 w-300 h-75">
          <p className="font-sans text-2xl font-bold">
            {secondValue === "" ? firstValue : secondValue}
          </p>
        </div>
        <div className="w-300 flex flex-row flex-wrap mt-3">
          {
            keysData.map((data) => {
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
                  onClick={() => clickNumPad(data)}
                >
                  {data.symbol === "backspace" ? (
                    <svg 
                      class="h-12 w-12 text-white" 
                      width="24" 
                      height="24" 
                      viewBox="0 0 24 24" 
                      stroke-width="2" 
                      stroke="currentColor" 
                      fill="none" 
                      stroke-linecap="round" 
                      stroke-linejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z"/>
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <line x1="5" y1="12" x2="9" y2="16" />
                      <line x1="5" y1="12" x2="9" y2="8" />
                    </svg>
                  ) : data.symbol}
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}