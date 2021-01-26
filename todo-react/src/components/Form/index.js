import React from 'react'

const TaskForm = ({ title, titleChange, handleSubmit }) => {
    return (
        <form method="POST" id="form" onSubmit={handleSubmit}>
            <div className="flex-wrapper">

                <div style={{ flex: 6 }}>
                    <input 
                        name="title" 
                        type="text" 
                        className="form-control" 
                        id="title" 
                        placeholder="Adicione uma tarefa" 
                        onChange={titleChange} 
                        value={title} 
                    />
                </div>

                <div style={{ flex: 1 }}>
                    <input
                        name="submit" 
                        type="submit" 
                        id="submit" 
                        className="btn btn-warning" 
                    />
                </div>

            </div>
        </form>
    )
}

export default TaskForm
