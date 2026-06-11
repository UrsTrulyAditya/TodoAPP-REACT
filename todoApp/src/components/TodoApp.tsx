import { useState } from "react"
import type { TodosType } from "../types/types";
import { TodoList } from "./TodoList";

export const TodoApp = () => {
    const [todo, setTodo] = useState<string>("");
    const [todos, setTodos] = useState<TodosType[]>([]);

    const deleteTodo = (id: number) => {
        const filtData = todos.filter(e => e.id !== id);
        setTodos(filtData);
    }

    const updateToggle = (id: number, updates: Partial<TodosType>) => {
        const todoItem = todos.find((e) => e.id === id);
        if (!todoItem) return;
        setTodos((prev) => prev.map((e) => {
            return e.id === id ? { ...e, ...updates } : e;
        }));
    }

    const saveTodo = () => {
        if (!todo.trim()) return;
        const item = { id: Date.now(), title: todo, completed: false };
        setTodos((todos) => [...todos, item]);
        setTodo("");
    }
    return (
        <div>
            <h2>Todo Application</h2>
            <p>You can add your todo list, update the list and delete the list</p>
            <div>
                <input onChange={(e) => setTodo(e.target.value)} value={todo} />
                <button onClick={saveTodo}>Save</button>
            </div>
            <TodoList data={todos} updateTodo={updateToggle} deleteTodo={deleteTodo} />
        </div>

    );
}