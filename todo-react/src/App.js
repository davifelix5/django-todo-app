import React, { useState, useEffect } from 'react';
import Task from './components/Task/index'
import TaskForm from './components/Form/index'
import { getTasks, apiPost } from './services/api'

import './styles.css'

function App() {

  const [tasks, setTasks] = useState([])
  const [activeItem, setActiveItem] = useState({ id: null, title: '', completed: false })

  const fetchTasks = () => {
    getTasks()
      .then(res => {
        setTasks(res)
      })
  }

  useEffect(fetchTasks, [])

  const handleChange = e => {
    const value = e.target.value
    setActiveItem({
      ...activeItem,
      title: value
    })
  }

  const handleSubmitCreate = e => {
    e.preventDefault()
    apiPost(activeItem)
      .then(() => {
        fetchTasks()
        setActiveItem({ id: null, title: '', completed: false })
      })
  }

  return (
    <div className="container">

      <div id="task-container">
        <div id="form-wrapper">
          <TaskForm title={activeItem.title} titleChange={handleChange} handleSubmit={handleSubmitCreate} />
        </div>
        <div className="list-wrapper">
          {tasks.map(task => <Task key={task.id} task={task} tasks={tasks} setTasks={setTasks} />)}
        </div>
      </div>

    </div>
  );
}

export default App;
