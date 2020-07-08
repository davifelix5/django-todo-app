import React, { useState, useRef, useEffect } from 'react'
import { apiPut, apiDelete } from '../../services/api'

import './styles.css'

const Task = ({ task, fetchTasks }) => {

    const completedClass = task.completed ? 'completed' : ''

    const inputRef = useRef(null)
    const [newItem, setNewItem] = useState({ id: null, title: '', completed: false })
    const [editing, setEditing] = useState(false)

    const handleChange = e => {
        setNewItem({ ...newItem, title: e.target.value })
    }

    const handleEdit = () => {
        setNewItem(task)
        setEditing(true)
    }

    useEffect(() => {
        if (!editing) return
        inputRef.current.focus()
    }, [editing])

    const handleSubmit = e => {
        e.preventDefault()
        apiPut(newItem.id, newItem)
            .then(() => {
                setEditing(false)
                fetchTasks()
            })
    }

    const handleDelete = id => {
        const confirm = window.confirm('Do you really want to delete that task??')
        if (!confirm) return
        apiDelete(id)
            .then(() => {
                fetchTasks()
            })
    }

    const handleComplete = task => {
        apiPut(task.id, { ...task, completed: !task.completed })
            .then(() => {
                fetchTasks()
            })
    }

    return (
        <>
            {editing ? (
                <form onSubmit={handleSubmit} method="POST" className="formEdit task-wrapper flex-wrapper">
                    <input ref={inputRef} type="text" value={newItem.title} onChange={handleChange} />
                    <div style={{ flex: 1 }}>
                        <button onClick={() => handleEdit(task)} className="btn btn-sm btn-outline-success edit">&#10003;</button>
                    </div>
                    <div style={{ flex: 1 }}>
                        <button onClick={() => setEditing(false)} className="btn btn-sm btn-outline-danger delete">x</button>
                    </div>
                </form>
            ) : (
                    <div id="data-row-1" className={`task-wrapper flex-wrapper ${completedClass}`}>

                        <div style={{ flex: 7 }}>
                            <span onClick={() => handleComplete(task)} className="title">{task.title}</span>
                        </div>

                        <div style={{ flex: 1 }}>
                            <button onClick={() => handleEdit(task)} className="btn btn-sm btn-outline-info edit">Edit</button>
                        </div>
                        <div style={{ flex: 1 }}>
                            <button onClick={() => handleDelete(task.id)} className="btn btn-sm btn-outline-danger delete">x</button>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default Task
