import getToken from '../helpers/crsf'

const baseUrl = 'http://127.0.0.1:8000/api/'

export const getTasks = async () => {
    const url = baseUrl + 'list-tasks/'
    const res = await fetch(url)
    return res.json()
}

export const apiPost = async data => {
    const method = 'POST'
    const headers = {
        'Content-type': 'application/json',
        'X-CSRFToken': getToken('csrftoken')
    }
    const body = JSON.stringify(data)
    return await fetch(baseUrl + 'create-task/', { method, headers, body })
}

export const apiPut = async (id, data) => {
    const url = `update-task/${id}`
    const method = 'PUT'
    const headers = {
        'Content-type': 'application/json',
        'X-CSRFToken': getToken('csrftoken')
    }
    const body = JSON.stringify(data)
    return await fetch(baseUrl + url, { method, headers, body })
}

export const apiDelete = async id => {
    const method = 'DELETE'
    const headers = {
        'X-CSRFToken': getToken('csrftoken')
    }
    return await fetch(baseUrl + `delete-task/${id}`, { method, headers })
}