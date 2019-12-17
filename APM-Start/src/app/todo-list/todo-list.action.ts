import { TodoList } from "../todo-list";
import { Action, createAction, props } from "@ngrx/store";

export const GET_LISTS = "GET_LISTS";
export const GET_LISTS_SUCCESS = "GET_LISTS_SUCCESS";
export const GET_LISTS_ERROR = "GET_LISTS_ERROR";
export const GET_ITEMS = "GET_ITEMS";
export const GET_ITEMS_SUCCESS = "GET_ITEMS_SUCCESS";
export const GET_ITEMS_ERROR = "GET_ITEMS_ERROR";
export const CREATE_LISTS = "CREATE_LISTS";
export const CREATE_LISTS_SUCCESS = "CREATE_LISTS_SUCCESS";
export const CREATE_LISTS_ERROR = "CREATE_LISTS_ERROR";
export const DELETE_LIST = "DELETE_LIST";
export const DELETE_LIST_SUCCESS = "DELETE_LIST_SUCCESS";
export const DELETE_LIST_ERROR = "DELETE_LIST_ERROR";
export const UPDATE_LIST = "UPDATE_LIST";
export const UPDATE_LIST_SUCCESS = "UPDATE_LIST_SUCCESS";
export const UPDATE_LIST_ERROR = "UPDATE_LIST_ERROR";

export const loadLists = createAction(
	GET_LISTS
);

export const loadListsSuccess = createAction(
  GET_LISTS_SUCCESS,
	  props<{ data: TodoList[] }>()
);

export const loadListsError = createAction(
  GET_LISTS_ERROR,
	  props<{error: any }>()
);

export const createLists = createAction(
  CREATE_LISTS,
  props<{ data: TodoList }>()
);

export const createListsSuccess = createAction(
  CREATE_LISTS_SUCCESS,
	  props<{ data: TodoList }>()
);

export const createListsError = createAction(
  CREATE_LISTS_ERROR,
	  props<{error: any }>()
);

export const loadItems = createAction(
  GET_ITEMS,
  props<{id: number}>()
);
export const loadItemsSuccess = createAction(
  GET_ITEMS_SUCCESS,
	  props<{ data: TodoList[] }>()
);

export const loadItemsError = createAction(
  GET_ITEMS_ERROR,
	  props<{error: any }>()
);

export const deleteList = createAction(
  DELETE_LIST,
  props<{id: number}>()
);

export const deleteListSucess = createAction(
  DELETE_LIST_SUCCESS,
  props<{data: TodoList}>()
);

export const deleteListError = createAction(
  DELETE_LIST_SUCCESS,
  props<{error: any}>()
);

export const updateList = createAction(
  UPDATE_LIST,
  props<{data: TodoList}>()
);

export const updateListSucess = createAction(
  UPDATE_LIST_SUCCESS,
  props<{data: TodoList}>()
);

export const updateListError = createAction(
  UPDATE_LIST_SUCCESS,
  props<{error: any}>()
);
