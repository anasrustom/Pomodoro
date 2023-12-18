import React, { useState, useEffect, useRef } from 'react';
import './index.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { getAudioPath } from './App';

const AlarmSoundDropdown = ({options, rangeValue, setRangeValue, setIsChecked}) => {
  const [isOpen, setIsOpen] = useState(false);

  const [selectedOption, setSelectedOption] = useState(() => {
    const savedOption = localStorage.getItem(`selectedOption_2`);
    return savedOption ? JSON.parse(savedOption) : options[0];
  });
  
  useEffect(() => {
    localStorage.setItem(`selectedOption_2`, JSON.stringify(selectedOption));
  }, [selectedOption]);


  const toggling = () => setIsOpen(!isOpen);

  const audioRef = useRef(null);
  const onOptionClicked = value => () => {
    setSelectedOption(value);
    setIsOpen(false);
    setIsChecked(false)
  
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  
    const audioPath = getAudioPath(`${value}.mp3`);
    audioRef.current = new Audio(audioPath);
    audioRef.current.volume = rangeValue / 100;
    audioRef.current.play();
  
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }, 8000);
  };

  const handleRangeChange = (event) => {
    setRangeValue(event.target.value); 
    if (audioRef.current) {
      audioRef.current.volume = event.target.value / 100;
    }}

    useEffect(() => {
      // Pause the audio when the settings page unmounts
      return () => {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }
      };
    }, []);


  return (
    <div className="alarm-dropdown">
      <div className="alarm-dropdown-header" onClick={toggling}>
        {selectedOption } <FontAwesomeIcon icon={faCaretDown} />
      </div>
      {isOpen && (
        <div className="alarm-dropdown-list-container">
          <ul className="alarm-dropdown-list" title="Click on it to hear it!">
            {options.map(option => (
              <li className="option" onClick={onOptionClicked(option)} key={Math.random()}>
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="range-container">
        <div className="range-value">{rangeValue}</div>
        <input
          type="range"
          min="0"
          max="100"
          value={rangeValue}
          className="range-input"
          onInput={handleRangeChange}
        />
      </div>
    </div>
  );
};

export default AlarmSoundDropdown;

