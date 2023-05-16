import { useEffect, useState } from 'react';
import axios from 'axios';


const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);


  const fetchTodos = async () => {
        try {
          const response = await axios.get('http://localhost:3000/todos');
          setTodos(response.data);
        } catch (error) {
          console.error('Failed to fetch todos:', error);
        }
      };
      
      const createTodo = async () => {
        try {
          const response = await axios.post('http://localhost:3000/todos', {
            title,
            description,
          });
          setTodos([...todos, response.data]);
          setTitle('');
          setDescription('');
        } catch (error) {
          console.error('Failed to create todo:', error);
        }
      };
      
      const deleteTodo = async (id) => {
        try {
          await axios.delete(`http://localhost:3000/todos/${id}`);
          setTodos(todos.filter((todo) => todo._id !== id));
        } catch (error) {
          console.error('Failed to delete todo:', error);
        }
      };

  return (
    <div>
      <h1>Todo List</h1>
      <div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
        <button onClick={createTodo}>Add Todo</button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            <h3>{todo.title}</h3>
            <p>{todo.description}</p>
            <button onClick={() => deleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
