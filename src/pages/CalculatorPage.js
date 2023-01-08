import React, { useState } from "react";
import './index.css';
import keysData from '../data/data-keys.json';
import { OutputField, CalculatorPad } from "../atoms";

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
        case ",":
          return addCharacterValue(".")
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
      if (firstValue !== "0" && firstValue) {
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
        <OutputField 
          firstValue={firstValue}
          secondValue={secondValue}
        />
        <div className="w-300 flex flex-row flex-wrap mt-3">
          {
            keysData.map((data) => {
              return (
                <CalculatorPad
                  data={data}
                  onClick={() => clickNumPad(data)}
                />
              )
            })
          }
        </div>
      </div>
    </div>
  )
}