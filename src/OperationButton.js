import {ACTIONS} from './App'
import React, { Component }  from 'react';

export default function OpreationButton({dispatch, operation}){
    return <button 
    onClick={() =>dispatch({type: ACTIONS.CHOOSE_OPERATION,payload: {operation}})}
    >
        {operation}
    </button>;
}