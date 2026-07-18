import { useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

export const Todo = () => {
  const [inputValue, setInputvalue] = useState('');
  const [task, setTask] = useState([]);
  const [complete, setComplete] = useState(false);
  const [draggedItems, setDraggedItems] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;
    setInputvalue('');
    if (task.includes(inputValue)) return;

    if (!inputValue) return;

    setTask((prev) => [...prev, inputValue]);
  };
  const handleDelete = (ind) => {
    setTask(task.filter((_, index) => index != ind));
  };

  const handleDragStart = (index) => {
    setDraggedItems(index);
  };
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (index) => {
    const updatedTodos = [...task];
    const draggedTodo = updatedTodos.splice(draggedItems, 1)[0];

    updatedTodos.splice(index, 0, draggedTodo);
    setTask(updatedTodos);
    setDraggedItems(null);
  };

  return (
    <>
      <header style={{ display: 'flex', justifyContent: 'center' }}>
        <h1>Todo List</h1>
      </header>
      <section>
        <form
          style={{ display: 'flex', justifyContent: 'center' }}
          onSubmit={handleSubmit}
        >
          <div>
            <input
              type='text'
              autoComplete='off'
              value={inputValue}
              onChange={(e) => setInputvalue(e.target.value)}
            />
          </div>
          <div>
            <button type='submit'>Add</button>
          </div>
        </form>
        <section>
          <ul>
            {task.map((todo, index) => (
              <li
                key={index}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '10px',
                }}
              >
                <span
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={handleDragOver}
                  onDrag={() => handleDrop(index)}
                >
                  {todo}
                </span>
                <button
                  onClick={() => {
                    setComplete(!complete);
                    console.log(complete);
                  }}
                >
                  <FaCheckCircle />
                </button>
                <button>
                  <MdDelete
                    style={{ color: 'red' }}
                    onClick={() => handleDelete(index)}
                  />
                </button>
              </li>
            ))}
          </ul>
        </section>
      </section>
    </>
  );
};
