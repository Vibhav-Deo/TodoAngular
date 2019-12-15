
import { TodoList } from '../todo-list';
import ActionWithPayload from '../ActionWithPayload';
import { Action } from '@ngrx/store';

export const GET_TODO = '[ToDo] GET_TODO';
export const CREATE_TODO = '[ToDo] CREATE_TODO';

export class GetToDo implements Action {
    readonly type = GET_TODO;

    constructor() { }
}

export class CreateToDo implements ActionWithPayload<TodoList> {
    readonly type = CREATE_TODO;
    payload: TodoList;

    constructor(payload: TodoList) {
        this.payload = payload;
    }
}

export type All = GetToDo | CreateToDo;