import { useState } from 'react'

// Custom Components
import CustomForm from './components/CustomForm'
import TaskList from './components/TaskList'
import EditForm from './components/EditForm'

function App() {
  const [tasks, setTasks] = useState([])
  const [editedTask, setEditedTask] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [previousFocusEl, setPreviousFocusEl] = useState(false)

  const addTask = (task) =>{
    setTasks(preState => [...preState, task])
  }

  const deleteTask = (id) =>{
    setTasks(preState => preState.filter(t => t.id != id))
  }

  const toggleTask = (id) =>{
    setTasks(preState => preState.map(t => (t.id == id?{...t, checked: !t.checked}:t)))
  }

  const updateTask = (task) =>{
    setTasks(preState => preState.map(t => (t.id == task.id?{...t, name: task.name}:t)))
    closeEditMode()
  }

  const closeEditMode = () =>{
    setIsEditing(false)
    previousFocusEl.focus()
  }

  const enterEditMode = (task) =>{
    setEditedTask(task)
    setIsEditing(true)
    setPreviousFocusEl(document.activeElement)
  } 

  return (
    <div className="container">
      <header>
        <h1>My Task List</h1>
      </header>
      {
        isEditing && (
          <EditForm editedTask={editedTask} updateTask={updateTask} closeEditMode={closeEditMode}/>
        )
      }
      <CustomForm addTask={addTask}/>
      {tasks && (
        <TaskList 
          tasks={tasks} 
          deleteTask={deleteTask} 
          toggleTask={toggleTask} 
          enterEditMode={enterEditMode}
        />)}
    </div>
  )
}

export default App
