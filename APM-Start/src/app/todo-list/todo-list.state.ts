import { TodoList } from '../todo-list';

export interface ToDoState {
    data: TodoList[];
}

export const initializeState = (): ToDoState => {
    return ({
        data: []
    });
}