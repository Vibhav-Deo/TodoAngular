import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TodoListDetailsComponent } from '../todo-list/todo-list-details/todo-list-details.component';
import { TodoListComponent } from '../todo-list/todo-list.component';
import { WelcomeComponent } from '../home/welcome.component';
import { TodoListDetailGuard } from '../todo-list-detail.guard';



@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: 'welcome', component: WelcomeComponent},
      { path: 'lists/:id', canActivate: [TodoListDetailGuard], component: TodoListDetailsComponent },
      { path: 'lists', component: TodoListComponent },
      { path: '', component: WelcomeComponent},
      { path: '**', redirectTo: 'welcome', pathMatch: 'full'}
    ])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
