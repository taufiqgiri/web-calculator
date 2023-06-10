import React, { useState } from "react";
import './index.css';
import keysData from '../data/data-keys.json';
import { OutputField, CalculatorPad } from "../atoms";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function CalculatorPage() {
  const [firstValue, setFirstValue] = useState("")
  const [secondValue, setSecondValue] = useState("")
  const [operatorSelected, setOperatorSelected] = useState("")
  const [isResultShown, setResultShown] = useState(false)

  function clickNumPad(dataKey) {
    if (dataKey.type === "number") {
      addCharacterValue(dataKey.symbol)
    } else if (dataKey.type === "reset") {
      resetCalculator()
    } else {
      if (isResultShown) {
        setResultShown(false)
        setFirstValue("0")
      } else {
        if (firstValue.includes("e") || firstValue.length > 12) {
          toast("Sorry, cannot calculate number with more than 12 digits")
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
    }
  }

  function addCharacterValue(character) {
    if (secondValue || (firstValue && operatorSelected)) {
      if (secondValue.length === 12) {
        toast("You can only input a maximum of 12 digits")
      } else {
        if (secondValue !== "0") {
          setSecondValue(secondValue + character)
        } else {
          setSecondValue(character)
        }
      }
    } else {
      if (isResultShown) {
        setResultShown(false)
        setFirstValue(character)
      } else {
        if (firstValue.length === 12) {
          toast("You can only input a maximum of 12 digits")
        } else {
          if (firstValue !== "0" && firstValue) {
            setFirstValue(firstValue + character)
          } else {
            setFirstValue(character)
          }
        }
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
          if (result.length <= 12) {
            setFirstValue(result)
          } else {
            let divider = "1"
            for (let i = 0; i < result.length - 3; i++) {
              divider += "0"
            }
            let decimalValue = String(Math.round(Number(result) / Number(divider)) / 100)
            setFirstValue(decimalValue + "e" + (result.length - 1))
          }
          setSecondValue("")
          setOperatorSelected("")
          break
        case "/":
          result = String(Number(firstValue) / Number(secondValue))
          if (result.length <= 13 && result.includes(".")) {
            setFirstValue(result)
          } else {
            let splittedNUmbers = result.split(".")
            if (splittedNUmbers[1] > 4) {
              if (result.includes("e")) {
                let splittedDecimalNumbers = result.split("e")
                let prefixSubstring = splittedDecimalNumbers[0].substring(0, 4)
                setFirstValue(prefixSubstring + "e" + splittedDecimalNumbers[1])
              } else {
                let newNumber = String(Math.round(Number(result) * 1000000000000) / 1000000000000)
                setFirstValue(newNumber)
              }
            } else {
              setFirstValue(result)
            }
          }
          setSecondValue("")
          setOperatorSelected("")
          break
        case "+":
          result = String(Number(firstValue) + Number(secondValue))
          if (result.length <= 12) {
            setFirstValue(result)
          } else {
            let divider = "1"
            for (let i = 0; i < result.length - 3; i++) {
              divider += "0"
            }
            let decimalValue = String(Math.round(Number(result) / Number(divider)) / 100)
            setFirstValue(decimalValue + "e" + (result.length - 1))
          }
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
      setResultShown(true)
    }
  }

  return (
    <div className="pt-5 flex flex-col justify-center items-center">
      <ToastContainer 
        position="top-center"
        autoClose={1500}
        hideProgressBar={true}
        closeOnClick={true}
        pauseOnHover={false}
        theme="dark"
      />
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
            keysData.map((data, index) => {
              return (
                <CalculatorPad
                  key={index}
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