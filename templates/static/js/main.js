import { buildTaskItem, buildEditForm } from './domManipulators.js'
import { getToken, getJsonHeaders } from './helpers.js'

const baseUrl = 'http://127.0.0.1:8000/api/'
const listWrapper = document.getElementById('list-wrapper')
const cachedTasks = []
load()

function load() {
	const listUrl = baseUrl + 'list-tasks/'
	fetch(listUrl)
		.then(res => res.json())
		.then(data => {
			data.forEach(task => cachedTasks.push(task))
			data.forEach(build)
		})
}

const build = task => {
	const taskItem = buildTaskItem(task)
	listWrapper.append(taskItem)

	// Adding event listeners

	const editButtons = taskItem.querySelectorAll('.edit')
	editButtons.forEach(btn => {
		btn.addEventListener('click', () => {
			handleEdit(task.id)
		})
	})

	const deleteButtons = taskItem.querySelectorAll('.delete')
	deleteButtons.forEach(btn => {
		btn.addEventListener('click', () => {
			const confirm = window.confirm('Tem certeza que deseja deletar esse item?')
			if (confirm) deleteItem(task.id)
		})
	})

	const titles = taskItem.querySelectorAll('.title')
	titles.forEach(title => {
		title.addEventListener('click', () => toogleComplete(task))
	})
}

const refreshTasks = tasks => {
	listWrapper.innerHTML = ''
	cachedTasks.forEach(build)
}

const form = document.getElementById('form')

const handleCreateTask = async event => {
	const url = baseUrl + 'create-task/'
	event.preventDefault()

	const method = 'POST'
	const formData = new FormData(event.target)
	const data = Object.fromEntries(formData)
	const body = JSON.stringify(data)

	await fetch(url, { method, headers: getJsonHeaders(), body })

	cachedTasks.push(data)

	refreshTasks()
	form.reset()

}
form.addEventListener('submit', handleCreateTask)

const deleteItem = async id => {
	const deleteUrl = baseUrl + `delete-task/${id}`
	const method = 'DELETE'
	await fetch(deleteUrl, {
		method,
		headers: {
			'X-CSRFToken': getToken('csrftoken')
		}
	})
	cachedTasks.filter(task => task.id !== id)
	refreshTasks()
}

const handleEdit = id => {
	const element = document.getElementById(`data-row-${id}`)
	const taskTitle = element.querySelector('.title').innerHTML

	const editForm = buildEditForm(taskTitle, id)
	const input = editForm.querySelector('input')
	const cancelBtn = editForm.querySelector('button.cancel')

	const editItem = async data => {
		const url = baseUrl + `update-task/${id}`
		const body = JSON.stringify(data)
		await fetch(url, { method: 'PUT', headers: getJsonHeaders(), body })
		cachedTasks.forEach(task => {
			if (task.id == id) task.title = data.title
		})
		refreshTasks()
	}

	const handleSubmit = async e => {
		e.preventDefault()
		const data = Object.fromEntries(new FormData(e.target))
		editItem(data)
	}

	const handleInputBlur = e => {
		const form = e.target.parentElement
		const data = Object.fromEntries(new FormData(form))
		editItem(data)
	}

	const handleCancel = () => {
		editItem({ title: taskTitle, id })
	}

	editForm.onsubmit = handleSubmit

	input.onblur = handleInputBlur

	cancelBtn.onclick = handleCancel

	element.parentElement.replaceChild(editForm, element)
	input.focus()
}

const toogleComplete = async task => {
	task.completed = !task.completed
	const body = JSON.stringify(task)
	const updateUrl = baseUrl + `update-task/${task.id}`
	const method = 'PUT'
	await fetch(updateUrl, {
		method,
		headers: getJsonHeaders(),
		body
	})
	cachedTasks.map(item => {
		return item.id === task.id ? { ...item, completed: !item.completed } : item
	})
	refreshTasks()
}
