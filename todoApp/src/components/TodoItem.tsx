import type { ITodoItem } from "../types/types";
import './todos.css';
export const TodoItem = ({ todo, updateTodo, deleteTodo }: ITodoItem) => {
    return (
        <div className="todo-item">
            <li key={todo.id} style={todo.completed ? { textDecoration: "line-through" } : {}}>{todo.title}</li>
            <>
                <input checked={todo.completed} type="checkbox" onChange={() => updateTodo(todo.id)} />
                <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            </>
        </div>
    );
}