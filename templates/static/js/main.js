import { buildTaskItem } from './domManipulators.js'
import { getToken, getJsonHeaders } from './helpers.js'

const baseUrl = 'http://127.0.0.1:8000/api/'
let editing = null

const buildList = () => {
	const listWrapper = document.getElementById('list-wrapper')

	const listUrl = baseUrl + 'list-tasks/'
	fetch(listUrl)
		.then(res => res.json())
		.then(data => {
			listWrapper.innerHTML = ''
			data.forEach(task => {
				const taskItem = buildTaskItem(task)
				listWrapper.append(taskItem)

				// Adding event listeners

				const editButtons = taskItem.querySelectorAll('.edit')
				editButtons.forEach(btn => {
					btn.addEventListener('click', () => {
						editing = task.id
						const inputElement = document.getElementById('title')
						inputElement.value = task.title
						inputElement.focus()
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

			})
		})
}
buildList()

const form = document.getElementById('form')
const createUrl = baseUrl + 'create-task/'

const handleFormSubmit = async event => {
	event.preventDefault()

	const method = editing ? 'PUT' : 'POST'
	const formData = new FormData(event.target)
	const data = Object.fromEntries(formData)
	const body = JSON.stringify(data)
	const url = editing ? baseUrl + `update-task/${editing}` : createUrl

	await fetch(url, { method, headers: getJsonHeaders(), body })

	buildList()
	form.reset()

	editing = null
}
form.addEventListener('submit', handleFormSubmit)

const deleteItem = async id => {
	const deleteUrl = baseUrl + `delete-task/${id}`
	const method = 'DELETE'
	await fetch(deleteUrl, {
		method,
		headers: {
			'X-CSRFToken': getToken('csrftoken')
		}
	})
	buildList()
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
	buildList()
}
