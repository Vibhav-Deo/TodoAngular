import { InMemoryDbService } from 'angular-in-memory-web-api';
import { TodoList } from './todo-list';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const todoLists = [
      {
        id: 1,
        name: 'List 1',
        description: 'todo list for somthing',
        completedItems: 1,
        totalItems: 2,
        checkListItems: [
        {
          id: 1,
          description: 'something',
          isChecked: true
        },
        {
          id: 2,
          description: 'something',
          isChecked: false
        }],
        status: 'Incomplete',
        imageUrl: '../../assets/images/logo.jpg',
        createdOn: new Date().toDateString(),
        dueOn: new Date().toDateString()
      },
      {
        id: 2,
        name: 'List 2',
        description: 'todo list for somthing',
        completedItems: 3,
        totalItems: 5,
        checkListItems: [
        {
          id: 1,
          description: 'something',
          isChecked: true
        },
        {
          id: 2,
          description: 'something',
          isChecked: true
        },
        {
          id: 3,
          description: 'something',
          isChecked: true
        },
        {
          id: 4,
          description: 'something',
          isChecked: false
        },
        {
          id: 5,
          description: 'something',
          isChecked: false
        }],
        status: 'Complete',
        imageUrl: '../../assets/images/logo.jpg',
        createdOn: new Date().toDateString(),
        dueOn: new Date().toDateString()
      }
    ];
    return {todoLists};
  }

  // Overrides the genId method to ensure that a todoList always has an id.
  // If the list array is empty,
  // the method below returns the initial number (11).
  // if the list array is not empty, the method below returns the highest
  // todoList id + 1.
  genId(todoLists: TodoList[]): number {
    return todoLists.length > 0 ? Math.max(...todoLists.map(list => list.id)) + 1 : 11;
  }
}
