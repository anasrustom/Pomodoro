import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import $ from 'jquery';

export default function AddTasl( { onAddTask}) {
const [isOpen, setIsOpen] = useState(false);
const [taskText, setTaskText] = useState('');
const ref = useRef(null);

useEffect(() => { 
    if (isOpen) {
        $('.add-task').css('display', 'none');
    }
    else {
        $('.add-task').css('display', 'flex');
    }
    }
, [isOpen]);

const handleSave = () => {
    if (taskText.length > 0 && taskText.length <= 65) {
    onAddTask({ text: taskText, isCompleted: false });
    setTaskText('');
    setIsOpen(false);
    }
    else if (taskText.length > 65) {
        alert('Character limit exceeded');
      }
};

const handleCancel = () => {
    setTaskText('');
    setIsOpen(false);
};

const handleOpen = () => {
    setIsOpen(true);
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
    <div ref={ref}>

    {isOpen && (
    <div>
            <div className='addt-page'>
                <textarea autoFocus placeholder='What are you working on...'type="text" value={taskText} onChange={(e) => setTaskText(e.target.value)} />
                <div className="addt-buttons">
                <div className="cancel-button" onClick={handleCancel}>Cancel</div>
                <div className="save-button" onClick={handleSave}>Save</div>
            </div></div>
    </div>)}
    
    <div className="add-task" onClick={handleOpen}>
        <FontAwesomeIcon className="faCirclePlus" icon={faCirclePlus}/>Add To-do
    </div>

    </div>
);
}
  