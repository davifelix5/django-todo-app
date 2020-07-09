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
    deleteButton.innerHTML = '&times;'
    deleteTask.append(deleteButton)
    taskContainer.append(deleteTask)

    return taskContainer

}

export const buildEditForm = (title, taskId) => {
    const form = document.createElement('form')
    form.id = `data-row-${taskId}`
    form.classList.add('task-wrapper')
    form.classList.add('flex-wrapper')

    const input = document.createElement('input')
    input.type = 'text'
    input.name = 'title'
    input.value = title
    input.classList.add('edit-input')

    const confirmDiv = document.createElement('div')
    const confirmBtn = document.createElement('button')
    confirmDiv.style.flex = 1
    confirmBtn.classList.add('btn')
    confirmBtn.classList.add('btn-sm')
    confirmBtn.classList.add('btn-outline-success')
    confirmBtn.type = 'submit'
    confirmBtn.innerHTML = '&#10003;'
    confirmDiv.append(confirmBtn)

    const cancelDiv = document.createElement('div')
    cancelDiv.style.flex = 1
    const cancelBtn = document.createElement('button')
    cancelBtn.classList.add('btn')
    cancelBtn.classList.add('btn-sm')
    cancelBtn.classList.add('btn-outline-danger')
    cancelBtn.classList.add('cancel')
    cancelBtn.type = 'button'
    cancelBtn.innerHTML = '&times;'
    cancelDiv.append(cancelBtn)

    form.append(input)
    form.append(confirmDiv)
    form.append(cancelDiv)

    return form

}