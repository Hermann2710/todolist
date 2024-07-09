"use client";
import { useEffect, useState } from "react";

interface Tache {
  id: number;
  text: string;
  done: boolean;
}

const Home = () => {
  const [task, setTask] = useState<string>("");
  const [tasks, setTasks] = useState<Tache[]>([]);

  useEffect(() => {
    // Sort tasks
    setTasks((prev) =>
      [...prev].sort((a, b) => (a.done ? 1 : -1) - (b.done ? 1 : -1))
    );
  }, [tasks]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
  };

  const addTask = () => {
    if (task.trim() === "") {
      return;
    }
    setTasks((prev) => {
      return [...prev, { id: prev.length + 1, text: task, done: false }];
    });
    setTask("");
  };

  const markDone = (task: Tache) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === task.id ? { ...t, done: !t.done } : t))
    );
  };

  const deleteTask = (id: number) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-16">
      <div className="px-4 py-2">
        <h1 className="text-gray-800 font-bold text-2xl uppercase">
          To-Do List
        </h1>
      </div>
      <form className="w-full max-w-sm mx-auto px-4 py-2">
        <div className="flex items-center border-b-2 border-teal-500 py-2">
          <input
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Add a task"
            onChange={handleChange}
          />
          <button
            className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
            type="button"
            onClick={addTask}
          >
            Add
          </button>
        </div>
      </form>
      <ul className="divide-y divide-gray-200 px-4">
        {tasks.map((item) => (
          <li key={item.id} className="py-4">
            <div className="flex items-center">
              <input
                checked={item.done}
                name={item.text}
                id={item.text.toString()}
                onClick={() => markDone(item)}
                type="checkbox"
                className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
              />
              <label htmlFor="todo1" className="ml-3 block text-gray-900">
                {!item.done ? (
                  <span className="text-lg font-medium">{item.text}</span>
                ) : (
                  <span className="text-lg font-medium line-through text-teal-500">
                    {item.text}
                  </span>
                )}
              </label>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
