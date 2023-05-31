// import { TextField, Paper, Checkbox, Button } from "@mui/material";
// import { useEffect, useRef, useState } from "react";
// import { addTask, getTasks, updateTask, deleteTask } from "./services/taskServices";

// function Task({task}) {
    
//     return (
//         <Paper
//                 key={task._id}
//                 className='flex task_container'
//             >
//                 <Checkbox
//                     checked={task.completed}
//                     onClick={() => handleUpdate(task._id)}
//                     color="primary"
//                 />
//                 <div
//                     className={
//                         task.completed ? "task line_through" : "task"
//                     }
//                 >
//                     {task.task}
//                 </div>
//                 <Button
//                     onClick={() => handleDelete(task._id)}
//                     color='secondaty'
//                 >
//                     delete
//                 </Button>
//             </Paper>
//     )
// }

// export default Task