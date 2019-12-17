import { initializeState, ToDoState } from './todo-list.state';
import { createReducer, on, createAction, Action } from '@ngrx/store';
import { loadLists, loadListsSuccess, loadItems, loadItemsSuccess, createLists, createListsSuccess, deleteList, deleteListSucess, updateList, updateListSucess } from './todo-list.action';



const initialState = initializeState();

const todoListsReducer = createReducer(
  initialState,
  on(loadLists, state => ({...state, loaded: false})),
  on(loadListsSuccess, (state, data) => {
    //state.data = data.data;
    console.log('REDUCER-Data', data.data, 'REDUCER-State', state.data);
    return ({...state, ...data, loaded: true});
}),
  on(loadItems, state => ({...state, loaded: false})),
  
  on(loadItemsSuccess, (state, data) =>({...state, ...data, loaded: true})),
  on(createLists, state => ({...state, loaded: false})),
  on(createListsSuccess, (state, data) => {
  state.data.push(data.data);
  const newState = state;
  return ({...state, ...newState, loaded: true});
}),
  on(updateList, state => ({
  ...state,
  loaded: false
})),
  on(updateListSucess, (state, data) => {
  console.log('++++++++++++++++++++++++++++>', data.data);
  return ({...state, ...data.data, loaded: true});
})
);
export function reducer(state: ToDoState, action: Action): ToDoState {
  return todoListsReducer(state, action);
}

