// Imports
import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {UserListComponent} from './users/user-list.component';
import {TodoListComponent} from "./todos/todo-list.component";
import {FryComponent} from "./todos/fry.component";

// Route Configuration
export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'users', component: UserListComponent},
  {path: 'todos', component: TodoListComponent},
  {path: 'fry', component: FryComponent},

];

export const Routing: ModuleWithProviders = RouterModule.forRoot(routes);
