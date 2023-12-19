import React, { useState, useEffect, useRef } from 'react'
import AddTask from './AddTasl'
import OptionsDropdown from './OptionsDropdown'
import { v4 as uuidv4 } from 'uuid';

export default function TaskList() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      return JSON.parse(savedTasks);
    } else {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const [editingTaskId, setEditingTaskId] = useState(null);

  const addTask = (task) => {
    const taskWithId = { ...task, id: uuidv4() };
    setTasks([...tasks, taskWithId]);
  };
  const updateTask = (index, updatedTask) => {
    const newTasks = [...tasks];
    newTasks[index] = updatedTask;
    setTasks(newTasks);
  };

  const deleteTask = (taskToDelete) => {
    setTasks(tasks.filter(task => task !== taskToDelete));
  };

  const deleteFinishedTasks = () => {
    setTasks(tasks.filter(task => !task.isCompleted));
  };
  const deleteAllTasks = () => {
    setTasks([]);
  };

  return (
    <div>
      <div className="tasks">
          <div className="task-header">
            <p>Todo List</p>
            <OptionsDropdown deleteAllTasks={deleteAllTasks} deleteFinishedTasks={deleteFinishedTasks}/>
          </div>
          
      {tasks.map((task, index) => (
        
          <Task
          key={index}
          task={task}
          onUpdateTask={(updatedTask) => updateTask(index, updatedTask)}
          deleteTask={deleteTask}
          isEditing={task.id === editingTaskId}
          setIsEditing={setEditingTaskId}
        />
      ))}       
      <AddTask onAddTask={addTask} />
       </div>
    </div>
  )
}

const Task = ({ task, onUpdateTask, deleteTask, isEditing, setIsEditing }) => {
  const [editedText, setEditedText] = useState(task.text);

  const handleSave = () => {
    if (editedText.length > 0 && editedText.length <= 65) {
      onUpdateTask({ ...task, text: editedText });
      setIsEditing(false);
    } else if (editedText.length > 65) {
      alert('Character limit exceeded');
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedText(task.text);
  }

  const handleDelete = () => {
    deleteTask(task);
  }

  const textareaRef = useRef(null);

  useEffect(() => {
    if (isEditing) {
      const textarea = textareaRef.current;
      textarea.focus();
      textarea.setSelectionRange(textarea.value.length, textarea.value.length);
    }
  }, [isEditing]);
  console.log(isEditing)

  return (
    <div className={`task ${task.isCompleted ? 'completed' : ''}`}>
      <input className='task-checkbox' type="checkbox" checked={task.isCompleted} onChange={() => onUpdateTask({ ...task, isCompleted: !task.isCompleted })} />
      {!isEditing && (<p>{task.text}</p>)}
      {isEditing && (
        <div className='addt-page'>
          <textarea ref={textareaRef} type="text" value={editedText} onChange={(e) => setEditedText(e.target.value)} />
          <div className='addt-buttons'>
            <div className="cancel-button delete" onClick={handleDelete}>Delete</div>
            <div className="cancel-button" onClick={handleCancel}>Cancel</div>
            <div className="save-button" onClick={handleSave}>Save</div>
          </div>
        </div>
      )}
      <div onClick={() => setIsEditing(task.id)} className="task-edit-button">⋮</div>
    </div>
  );
};