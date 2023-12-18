import React, { useState } from 'react';
import './index.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const AlarmSoundDropdown = ({ deleteFinishedTasks, deleteAllTasks }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggling = () => setIsOpen(!isOpen);
  function clearAll() {
    setIsOpen(false)
    deleteAllTasks();
  }
  function clearFinished() {
    deleteFinishedTasks()
    setIsOpen(false)
  }

  return (
    <div className="options-dropdown">
      <div onClick={toggling} className="options">⋮</div>
      {isOpen && (
        <div className="options-dropdown-list-container">
          <ul className="options-dropdown-list">

              <li onClick={clearFinished} className="option" key={Math.random()}>
              <FontAwesomeIcon  className='icon' icon={faTrash} /> Clear finished tasks
              </li>
              <li  onClick={clearAll} className="option" key={Math.random()}>
              <FontAwesomeIcon className='icon' icon={faTrash} /> Clear all tasks
              </li>

          </ul>
        </div>
      )} </div>)};


export default AlarmSoundDropdown;