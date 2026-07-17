import { useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

export const Todo = () => {
  const [inputValue, setInputvalue] = useState('');
  const [task, setTask] = useState([]);
  const [complete, setComplete] = useState(false);

  const handleDelete = (ind) => {
    setTask(task.filter((_, index) => index != ind));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setInputvalue('');
    if (task.includes(inputValue)) return;

    if (!inputValue) return;

    setTask((prev) => [...prev, inputValue]);
  };
  // console.log(complete);
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
                style={{ display: 'flex', justifyContent: 'center' }}
              >
                <span>{todo}</span>
                <button
                  onClick={() => {
                    setComplete(!complete);
                    console.log(complete);
                  }}
                >
                  <FaCheckCircle style={{ color: complete ? 'green' : '' }} />
                </button>
                <MdDelete
                  style={{ color: 'red' }}
                  onClick={() => handleDelete(index)}
                />
              </li>
            ))}
          </ul>
        </section>
      </section>
    </>
  );
};
