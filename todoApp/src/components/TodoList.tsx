import type { Props, TodosType } from "../types/types"
import { TodoItem } from "./TodoItem"

export const TodoList = ({ data, updateTodo, deleteTodo }: Props<TodosType>) => {

    return (
        <ul>
            {data.map((e) => {
                return <TodoItem key={e.id} todo={e} updateTodo={updateTodo} deleteTodo={deleteTodo} />
            })}
        </ul>
    );
}