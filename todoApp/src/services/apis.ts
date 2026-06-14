import type { TodosType } from "../types/types";
import axios from "axios";
const BASER_URL = "http://localhost:3000";

export const getTodos = async () => {
    const res = await axios.get(BASER_URL);
    return res.data;
}

export const createTodo = async (todo: TodosType) => {
    const res = await axios.post(`${BASER_URL}/todos`, todo);
    return res;
}


export const updateTodo = async (id: number, updates: Partial<TodosType>) => {
    const res = await axios.put((`${BASER_URL}/todos/${id}`), updates);

    return res;
}


export const deleteTodo = async (id: number) => {
    const res = await axios.delete(`${BASER_URL}/todos/${id}`);

    return res;
}