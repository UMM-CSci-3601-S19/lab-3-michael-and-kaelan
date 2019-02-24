import {Component, OnInit} from '@angular/core';
import {TodoListService} from './todo-list.service';
import {Todo} from './todo';

@Component({
  selector: 'app-todo-component',
  styleUrls: ['./todo.component.css'],
  templateUrl: 'todo.component.html'
})
export class TodoComponent implements OnInit {
  public todo: Todo = null;
  private id: string;
  private owner: string;

  constructor(private todoListService: TodoListService) {
    // this.todos = this.todoListService.getTodos();
  }

  private subscribeToServiceForId() {
    if (this.id) {
      this.todoListService.getTodoById(this.id).subscribe(
        todo => this.todo = todo,
        err => {
          console.log(err);
        }
      );
    }
  }

  // private subscribeToServiceForOwner() {
  //   if (this.owner) {
  //     this.todoListService.getTodoByOwner(this.owner).subscribe(
  //       todo => this.todo = todo[],
  //       err => {
  //         console.log(err);
  //       }
  //     );
  //   }
  // }

  setId(id: string) {
    this.id = id;
    this.subscribeToServiceForId();
  }

  // setOwner(owner: string) {
  //   this.owner = owner;
  //   this.subscribeToServiceForOwner();
  // }

  ngOnInit(): void {
    this.subscribeToServiceForId();
    // this.subscribeToServiceForOwner();
  }
}
