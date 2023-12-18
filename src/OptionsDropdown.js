import React, { useState, useEffect, useRef } from 'react';
import './index.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const AlarmSoundDropdown = ({ deleteFinishedTasks, deleteAllTasks }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  const toggling = () => setIsOpen(!isOpen);
  function clearAll() {
    setIsOpen(false)
    deleteAllTasks();
  }
  function clearFinished() {
    deleteFinishedTasks()
    setIsOpen(false)
  }

  useEffect(() => {
    const onBodyClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.body.addEventListener("click", onBodyClick);

    return () => {
      document.body.removeEventListener("click", onBodyClick);
    };
  }, []);

  return (
    <div ref={ref} className="options-dropdown">
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
      )}
    </div>
  );
};

export default AlarmSoundDropdown;