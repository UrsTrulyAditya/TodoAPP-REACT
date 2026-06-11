export interface TodosType { id: number, title: string, completed: boolean };

export type Props<T> = {
    data: T[];
    updateTodo: (id: number) => void;
    deleteTodo: (id: number) => void;

}

export interface ITodoItem {
    todo: TodosType, updateTodo: (id: number) => void;
    deleteTodo: (id: number) => void;
}

