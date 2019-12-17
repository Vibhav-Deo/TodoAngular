import { Injectable } from '@angular/core';
import { Actions, Effect, ofType, createEffect } from '@ngrx/effects';
import { Observable, of, EMPTY } from 'rxjs';
import { TodoListService } from '../todo-list.service';
import { map, catchError, switchMap, tap, mergeMap } from 'rxjs/operators';
import * as ToDoListActions from './todo-list.action';

@Injectable({
  providedIn: 'root'
})
export class TodosEffects {
  constructor(
    private actions$: Actions,
    private todosService: TodoListService
  ) {}

  // to label our property getTodos$ as an effect
  // that will be triggered when we dispatch actions with the store.
  getTodos$ = createEffect(() => this.actions$.pipe(
    ofType(ToDoListActions.loadLists),
    switchMap(() => this.todosService.getLists()
      .pipe(
        tap(data => console.log('[EFFECT] GET TODO', data)),
        map(todos => ToDoListActions.loadListsSuccess({
          data: todos
        })),
        catchError((error) => of(ToDoListActions.loadListsError(error)))
      ))
    )
  );

addTodo$ =  createEffect(() => this.actions$.pipe(
  ofType(ToDoListActions.createLists),
  switchMap((action: any) =>
    this.todosService.createList(action.data).pipe(
      tap(data => console.log('[EFFECT] CREATE LIST', action)),
      map(todo => ToDoListActions.createListsSuccess({
        data: todo
      })),
      catchError((error) => of(ToDoListActions.createListsError(error)))
    )
  )
)
);


deleteTodo$ = createEffect(() => this.actions$.pipe(
  ofType(ToDoListActions.deleteList),
  switchMap((action: any) =>
    this.todosService.deleteList(action.id).pipe(
      tap(data => console.log('[EFFECT] DELETE LIST', action)),
      map(todo => ToDoListActions.deleteListSucess({
        data: todo
      })),
      catchError((error) => of(ToDoListActions.deleteListError(error)))
    )
  )
)
);



getSingleTodo$ = createEffect(() =>  this.actions$.pipe(
  ofType(ToDoListActions.loadItems),
  switchMap((action: any) =>
    this.todosService.getList(action.id).pipe(
      tap(data => console.log('[EFFECT] GET LIST', action)),
      map(todo => ToDoListActions.loadItemsSuccess({
        data: todo
      })),
      catchError((error) => of(ToDoListActions.loadItemsError(error)))
    )
  )
)
);


updateTodo$ = createEffect(() =>  this.actions$.pipe(
  ofType(ToDoListActions.updateList),
  switchMap((action: any) =>
    this.todosService.updateList(action.data).pipe(
      tap(data => console.log('[EFFECT] UPDATE LIST', action.data)),
      map(todo => ToDoListActions.updateListSucess({
        data: todo
      })),
      catchError(() => of(ToDoListActions.updateListError))
    )
  )
)
);
}
