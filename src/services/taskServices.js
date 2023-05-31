import axios from "axios"
const apiUrl = "http://localhost:8080/api/tasks"

export async function getTasks() {
    return await axios.get(apiUrl);
}

export async function addTask(task) {
    const res = await axios.post(apiUrl, {task})
    return res
}

export async function updateTask(id, task) {
    return await axios.put(apiUrl + "/" + id, {task})
}

export async function deleteTask(id) {
    return await axios.delete(apiUrl + "/" + id)
}

