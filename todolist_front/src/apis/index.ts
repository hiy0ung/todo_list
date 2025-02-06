import axios from "axios";
import { Todo } from "../types";


export const MAIN_URL = `http://localhost:8082/api/v1`;

const TODO_API_URL = `${MAIN_URL}/todolist`;

export const fetchTodos = async () => {
  const response = await axios.get<{ data: Todo[] }>(TODO_API_URL);
  return response.data.data;
};

export const createTodo = async (todo: string) => {
  const response = await axios.post<{ data: Todo }>(TODO_API_URL, { todo, status: false });
  return response.data.data;
};

export const updateTodoStatus = async (id: number, status: boolean) => {
  await axios.put(`${TODO_API_URL}/${id}`, { status });
};

export const deleteTodo = async (id: number) => {
  await axios.delete(`${TODO_API_URL}/${id}`);
};