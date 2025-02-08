import React, { useEffect, useState } from 'react'
import '../styles/TaskForm.css';
import { Todo } from '../types';

interface TaskFormProps {
  addTodo: (content: string) => void;
  updateTodo: (todo: Todo) => void;
  editingTodo?: Todo | null;
}

export default function TaskForm({ addTodo, updateTodo, editingTodo }: TaskFormProps) {
  const [todo, setTodo] = useState(editingTodo ? editingTodo.content : "");

  useEffect(() => {
    if (editingTodo) {
      setTodo(editingTodo.content);
    } else {
      setTodo('');
    }
  }, [editingTodo]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo.trim()) {
      if (editingTodo) {
        updateTodo({ ...editingTodo, content: todo.trim() });
      } else {
        addTodo(todo.trim());
      }
      setTodo('');
    }
  };


  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="new-input"
        value={todo}
        onChange={handleChange}
        placeholder="Add a new task..."
      />
      <button type="submit" className="task-submit">
        <i className="bi bi-plus-square"></i>
      </button>
    </form>
  )
}