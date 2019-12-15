import {
  Component,
  OnInit,
  Injectable,
  Inject,
  OnDestroy,
  ViewChild,
  ChangeDetectionStrategy,
  Input
} from '@angular/core';
import { TodoList } from '../todo-list';
import { ModalServiceService } from '../modal-service.service';
import { FormControl } from '@angular/forms';
import { TodoListService } from '../todo-list.service';
import { Subscription, BehaviorSubject, Observable } from 'rxjs';
import { map, tap, switchMap, startWith, take, filter } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { getTodos, ADD_TODO_SUCCESS, addTodo } from './todo-list.reducer';
import { TodosEffects } from '../todo-list/todo-list.effect';
@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent implements OnInit, OnDestroy {

  pageTitle = 'My list\'s';
  displayImage = false;
  buttonText = 'Show Images';
  listFilter = new FormControl('');
  name = new FormControl('');
  description = new FormControl('');
  dataToAdd: TodoList;
  todos$: Observable<any>;
  @ViewChild('content', { static: true }) modal: NgbModal;

  todoLists: TodoList[] = [];
  subscriptions: Subscription[] = [];
  addTodoSuccess$: Observable<any>;
  constructor(
    private modalService: ModalServiceService,
    private store: Store<any>,
    private todosEffects: TodosEffects
  ) {
    this.store.dispatch(getTodos());  // effects will be triggered
    this.todos$ = store.select("todos");
    this.addTodoSuccess$ = this.todosEffects.addTodo$.pipe(
      filter(
        ({ type }) => type === ADD_TODO_SUCCESS
      )
    );
  }
  filteredList$ = this.listFilter.valueChanges.pipe(
    startWith(''),
    switchMap(filter =>
      this.todos$.pipe(
        tap(console.log),
        map(list => {
          list.data.forEach(element => {
            element.checkListItems.forEach(item => {
              if (item.isChecked === true && element.totalItems !== element.checkListItems.length) {
                element.completedItems = element.completedItems + 1;
              }
            });
            element.totalItems = element.checkListItems.length;
          });
          return filter ? this.applyFilter(filter, list) : list;
        })
      )
    )
  );

  ngOnInit() {
    console.log('[Init]');
    //this.fetchListSubj$.next(true);
  }

  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
  }

  // }
  toggleImages(): void {
    this.displayImage = !this.displayImage;
    this.buttonText = this.displayImage ? 'Hide Images' : 'Show Images';
  }

  applyFilter(filter: string, list: TodoList[]): TodoList[] {
    console.log('In apply filter');
    // tslint:disable-next-line: max-line-length
    return list.filter(
      (item: TodoList) =>
        item.name.toLocaleLowerCase().indexOf(filter.toLocaleLowerCase()) !== -1
    );
  }

  open(content): void {
    this.modalService.open(content);
  }

  createList(): void {
    //console.log('+++++++++++++++++++++++++++', this.validate(this.name.value));
    this.dataToAdd = {
      id: 0,
      name: this.name.value,
      description: this.description.value,
      completedItems: 0,
      totalItems: 0,
      checkListItems: [
        {
          id: 1,
          description: 'something',
          isChecked: false
        }
      ],
      status: 'Incomplete',
      imageUrl: '../../assets/images/logo.jpg',
      createdOn: new Date().toDateString(),
      dueOn: new Date().toDateString()
    };

    this.store.dispatch(addTodo(this.dataToAdd));
  }

  // validate(name: string): boolean {
  //   return this.todoLists.find(x => x.name === name) !== (null || undefined)
  //     ? false
  //     : true;
  // }

  // delete(id): void {
  //   console.log('Deleted', id);
  //   this.todoListService.deleteList(id).subscribe(data => {
  //    this.fetchListSubj$.next(true);
  //   });
  // }
}
