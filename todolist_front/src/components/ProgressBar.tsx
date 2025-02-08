import React from 'react'
import '../styles/ProgressBar.css';
import { Todo } from '../types';


interface ProgressBarProps {
  todos: Todo[];
}

export default function ProgressBar({ todos }: ProgressBarProps) {
  const completedTasks = todos.filter(todo => todo.status).length;
  const progress = todos.length ? (completedTasks / todos.length) * 100 : 0;

  return (
    <div className="progress">
      <div className="progress-done" style={{ width: `${progress}%` }}>
      </div>
    </div>
  );
}