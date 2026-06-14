import { useState } from "react"
import type { TodosType } from "../types/types";
import { TodoList } from "./TodoList";
import { getTodos, createTodo, updateTodo, deleteTodo as deleteT } from "../services/apis";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

export const TodoApp = () => {
    const [todo, setTodo] = useState<string>("");
    // const [todos, setTodos] = useState<TodosType[]>([]);
    // useEffect(() => {
    //     fetchTodos();
    // }, []);
    const { data: todos, isLoading, error } = useQuery({
        queryKey: ["todos"],
        queryFn: getTodos,
    })
    const queryClient = useQueryClient();
    const deleteMutation = useMutation({
        mutationFn: deleteT,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["todos"],
            })
        }
    });
    const deleteTodo = (id: number) => {
        deleteMutation.mutate(id);
    }

    const updateMutation = useMutation({
        mutationFn: ({
            id,
            updates
        }: { id: number, updates: Partial<TodosType> }) => updateTodo(id, updates),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["todos"]
            })
        }
    });
    const updateToggle = (id: number, updates: Partial<TodosType>) => {
        updateMutation.mutate({ id, updates });
    }
    const createTodoMutation = useMutation({
        mutationFn: createTodo,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["todos"]
            })
        }
    })
    const saveTodo = () => {
        if (!todo.trim()) return;
        createTodoMutation.mutate({ id: Date.now(), title: todo, completed: false });

    }
    if (isLoading) {
        return <h1>Loading...</h1>
    }
    if (error) {
        return <h1>Something went wrong...</h1>
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