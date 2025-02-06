import React, { useEffect, useState } from 'react'
import { Todo } from '../../types';
import '../../styles/Main.css';
import Clock from '../../components/Clock';
import ProgressBar from '../../components/ProgressBar';
import TaskForm from '../../components/TaskForm';
import TaskList from '../../components/TaskList';
import { createTodo, deleteTodo, fetchTodos, updateTodoStatus } from '../../apis';

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const loadTodos = async () => {
    const data = await fetchTodos();
    setTodos(data);
  }

  useEffect(() => {
    loadTodos();
  }, []);

  const addTodo = async (todo: string) => {
    const newTodo = await createTodo(todo);
    setTodos(prevTodos => [...prevTodos, newTodo]);
  }

  const toggleTodoStatus = async (todo: Todo) => {
    await updateTodoStatus(todo.id, !todo.status);
    setTodos(todos.map(t => (t.id === todo.id ? { ...t, status: !t.status } : t)));
  };

  const removeTodo = async (todo: Todo) => {
    await deleteTodo(todo.id);
    setTodos(todos.filter(t => t.id !== todo.id));
  };

  return (
    <div className='todo-container'>
      <Clock />
      <ProgressBar tasks={todos} />
      <TaskForm addTask={addTodo} />
      <TaskList todos={todos} toggleTodoStatus={toggleTodoStatus} deleteTodo={removeTodo} />
    </div>
  )
}