import { initializeState } from './todo-list.state';

export const GET_TODOS = "GET_TODOS";
export const GET_TODOS_SUCCESS = "GET_TODOS_SUCCESS";
export const GET_TODOS_ERROR = "GET_TODOS_ERROR";
export const ADD_TODO = 'ADD_TODO';
export const ADD_TODO_SUCCESS = "ADD_TODO_SUCCESS";
export const ADD_TODO_ERROR = "ADD_TODO_ERROR";
export const DELETE_TODO = 'DELETE_TODO';
export const DELETE_TODOSUCCESS = 'DELETE_TODO_SUCCESS';
export const DELETE_TODOERROR = 'DELETE_TODO_ERROR';

const initialState = initializeState();

export function todos(state = initialState, { type, payload }) {
    switch (type) {
        case GET_TODOS:
            return Object.assign({}, state, { pending: true, error: null });
        case GET_TODOS_SUCCESS:
            return Object.assign({}, state, { data: payload, pending: false });
        case GET_TODOS_ERROR:
            return Object.assign({}, state, { pending: false, error: "Error" });
        case ADD_TODO_SUCCESS:
            return Object.assign({}, state, { data: [...state.data, payload] });
        case ADD_TODO_ERROR:
            return Object.assign({}, state, { pending: false, error: "Error" });

        default:
            return state;
    }
}

export function getTodos() {
    return {
        type: GET_TODOS
    }
}

export function addTodo(title) {
    return {
        type: ADD_TODO,
        payload: {
            title
        }
    }
}