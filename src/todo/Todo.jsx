import { useLayoutEffect, useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

export const Todo = () => {
  const [inputValue, setInputvalue] = useState('');
  const [tasks, setTasks] = useState([]);
  const [draggedItems, setDraggedItems] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const text = inputValue.trim();

    if (!text) return;

    if (tasks.some((task) => task.text.toLowerCase() === text.toLowerCase())) {
      alert('Task already exists!');
      return;
    }

    setTasks((prev) => [...prev, { id: Date.now(), text, completed: false }]);
    setInputvalue('');
  };
  const handleDelete = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const handleDragStart = (index) => {
    setDraggedItems(index);
  };
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (index) => {
    if (draggedItems === [...tasks]) return;

    const updatedTasks = [...tasks];
    const draggedTask = updatedTasks.splice(draggedItems, 1)[0];

    updatedTasks.splice(index, 0, draggedTask);

    setTasks(updatedTasks);
    setDraggedItems(null);
  };

  return (
    <>
      <div className='min-h-screen bg-blue-950 flex justify-center items-center p-5'>
        <div className='w-full max-w-lg border-x-indigo-400 rounded-xl shadow-lg p-6'>
          <h1 className='text-3xl font-bold text-center mb-6 text-white'>
            Todo List
          </h1>
          <form onSubmit={handleSubmit} className='flex gap-3 mb-6'>
            <input
              type='text'
              value={inputValue}
              onChange={(e) => setInputvalue(e.target.value)}
              placeholder='Enter a task...'
              className='flex-1 border rounded-xl px-4 py-2 outline-none text-white focus:ring-2 focus:ring-blue-500 '
            />
            <button
              type='submit'
              className='bg-blue-600 text-white px-5 rounded-xl hover:bg-blue-700 transition'
            >
              Add
            </button>
          </form>
          {tasks.length === 0 ? (
            <p className='text-center text-gray-500'>No tasks yet.</p>
          ) : (
            <ul className='space-y-3'>
              {tasks.map((task, index) => (
                <li
                  key={task.id}
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={handleDragOver}
                  onDrop={() => handleDrop(index)}
                  className='flex items-center justify-between bg-gray-50 border rounded-lg p-3 cursor-move hover:shadow-md transition'
                >
                  <span
                    className={`flex-1 ${task.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}
                  >
                    {task.text}
                  </span>
                  <div className='flex gap-3'>
                    <button
                      onClick={() => toggleComplete(task.id)}
                      className={`text-xl ${task.completed ? 'text-green-600' : 'text-gray-500 hover:text-green-600'}`}
                    >
                      <FaCheckCircle />
                    </button>
                    <button
                      onClick={() => handleDelete(task.id)}
                      className='text-red-600 hover:text-red-700 text-2xl'
                    >
                      <MdDelete />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};
