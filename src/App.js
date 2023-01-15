import {useReducer} from "react"
import React, { Component }  from 'react';
import './index.css'
import DigitButton from './DigitButton'
import OpreationButton from "./OperationButton"

export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose-operation',
  DELETE_DIGIT: 'delete-digit',
  EVALUATE: 'evaluate',
  CLEAR: 'clear',
}

function reducer(state,{type,payload}){
  
  switch(type){
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite && payload.digit !=="."){
        return{
          ...state,
          currentOperand: payload.digit,
          overwrite: false,
        }
      }
      //if (payload.digit === "0" && state.currentOperand === null){return state}
      if (payload.digit === "0" && state.currentOperand === "0"){return state}
      if (payload.digit !== "0" && state.prevdigit === "0"){
        return {
          ...state,
          currentOperand: `${payload.digit}`,
          prevdigit: null,
        }
      }
      
      if (payload.digit === "." && state.prevdigit == null){return {
        ...state,
        currentOperand: null,
      }}
      if (payload.digit === "." && state.currentOperand.includes(".")){return state}
      
      return{
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
        prevdigit: payload.digit,
      }
      
    case ACTIONS.CHOOSE_OPERATION:
      if(state.currentOperand == null && state.previousOperand==null)
      {return state}
      if(state.previousOperand == null)
      {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
        }
      }
      if (state.currentOperand == null) {
        return{
          ...state,
          operation: payload.operation,
        }
      }
      return {
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null,
        prevdigit: null,
      }
    
    case ACTIONS.DELETE_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: null,
          
        }
      }
      if (state.currentOperand == null){return state}
      if (state.currentOperand.length === 1){
        return {
          ...state,
          currentOperand: null,
          prevdigit: null,
        }
      }
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0,-1),
        prevdigit: null,
      }
    case ACTIONS.EVALUATE:
      if (
        state.operation == null ||
        state.currentOperand == null ||
        state.previousOperand == null
      ){
        return state
      }

      return {
        ...state,
        overwrite: true,
        previousOperand: null,
        currentOperand: evaluate(state),
        operation: null,
        prevdigit: null,
      }
    case ACTIONS.CLEAR:
      return {}
    default:
      return state
  }

}

function evaluate({currentOperand,previousOperand,operation}){
  const prev = parseFloat(previousOperand)
  const curr = parseFloat(currentOperand)
  if (isNaN(prev) || isNaN(curr)) return ""
  let computation = ""
  switch (operation){
    case "+":
      computation = prev + curr
      break
    case "*":
      computation = prev * curr
      break
    case "-":
      computation = prev - curr
      break
    case "÷":
      computation = prev / curr
      break
    default:
      break
  }
  return computation.toString()
}

function App() {
  const [{currentOperand,previousOperand,operation},dispatch]=useReducer(
    reducer,
    {}
    )
  
  return (
    <div className='calc'>
      <div className='output'>
        <div className='previous-operand'>{previousOperand} {operation}</div>
        <div className='current-operand'>{currentOperand}</div>
      </div>
      <button className='span-2' onClick={() => dispatch({type: ACTIONS.CLEAR})}>AC</button>
      <button onClick={() => dispatch({type: ACTIONS.DELETE_DIGIT})}>DEL</button>
      <OpreationButton operation="÷" dispatch={dispatch}/>
      <DigitButton digit="1" dispatch={dispatch}/>
      <DigitButton digit="2" dispatch={dispatch}/>
      <DigitButton digit="3" dispatch={dispatch}/>
      <OpreationButton operation="*" dispatch={dispatch}/>
      <DigitButton digit="4" dispatch={dispatch}/>
      <DigitButton digit="5" dispatch={dispatch}/>
      <DigitButton digit="6" dispatch={dispatch}/>
      <OpreationButton operation="+" dispatch={dispatch}/>
      <DigitButton digit="7" dispatch={dispatch}/>
      <DigitButton digit="8" dispatch={dispatch}/>
      <DigitButton digit="9" dispatch={dispatch}/>
      <OpreationButton operation="-" dispatch={dispatch}/>
      <DigitButton digit="." dispatch={dispatch}/>
      <DigitButton digit="0" dispatch={dispatch}/>
      <button className='span-2'  onClick={() => dispatch({type: ACTIONS.EVALUATE})}>=</button>
    </div>
  );
}

export default App;
