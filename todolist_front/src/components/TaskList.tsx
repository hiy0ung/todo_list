import React, { useState } from "react";
import '../styles/TaskList.css';
import { Todo } from "../types";


interface TodoListProps {
  todos: Todo[];
  updateStatus: (todo: Todo) => void;
  updateTodo: (todo: Todo) => void;
  deleteTodo: (todo: Todo) => void;
}

export default function TaskList({ todos, updateStatus, updateTodo, deleteTodo }: TodoListProps) {
  const [updateId, setUpdateId] = useState<number | null>(null);
  const [updateContent, setUpdateContent] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateContent(e.target.value);
  }

  const handleUpdate = (todo: Todo) => {
    setUpdateId(todo.id);
    setUpdateContent(todo.content);
  }

  const handleSave = (todo: Todo) => {
    if (updateContent.trim()) {
      updateTodo({ ...todo, content: updateContent.trim()})
    }
    setUpdateId(null);
  }

  return (
    <ul className="to-do-list">
      {todos.map((todo) => (
        <li key={todo.id} className={`task ${todo.status ? "completed" : ""}`}>
          {updateId === todo.id ? (
            <input
              type="text"
              value={updateContent}
              onChange={handleChange} 
              onBlur={() => handleSave(todo)}
              onKeyDown={(e) => e.key === "Enter" && handleSave(todo)}
              autoFocus
              className="edit-input"
            />
          ) : (
            <span className={todo.status ? "completed-text" : ""} onClick={() => updateStatus(todo)}>{todo.content}</span>
          )}
          <>
            <i 
              className="bi bi-pencil edit-btn" 
              onClick={(e) => {
                e.stopPropagation(); 
                handleUpdate(todo);
              }}
            ></i>
            <i 
              className="bi bi-x-square delete-btn"
              onClick={(e) => {
                e.stopPropagation();
                deleteTodo(todo)}}
            ></i>
          </>
        </li>
      ))}
    </ul>
  );
}