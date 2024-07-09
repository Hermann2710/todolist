"use client"
import { useState } from "react";

interface Tache{
  id: number;
  text: string;
}

const Home = () => {
  const [task, setTask] = useState<string>("");
  const [tasks, setTasks] = useState<Tache[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
  };

  const addTask = () => {
    if (task.trim() === "") {
      return;
    }
    setTasks(prev => {
      return [...prev, { id: prev.length + 1, text: task }];
    });
    setTask("");
  };

  const deleteTask = (id: number) => {
    setTasks(prev => prev.filter(t => t.id!== id));
  }

  return (
    <div>
      <h1>A todo-list</h1>
      <div>
        <label htmlFor="task">Add task</label>
        <input
          type="text"
          id="task"
          placeholder="Add task"
          value={task}
          onChange={handleChange}
        />
        {task && <button onClick={addTask}>Add</button>}
        <h3>Tasks List</h3>
        <ul>
          {tasks.map(item =>  (
            <li key={item.id}>{item.text}
            <button onClick={() => deleteTask(item.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
