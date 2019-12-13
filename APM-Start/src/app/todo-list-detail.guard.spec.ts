import { TestBed, async, inject } from '@angular/core/testing';

import { TodoListDetailGuard } from './todo-list-detail.guard';

describe('TodoListDetailGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TodoListDetailGuard]
    });
  });

  it('should ...', inject([TodoListDetailGuard], (guard: TodoListDetailGuard) => {
    expect(guard).toBeTruthy();
  }));
});
