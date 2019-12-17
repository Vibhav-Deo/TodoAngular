import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { TodoList } from '../../todo-list';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ModalServiceService } from '../../modal-service.service';
import { FormControl } from '@angular/forms';
import { TodoListService } from '../../todo-list.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, switchMap, map, concatMap, withLatestFrom, filter } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { loadItems, updateList } from '../todo-list.action';
import { isNgTemplate } from '@angular/compiler';

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
  todos$: Observable<any>;
  onCreate$ = new BehaviorSubject(true);
  // realList$ = this.onCreate$.pipe(
  //   withLatestFrom(this.todoListService.getList(this.id)),
  //   concatMap(([create, list]) => {
  //     console.log(create);
  //     console.log(list);
  //     return of(list.checkListItems);
  //   })
  // );

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
    private store: Store<any>
  ) {
    console.log(this.route.snapshot.paramMap.get('id'));
    this.onCreate$.next(true);
  }

  ngOnInit() {
    // const id = +this.route.snapshot.paramMap.get("id");
    // this.todoListService.getList(id).subscribe(returnedList => {
    //   this.todoLists = returnedList;
    //   console.log("initialised todolists");
    //   console.log(this.todoLists);
    // });
    this.fetchItems(this.id);
  }

  private fetchItems(id: number) {
    this.store.dispatch(loadItems({id}));
    this.todos$ = this.store.select(state => state.reducer.data).pipe(tap(data => console.log('[TODO DETAILS COMPONENT]', data)));
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
    this.todos$
      .pipe(
        map(list => {
          return (list.checkListItems[
            list.checkListItems.findIndex(x => x.id === item.id)
          ] = {
            id: item.id,
            description: item.description,
            isChecked: event.returnValue
          });
        })
      )
      .subscribe();
  }
  onSave(): void {
    console.log('update list to');
    // console.log(this.todoLists);
    const dataToUpdate = {
      reducer: {
        data: {
          id: 0,
          name: 'string',
          description: 'string',
          completedItems: 0,
          totalItems: 0,
          checkListItems: [],
          status: 'string',
          imageUrl: 'string',
          createdOn: 'string',
          dueOn: 'string'
        }
      }
    };
    this.todos$
      .pipe(
        tap(data => console.log('++++++++++++++++++>', data))
      ).subscribe(data => Object.assign(dataToUpdate, data));
    console.log('Details Component ===========>', dataToUpdate);
    this.store.dispatch(updateList({data: dataToUpdate.reducer.data}));
  }
  delete(list): void {
    console.log('Deleted', list);
    const dataToUpdate = {
      reducer: {
        data: {
          id: 0,
          name: 'string',
          description: 'string',
          completedItems: 0,
          totalItems: 0,
          checkListItems: [],
          status: 'string',
          imageUrl: 'string',
          createdOn: 'string',
          dueOn: 'string'
        }
      }
    };
    this.todos$
      .pipe(
      ).subscribe(data => Object.assign(dataToUpdate, data));

    dataToUpdate.reducer.data.checkListItems = dataToUpdate.reducer.data.checkListItems.filter(item => item.id !== list.id);
  }
}
