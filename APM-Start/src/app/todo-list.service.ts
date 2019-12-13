import { Injectable } from "@angular/core";
import { TodoList } from "./todo-list";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError, tap } from "rxjs/operators";
@Injectable({
  providedIn: "root"
})
export class TodoListService {
  private getListsUrl = "api/todoLists"; // URL to web api
  private todoList: TodoList[];
  private httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };
  constructor(private http: HttpClient) {}

  getLists(): Observable<TodoList[]> {
    return this.http.get<TodoList[]>(this.getListsUrl, this.httpOptions).pipe(
      tap(data => console.log("[GET LISTS]", JSON.stringify(data))),
      catchError(this.handleError<TodoList[]>("add List"))
    );
  }

  createList(todoList: TodoList): Observable<TodoList> {
    return this.http
      .post<TodoList>(this.getListsUrl, todoList, this.httpOptions)
      .pipe(
        tap(data => console.log("[CREATE LIST]", JSON.stringify(data))),
        catchError(this.handleError<TodoList>("add List"))
      );
  }

  updateList(todoList: TodoList): Observable<TodoList> {
    const url = `${this.getListsUrl}/${todoList.id}`;
    return this.http.put<TodoList>(url, todoList, this.httpOptions).pipe(
      tap(data => console.log("[UPDATE LIST]", JSON.stringify(todoList))),
      catchError(this.handleError<TodoList>("add List"))
    );
  }

  deleteList(id: number): Observable<TodoList> {
    const url = `${this.getListsUrl}/${id}`;

    return this.http.delete<TodoList>(url, this.httpOptions).pipe(
      tap(data => console.log("[DELETE LIST]", data)),
      catchError(this.handleError<TodoList>("deletedlist"))
    );
  }

  getList(id: number): Observable<TodoList> {
    const url = `${this.getListsUrl}/${id}`;
    return this.http.get<TodoList>(url).pipe(
      tap(data => console.log("[GET LIST]", data)),
      catchError(this.handleError<TodoList>(`getlist id=${id}`))
    );
  }

  sampleMethod(id: number): Observable<TodoList> {
    const url = `${this.getListsUrl}/${id}`;
    const list$ = this.http.get<TodoList>(url).pipe(
      tap(data => console.log("[GET LIST]", data)),
      catchError(this.handleError<TodoList>(`getlist id=${id}`))
    );
    return list$;
  }
  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    console.error(message);
  }
}
