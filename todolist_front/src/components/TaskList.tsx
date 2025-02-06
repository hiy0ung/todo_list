import React from "react";
import '../styles/TaskList.css';
import { Todo } from "../types";


interface TodoListProps {
  todos: Todo[];
  toggleTodoStatus: (todo: Todo) => void;
  deleteTodo: (todo: Todo) => void;
}

export default function TaskList({
  todos,
  toggleTodoStatus,
  deleteTodo,
}: TodoListProps) {
  return (
    <ul className="to-do-list">
      {todos.map((todo, index) => (
        <li
          key={index}
          className={`task ${todo.status ? "completed" : ""}`}
          onClick={() => toggleTodoStatus(todo)}
        >
          <span>{todo.content}</span>
          <i
            className="bi bi-x-square delete-btn"
            onClick={(e) => {
              e.stopPropagation();
              deleteTodo(todo);
            }}
          ></i>
        </li>
      ))}
    </ul>
  );
}