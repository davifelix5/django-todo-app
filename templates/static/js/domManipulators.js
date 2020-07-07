export const buildTaskItem = task => {
    const taskContainer = document.createElement('div')
    taskContainer.id = `data-row-${task.id}`
    taskContainer.classList = `task-wrapper flex-wrapper`

    const title = document.createElement('div')
    title.style.flex = 7
    const titleSpan = document.createElement('span')
    titleSpan.classList = 'title'
    if (task.completed) titleSpan.classList.add('completed')
    titleSpan.innerText = task.title
    title.append(titleSpan)
    taskContainer.append(title)

    const edit = document.createElement('div')
    edit.style.flex = 1
    const editButton = document.createElement('button')
    editButton.classList = 'btn btn-sm btn-outline-info edit'
    editButton.innerText = 'Edit'
    edit.append(editButton)
    taskContainer.append(edit)


    const deleteTask = document.createElement('div')
    deleteTask.style.flex = 1
    const deleteButton = document.createElement('button')
    deleteButton.classList = 'btn btn-sm btn-outline-danger delete'
    deleteButton.innerText = 'x'
    deleteTask.append(deleteButton)
    taskContainer.append(deleteTask)

    return taskContainer

}