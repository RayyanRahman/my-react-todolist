import React, { useState } from "react";

function TodoItem({ task }) {

    // this State is to keep track of the icon for editing the task
    const [editClass, setEditClass] = useState("fa-solid fa-pen-to-square");

    // this State is to keep track of whether the task is completed or not
    const [isCompleted, setIsCompleted] = useState(task.completed);

    // thid Style is for object of the text of the task
    const textStyle = {
        textDecoration: isCompleted ? "line-through 2px hsl(199deg 31% 14%)" : "none",
    };

    // this Function is to handle editing the task
    const editTask = (e) => {
        // Get the task element
        let taskInDOM = e.target.parentElement.parentElement.children[0];
        
        if (editClass === "fa-solid fa-pen-to-square") {
            // If the edit icon is clicked, replace the task with an input field so it can be edited
            let textToBeEdited = taskInDOM.children[1].innerText;
            const node = document.createElement("input");
            node.setAttribute("type", "text");
            node.setAttribute("value", textToBeEdited);
            taskInDOM.appendChild(node);
            taskInDOM.children[1].remove();
            setEditClass("fa-solid fa-check");
        } else {
            // If the check icon is clicked, replace the input field with the edited task
            let newTaskAfterEdit = taskInDOM.children[1].value;
            const node = document.createElement("div");
            node.setAttribute("style", textStyle);
            node.innerText = newTaskAfterEdit;
            taskInDOM.appendChild(node);
            taskInDOM.children[1].remove();
            setEditClass("fa-solid fa-pen-to-square");
        }
    };

    // Function to handle deleting the task
    const deleteTask = (e) => {
        // Get the task element and remove its parent element (the entire task item)
        let taskInDOM = e.target.parentElement.parentElement.children[0];
        taskInDOM.parentElement.remove();
    };

    // Function to handle completing the task
    const completeTask = (e) => {
        // If the task is already completed, uncomplete it; otherwise, complete it
        if (isCompleted === true) {
            setIsCompleted(false);
        } else {
            setIsCompleted(true);
        }
    };

    // Style object for the completed icon
    const completedStyle = {
        color: isCompleted ? "green" : "#2c2c2c",
    };

//     // Render the task item
//     return (
//         <div className="todo-item">
//             <div className="icon-tasks">
//                 {/* Icon for completing the task */}
//                 <i className="fa-solid fa-circle-check" onClick={completeTask} style={completedStyle}></i>
//                 {/* Text of the task */}
//                 <div className="task-name" style={textStyle}>{task.title}</div>
//             </div>
//             <div className="icons">
//                 {/* Icon for editing the task */}
//                 {isCompleted ? <i className={editClass} onClick={() => alert("Completed Task can't be edited")}></i> : <i className={editClass} onClick={editTask}></i>}
//                 {/* Icon for deleting the task */}
//                 <i style={{ color: "red" }} className="fa-solid fa-trash-can" onClick={deleteTask}></i>
//             </div>
//         </div>
//     );
// }
 // Render the task item
 return (
    <div className="todo-item">
        <div className="icon-tasks">
            {/* Icon for completing the task */}
            <i className="fa-solid fa-circle-check" onClick={completeTask} style={completedStyle}></i>
            {/* Text of the task */}
            <div className="task-name" style={textStyle}>{task.title}</div>
        </div>
        <div className="icons">
            {/* Icon for editing the task */}
            {isCompleted ? <i className={editClass} onClick={() => alert("Completed Task can't be edited")}></i> : <i className={editClass} onClick={editTask}></i>}
            {/* Icon for deleting the task */}
            <i style={{ color: "red" }} className="fa-solid fa-trash-can" onClick={deleteTask}></i>
        </div>
    </div>
);
}

export default TodoItem;
