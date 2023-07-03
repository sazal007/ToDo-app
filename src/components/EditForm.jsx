import React, { useEffect, useState } from 'react'
import { CheckIcon } from '@heroicons/react/24/solid'

const EditForm = ({editedTask, updateTask, closeEditMode}) => {
  const[updatedTask,setUpdatedTask] = useState(editedTask.name);

  useEffect(()=>{
    const closeModeIfEsc = (e) =>{
      e.key == "Escape" && closeEditMode()
    }
    window.addEventListener('keydown',closeModeIfEsc)

    return ()=>{
      window.removeEventListener('keydown',closeModeIfEsc)
    }
  },[closeEditMode])

  const handleFormSubmit = (e) =>{
    e.preventDefault();
    updateTask({...editedTask, name:updatedTask})
  }
  return (
    <div role='dialog' aria-labelledby='editTask' 
      onClick={(e)=>{e.target == e.currentTarget && closeEditMode()}}>
    <form className="todo" onSubmit={handleFormSubmit}>
      <div className="wrapper">
        <input 
          type="text" 
          id="editTask" 
          className="input" 
          value={updatedTask} 
          onInput={(e) => setUpdatedTask(e.target.value)}
          required
          autoFocus
          maxLength={70}
          placeholder='Update Task'
          />
        <label 
          htmlFor="editTask"
          className='label'
        >Update Task</label>
      </div>
      <button 
        className='btn'
        aria-label={`Confirm edited task to now read ${updatedTask}`}
        type='submit'
      ><CheckIcon strokeWidth={2} width={24} height={24}/></button>
    </form>
    </div>
  )
}

export default EditForm