import {
  Component,
  OnInit,
  Injectable,
  Inject,
  OnDestroy,
  ViewChild
} from '@angular/core';
import { TodoList } from '../todo-list';
import { ModalServiceService } from '../modal-service.service';
import { FormControl } from '@angular/forms';
import { TodoListService } from '../todo-list.service';
import { Subscription, BehaviorSubject } from 'rxjs';
import { map, tap, switchMap, startWith, take } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit, OnDestroy {
  pageTitle = 'My list\'s';
  displayImage = false;
  buttonText = 'Show Images';
  listFilter = new FormControl('');

  name = new FormControl('');

  description = new FormControl('');

  dataToAdd: TodoList;

  @ViewChild('content', { static: true }) modal: NgbModal;

  todoLists: TodoList[] = [];
  subscriptions: Subscription[] = [];
  constructor(
    private modalService: ModalServiceService,
    private todoListService: TodoListService
  ) {}

  fetchListSubj$ = new BehaviorSubject(true);

  get fetchList$() {
    return this.fetchListSubj$.asObservable().pipe(tap(console.log));
  }

  todoList$ = this.fetchList$.pipe(
    switchMap(() => this.todoListService.getLists())
  );

  filteredList$ = this.listFilter.valueChanges.pipe(
    startWith(''),
    switchMap(filter =>
      this.todoList$.pipe(
        tap(console.log),
        map(list => {
          list.forEach(element => {
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
    this.fetchListSubj$.next(true);
  }

  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
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
    console.log('+++++++++++++++++++++++++++', this.validate(this.name.value));
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

    this.subscriptions.push(
      this.todoListService
        .createList(this.dataToAdd as TodoList)
        .subscribe(list => {
          this.fetchListSubj$.next(true);
        })
    );
  }

  validate(name: string): boolean {
    return this.todoLists.find(x => x.name === name) !== (null || undefined)
      ? false
      : true;
  }

  delete(id): void {
    console.log('Deleted', id);
    this.todoListService.deleteList(id).subscribe(data => {
     this.fetchListSubj$.next(true);
    });
  }
}
