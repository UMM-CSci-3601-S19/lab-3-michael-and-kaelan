import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import {MATERIAL_COMPATIBILITY_MODE} from '@angular/material';

import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {UserListComponent} from './users/user-list.component';
import {UserListService} from './users/user-list.service';
import {TodoListService} from './todos/todo-list.service';
import {Routing} from './app.routes';
import {APP_BASE_HREF} from '@angular/common';

import {CustomModule} from './custom.module';
import {UserComponent} from './users/user.component';
import {FryComponent} from './todos/fry.component';
import {TodoListComponent} from "./todos/todo-list.component";

//added by Michael due to error I posted in Slack
import {MatCardModule} from '@angular/material/card';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatExpansionModule} from '@angular/material/expansion';
import { NoConflictStyleCompatibilityMode } from '@angular/material'


@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    Routing,
    CustomModule,
    //michael added
    MatCardModule,
    MatTooltipModule,
    MatExpansionModule,
    NoConflictStyleCompatibilityMode

],
  declarations: [
    AppComponent,
    HomeComponent,
    UserListComponent,
    UserComponent,
    FryComponent,
    TodoListComponent

  ],
  providers: [
    UserListService,
    {provide: APP_BASE_HREF, useValue: '/'},
    {provide: MATERIAL_COMPATIBILITY_MODE, useValue: true},
    TodoListService,
    {provide: APP_BASE_HREF, useValue: '/'},
    {provide: MATERIAL_COMPATIBILITY_MODE, useValue: true}
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
