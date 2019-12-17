import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ChangeDetectionStrategy
} from '@angular/core';
import { TodoList } from '../todo-list';
import { ModalServiceService } from '../modal-service.service';
import { FormControl } from '@angular/forms';
import { Subscription, Observable, of, combineLatest } from 'rxjs';
import {
  map,
  tap,
  switchMap,
  startWith,
  take,
  filter,
  withLatestFrom
} from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { TodosEffects } from '../todo-list/todo-list.effect';
import { ToDoState } from './todo-list.state';
import { loadLists, createLists, deleteList } from './todo-list.action';
import { InMemoryDataService } from '../in-memory-data.service';

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
  filteredList$: Observable<any>;
  @ViewChild('content', { static: true }) modal: NgbModal;

  subscriptions: Subscription[] = [];

  searchKey$ = this.listFilter.valueChanges.pipe(
    startWith('')
  );

  calculate$: Observable<any>;
  constructor(
    private modalService: ModalServiceService,
    private store: Store<any>,
    private todosEffects: TodosEffects
  ) {
    console.log('COnstructor');
    this.store.dispatch(loadLists()); // effects will be triggered
    this.todos$ = store
      .select(state => state.reducer.data)
      .pipe(tap(data => console.log('[TODO COMPONENT]', data)));

    this.filteredList$ = combineLatest([
      this.todos$,
      this.searchKey$
    ]).pipe(
    map(([list, searchKey]) => {
      let filteredList = list;
      if (!!searchKey) {
      filteredList = list.filter(i => i.name.toLocaleLowerCase().indexOf(searchKey.toLocaleLowerCase()) >= 0);
    }
      return filteredList;
    }));
  }

  private calculateCompletedItems(list: any) {
    console.log(list);
    list.forEach(element => {
      element.checkListItems.forEach(item => {
        if (
          item.isChecked === true &&
          element.totalItems !== element.checkListItems.length
        ) {
          element.completedItems = element.completedItems + 1;
        }
      });
    });
  }

  ngOnInit() {
    console.log('[Init]');
    // this.fetchListSubj$.next(true);
    // this.filteredList$
    //   .pipe(tap(data => console.log('TAP filtered', data)))
    //   .subscribe();
    // this.filteredList$ = this.filteredList$ === undefined ? this.todos$ : this.filteredList$;
    this.filteredList$
      .pipe(tap(data => console.log('TAP filtered', data)))
      .subscribe();
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

  applyFilter(filter: string, list: any): any {
    console.log('In apply filter');
    // tslint:disable-next-line: max-line-length
    const filteredData = {
      reducer: {
        data: []
      }
    };
    Object.assign(filteredData, list);
    console.log('-------------------------->', filteredData);
    filteredData.reducer.data = list.reducer.data.filter(
      (item: TodoList) =>
        item.name.toLocaleLowerCase().indexOf(filter.toLocaleLowerCase()) !== -1
    );
    return filteredData;
  }

  open(content): void {
    this.modalService.open(content);
  }

  createList(): void {
    // console.log('+++++++++++++++++++++++++++', this.validate(this.name.value));
    this.dataToAdd = {
      id: 3,
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

    this.store.dispatch(createLists({ data: this.dataToAdd }));
  }

  // validate(name: string): boolean {
  //   return this.todoLists.find(x => x.name === name) !== (null || undefined)
  //     ? false
  //     : true;
  // }

  delete(id): void {
    console.log('Deleted', id);
    this.store.dispatch(deleteList({ id }));
    this.store.dispatch(loadLists());
  }
}
