import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { TodoListModule } from './todo-list/todo-list.module';
import { StoreModule } from '@ngrx/store';
import { todos } from './todo-list/todo-list.reducer';
import { EffectsModule } from '@ngrx/effects';
import { TodosEffects } from './todo-list/todo-list.effect';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TodoListModule,
    StoreModule.forRoot({ todos }),
    EffectsModule.forRoot([TodosEffects])
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
