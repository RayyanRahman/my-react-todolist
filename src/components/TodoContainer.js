import React, { useState, useEffect } from "react"; // Importing necessary components from React
import TodoItem from "./TodoItem"; // Importing TodoItem component
import { Bars } from "react-loader-spinner"; // Importing Bars component from react-loader-spinner library

function TodoContainer({ addedTask }) { // Creating TodoContainer component with addedTask as a prop
	const [todos, setTodos] = useState([]); // Initializing todos as an empty array and creating state with setTodos function
	const [loading, setLoading] = useState(false); // Initializing loading state as false and creating state with setLoading function
	const [newTask, setNewTask] = useState(addedTask); // Initializing newTask state with addedTask prop and creating state with setNewTask function

	useEffect(() => { // Using useEffect hook to fetch data from an API endpoint when the component mounts
		fetch("https://jsonplaceholder.typicode.com/todos")
			.then((response) => response.json())
			.then((json) => {
				setTimeout(() => { // Adding a delay of 1 second to simulate loading time
					setTodos(json); // Updating todos state with the fetched data
					setLoading(true); // Updating loading state to true
				}, 1000);

			});
	}, []); // Passing an empty dependency array to run useEffect only once when the component mounts

	useEffect(() => { // Using useEffect hook to update newTask state whenever addedTask prop changes
		let taskAddedByUser = addedTask.map((task, index) => { // Mapping through the addedTask prop to create TodoItem components
			return <TodoItem task={task} key={index} />;
		});
		setNewTask(taskAddedByUser) // Updating newTask state with the created TodoItem components
	},  [newTask]) // Adding newTask state as a dependency to run the effect whenever it changes

	return (
		<div className="todo-container">
			{newTask} 
			{loading ? ( // we are doing Conditional rendering based on the loading state
				todos.map((task, index) => { // here we are Mapping through todos array to create TodoItem components
					return <TodoItem task={task} key={index} />;
				})
			) : (
				<Bars height="80" width="80" color="#4fa94d" ariaLabel="bars-loading" visible={true} /> // Displaying a loading spinner when the data is being fetched
			)}
		</div>
	);
}

export default TodoContainer; // here we are Exporting TodoContainer component for use in other modules
