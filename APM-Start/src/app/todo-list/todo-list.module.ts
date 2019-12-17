import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoListComponent } from '../todo-list/todo-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from '../in-memory-data.service';
import { TodoListDetailsComponent } from '../todo-list/todo-list-details/todo-list-details.component';
import { WelcomeComponent } from '../home/welcome.component';
import { AppRoutingModule } from '../app-routing/app-routing.module';
import { StoreModule } from '@ngrx/store';
import { reducer } from '../todo-list/todo-list.reducer';
import { EffectsModule } from '@ngrx/effects';
import { TodosEffects } from './todo-list.effect';



@NgModule({
  declarations: [
    TodoListComponent,
    TodoListDetailsComponent,
    WelcomeComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),
    StoreModule.forRoot({ reducer }),
    EffectsModule.forRoot([TodosEffects])
  ]
})
export class TodoListModule { }
