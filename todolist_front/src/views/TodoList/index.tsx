/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react'
import { Todo } from '../../types';
import Clock from '../../components/Clock';
import ProgressBar from '../../components/ProgressBar';
import TaskForm from '../../components/TaskForm';
import TaskList from '../../components/TaskList';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import Header from '../../layouts/Header';
import * as css from "./style";


const TODO_API_URL = `http://localhost:8082/api/v1/todos`;

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [cookies] = useCookies(['token']);
  const token = cookies.token;

  const fetchTodos = async () => {
    try {
      const response = await axios.get<{ data: Todo[] }>(TODO_API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTodos(response.data.data);
    } catch (error) {
      console.error("Error fetching todos: ", error);
    }
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  const createTodo = async (content: string) => {
    try {
      const response = await axios.post<{ data: Todo }>(
        TODO_API_URL,
        { content, status: false },
        { headers: { Authorization: `Bearer ${token}` }}
      );
      setTodos([...todos, response.data.data]);
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  const updateContent = async (todo: Todo) => {
    try {
      const response = await axios.put(
        `${TODO_API_URL}/${todo.id}`,
        { content: todo.content },
        { headers: { Authorization: `Bearer ${token}` }}
      );
      const updatedTodos = todos.map((t) =>
        t.id === todo.id ? response.data.data : t
      );
      setTodos(updatedTodos);
      setEditingTodo(null);
    } catch (error) {
      console.error("Error updating content: ", error);
    }
  };

  const updateStatus = async (todo: Todo) => {
    try {
      const updatedStatus = !todo.status;
      const response = await axios.put(
        `${TODO_API_URL}/status/${todo.id}?updateStatus=${updatedStatus}`, 
        {},
        { headers: { Authorization: `Bearer ${token}`, }}
      );
      const updatedTodos = todos.map((t) =>
        t.id === todo.id ? { ...t, status: updatedStatus } : t
      );
      setTodos(updatedTodos);
    } catch (error) {
      console.error("업데이트 실패:", error);
    }
  };

  const deleteTodo = async (todo: Todo) => {
    try {
      await axios.delete(`${TODO_API_URL}/${todo.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTodos(todos.filter((t) => t.id !== todo.id));
    } catch (error) {
      console.error("Error deleting todo: ", error);
    }
  };

  return (
    <div css={css.todoContainer}>
      <Header />
      <Clock />
      <ProgressBar todos={todos} />
      <TaskForm 
        addTodo={createTodo}
        updateTodo={updateContent}
        editingTodo={editingTodo} />
      <TaskList
        todos={todos}      
        updateStatus={updateStatus}
        updateTodo={updateContent}
        deleteTodo={deleteTodo}
      />
    </div>
  )
}