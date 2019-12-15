import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import {
    GET_TODOS, GET_TODOS_SUCCESS, GET_TODOS_ERROR,
    ADD_TODO, ADD_TODO_SUCCESS, ADD_TODO_ERROR
} from "./todo-list.reducer";
import { TodoListService } from '../todo-list.service';
import { map, catchError, switchMap, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class TodosEffects {
    constructor(
        private actions$: Actions,
        private todosService: TodoListService
    ) { }

    // to label our property getTodos$ as an effect 
    // that will be triggered when we dispatch actions with the store.
    @Effect() getTodos$ = this.actions$.pipe(
        ofType(GET_TODOS),     //for filtering actions by action type
        switchMap(
            (action: any) =>
                this.todosService.getLists().pipe(
                    map(todos => ({ type: GET_TODOS_SUCCESS, payload: todos })),
                    catchError(error => error)
                )
        )
    )

    @Effect() addTodo$ = this.actions$.pipe(

        ofType(ADD_TODO),
        switchMap(
            (action: any) =>
                this.todosService.createList(action.payload.title).pipe(
                    tap(data => console.log('=====================>', action.payload)),
                    map(todo => ({ type: ADD_TODO_SUCCESS, payload: todo }))
                )
        )
    )
}