import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { colors } from './App.js';
import $ from 'jquery';

export default function SelectColor({ closeColor, mode, setPColor, setSBColor, setLBColor }) {
  function changeColors(colorArray, mode) {
    $("html").css("--primary-color", colorArray[1]);
    $("html").css("--secondary-color", colorArray[2]);
    $("html").css("--tertiary-color", colorArray[3]);
    $("html").css("--quaternary-color", colorArray[4]);
    $("html").css("--darker-color", colorArray[5]);
    $("html").css("--darker-color-hover", colorArray[6]);
    $("html").css("--add-task-border", colorArray[7]);
    $("html").css("--add-task-text", colorArray[8]);
    $("html").css("--add-task-text-hover", colorArray[9]);
    
    switch(mode) {
      case 'Pomodoro':
        setPColor(colorArray);
        break;
      case 'Short Break':
        setSBColor(colorArray);
        break;
      case 'Long Break':
        setLBColor(colorArray);
        break;
      default:
        break;
    }
    localStorage.setItem(`colorPreference-${mode}`, JSON.stringify(colorArray));
    closeColor();
  }
  return (
    <div>
      <div className="color-modal">
        <div className='color-page'>
            <div className="color-header">
            <p className='color-header-text'>Pick a color for {mode}</p>
            <div onClick={() => closeColor()}><FontAwesomeIcon icon={faXmark} className='Xmark'/></div>
            </div>
            <div className="colors-container">
                <div onClick={()=>changeColors(colors[0], mode)} className="color-option Red"></div>
                <div onClick={()=>changeColors(colors[1], mode)} className="color-option DarkBlue"></div>
                <div onClick={()=>changeColors(colors[2], mode)} className="color-option LightBlue"></div>
                <div onClick={()=>changeColors(colors[3], mode)} className="color-option Purple"></div>
                <div onClick={()=>changeColors(colors[4], mode)} className="color-option Green"></div>
                <div onClick={()=>changeColors(colors[5], mode)} className="color-option Pink"></div>
                <div onClick={()=>changeColors(colors[6], mode)} className="color-option Grey"></div>
                <div onClick={()=>changeColors(colors[7], mode)} className="color-option Brown1"></div>
                <div onClick={()=>changeColors(colors[8], mode)} className="color-option Brown2"></div>
            </div>

        </div>
      </div>
    </div>
  )
}

export const possible = ['sama', 'why?'];
