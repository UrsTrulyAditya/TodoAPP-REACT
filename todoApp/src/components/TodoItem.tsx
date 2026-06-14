import { useState } from "react";
import type { ITodoItem } from "../types/types";
import './todos.css';
export const TodoItem = ({ todo, updateTodo, deleteTodo }: ITodoItem) => {
    const [text, setText] = useState(todo.title);
    const [isEdit, setEdited] = useState(false);

    const handleSave = () => {
        updateTodo(todo.id, { ...todo, title: text });
        setEdited(false);
    }

    const handleCheckbox = () => {
        updateTodo(todo.id, { ...todo, completed: !todo.completed });
    }

    return (
        <div className="todo-item">
            {isEdit ?
                <>
                    <input value={text} onChange={(e) => setText(e.target.value)} />
                    <>
                        <button onClick={() => {
                            setEdited(false)
                            setText(todo.title)
                        }}>Cancel</button>
                        <button onClick={handleSave}>Save</button>

                    </>
                </>
                : <li style={todo.completed ? { textDecoration: "line-through" } : {}}>{todo.title}
                    <button onClick={() => setEdited(true)}>Edit</button></li>}
            {
                !isEdit &&
                <>
                    <input checked={todo.completed} type="checkbox" onChange={handleCheckbox} />
                    <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                </>
            }
        </div >
    );
}