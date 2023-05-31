import { useEffect, useRef, useState } from "react";
import { addTask, getTasks, updateTask, deleteTask } from "./services/taskServices";
import { TextField, Paper, Checkbox, Button } from "@mui/material";
import Task from "./task";

function Tasks() {
    const [tasks, setTasks] = useState([])
    const [currentTask, setCurrentTask] = useState("")
    const newTaskRef = useRef("")

    const taskList = tasks.map((task, index) => {
        return (
            <Paper
                key={task._id}
                className='flex task_container'
            >
                <Checkbox
                    checked={task.completed}
                    onClick={() => handleUpdate(task._id)}
                    color="primary"
                />
                <div
                    className={
                        task.completed ? "task line_through" : "task"
                    }
                >
                    {task.task}
                </div>
                <Button
                    onClick={() => handleDelete(task._id)}
                    color='secondary'
                >
                    delete
                </Button>
            </Paper>
        )
    })

    async function fetchTasks() {
        const { data } = await getTasks()
        if (Object.keys(data).length) {
            setTasks([...data])
        }

    }

    useEffect(() => {
        try {
            fetchTasks()
        } catch (error) {
            console.log(error)
        }
    }, [])

    const handleChange = (e) => {
        setCurrentTask(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        // const originalTasks = tasks
        try {
            const data = await addTask(currentTask)
            setTasks(tasks => [...tasks, currentTask])
            // setCurrentTask("")
            fetchTasks()
        } catch (error) {
            console.log(error)
        }
    }

    const handleUpdate = async (currentTask) => {
        try {
            const index = tasks.findIndex((task) => task._id === currentTask)
            tasks[index] = { ...tasks[index] }
            tasks[index].completed = !tasks[index].completed
            setTasks(tasks)
            const res = await updateTask(currentTask, {
                completed: tasks[index].completed
            })
            fetchTasks()
        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = async (currentTask) => {
        const originalTasks = tasks
        try {
            const tasks = originalTasks.filter(
                (task) => task._id !== currentTask
            )
            setTasks(tasks)
            await deleteTask(currentTask)
            fetchTasks()
        } catch (error) {
            setTasks(originalTasks)
            fetchTasks()
            console.log(error)
        }
    }

    return (
        <Paper elevation={3} className='container'>
            <div className='heading'>TO-DO</div>
            <form className='flex'>
                <TextField
                    variant='outlined'
                    size='small'
                    className='current_task'
                    ref={newTaskRef}
                    required={true}
                    onBlur={handleChange}
                    placeholder='Add New TO-DO'
                />
                <Button
                    className='add_task'
                    color='primary'
                    variant='outlined'
                    type='submit'
                    onClick={handleSubmit}
                >
                    Add task
                </Button>
            </form>
            <div>
                {taskList}
            </div>
        </Paper>
    )
}

export default Tasks