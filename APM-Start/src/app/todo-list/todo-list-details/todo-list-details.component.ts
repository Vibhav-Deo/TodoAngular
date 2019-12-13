import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { TodoList } from '../../todo-list';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ModalServiceService } from '../../modal-service.service';
import { FormControl } from '@angular/forms';
import { TodoListService } from '../../todo-list.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, switchMap, map, concatMap, withLatestFrom } from 'rxjs/operators';

@Component({
  selector: 'pm-todo-list-details',
  templateUrl: './todo-list-details.component.html',
  styleUrls: ['./todo-list-details.component.css']
})
export class TodoListDetailsComponent implements OnInit {
  listName = 'List details';
  todoList: TodoList[];
  description = new FormControl('');
  checklistItemDescription: object[] = [];
  todoLists: TodoList;
  fetchListSubj$ = new BehaviorSubject(true);
  id = +this.route.snapshot.paramMap.get('id');
  todoList$ = this.todoListService.getList(this.id);
  onCreate$ = new BehaviorSubject(true);
  realList$ = this.onCreate$.pipe(
    withLatestFrom(this.todoListService.getList(this.id)),
    concatMap(([create, list]) => {
      console.log(create);
      console.log(list);
      return of(list.checkListItems);
    })
  );

  // this.todoListService
  //   .getList(this.id)
  //   .pipe(
  //     concatMap()
  //     map(level1List => level1List.checkListItems));

  get fetchList$() {
    return this.fetchListSubj$.asObservable().pipe(tap(console.log));
  }

  // tslint:disable-next-line: max-line-length
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private modalService: ModalServiceService,
    private todoListService: TodoListService
  ) {
    console.log(this.route.snapshot.paramMap.get('id'));
    this.onCreate$.next(true);
  }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.todoListService.getList(id).subscribe(returnedList => {
      this.todoLists = returnedList;
      console.log('initialised todolists');
      console.log(this.todoLists);
    });
    // this.fetchItems(id);
  }

  private fetchItems(id: number) {
    this.todoList$ = this.fetchList$.pipe(
      switchMap(() => this.todoListService.sampleMethod(id)),
      tap(console.log)
    );
  }

  onBack(): void {
    this.router.navigate(['/lists']);
  }

  open(content): void {
    this.modalService.open(content);
  }

  createItem(event): void {
    const lastID = this.todoLists.checkListItems[
      this.todoLists.checkListItems.length - 1
    ].id;

    this.todoLists.checkListItems.push({
      id: lastID + 1,
      description: this.description.value,
      isChecked: false
    });
  }
  onCheckChange(event, item): void {
    const index = this.todoLists.checkListItems.findIndex(
      x => x.id === item.id
    );
    this.todoLists.checkListItems[index] = {
      id: item.id,
      description: item.description,
      isChecked: event.returnValue
    };
  }
  onSave(): void {
    console.log('update list to');
    console.log(this.todoLists);
    this.todoListService
      .updateList(this.todoLists).subscribe(
        returnedList => {
          this.todoLists = returnedList;
        }
      );
    this.todoLists =
      this.todoList && this.todoList.length > 0
        ? this.todoList[0]
        : this.todoLists;
  }
  delete(list): void {
    console.log('Deleted');
  }
}
