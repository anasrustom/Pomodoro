import React, { useState, useEffect, useRef } from 'react';
import './index.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

const AlarmSoundDropdown = ({options, rangeValueAL, setRangeValueAL}) => {
  const [isOpen, setIsOpen] = useState(false);

  const [selectedOption, setSelectedOption] = useState(() => {
    const savedOption = localStorage.getItem(`selectedOption_1`);
    return savedOption ? JSON.parse(savedOption) : options[0];
  });
  
  useEffect(() => {
    localStorage.setItem(`selectedOption_1`, JSON.stringify(selectedOption));
  }, [selectedOption]);


  const toggling = () => setIsOpen(!isOpen);

  const audioRef = useRef(null);
  const onOptionClicked = value => () => {
    setSelectedOption(value);
    setIsOpen(false);
  
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  
    audioRef.current = new Audio(`/audios/${value}.mp3`);
    audioRef.current.volume = rangeValueAL / 100;
    audioRef.current.play();

    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }, 8000);
  };

  const handleRangeChange = (event) => {
    setRangeValueAL(event.target.value); 
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
        <div className="range-value">{rangeValueAL}</div>
        <input
          type="range"
          min="0"
          max="100"
          value={rangeValueAL}
          className="range-input"
          onInput={handleRangeChange}
        />
      </div>
    </div>
  );
};

export default AlarmSoundDropdown;