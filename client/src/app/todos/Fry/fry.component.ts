import {Component, OnInit} from '@angular/core';
import {TodoListService} from '../todo-list.service';
import {Todo} from '../todo';
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-fry-component',
  styleUrls: ['./fry.component.css'],
  templateUrl: 'fry.component.html',
  providers: []
})
export class FryComponent implements OnInit {
  // These are public so that tests can reference them (.spec.ts)
  public todos: Todo[];
  public filteredTodos: Todo[];

  public todoOwner: string;
  public todoStatus: string;
  public todoBody: string;

  public todo: Todo = null;
  private id: string;

  // Inject the TodoListService into this component.
  // That's what happens in the following constructor.
  //
  // We can call upon the service for interacting
  // with the server.

  constructor(private todoListService: TodoListService) {
    // this.todos = this.todoListService.getTodos();
  }

  //TODO: Check out method again. I was sloppy and changed around the names and parameters of this function without thinking. searchStatus used to be an integer.
  public filterTodos(searchStatus: string, searchBody: string): Todo[] {

    this.filteredTodos = this.todos;

    // Filter by status
    if (searchStatus != null) {
      searchStatus = searchStatus.toLocaleLowerCase();
      if(searchStatus == "incomplete") {
        this.filteredTodos = this.filteredTodos.filter(todo => {
          return !searchStatus || todo.status === false;
        });
      } else if (searchStatus == "complete") {
        this.filteredTodos = this.filteredTodos.filter(todo => {
          return !searchStatus || todo.status === true;
        });
      }
    }

    // Filter by body contents
    if (searchBody != null) {
      searchBody = searchBody.toLocaleLowerCase();

      this.filteredTodos = this.filteredTodos.filter(todo => {
        return !searchBody || todo.body.toLowerCase().indexOf(searchBody) !== -1;
      });
    }
    return this.filteredTodos;
  }

  /**
   * Starts an asynchronous operation to update the todos list
   *
   */
  refreshTodos(): Observable<Todo[]> {
    // Get Todos returns an Observable, basically a "promise" that
    // we will get the data from the server.
    //
    // Subscribe waits until the data is fully downloaded, then
    // performs an action on it (the first lambda)

    const todos: Observable<Todo[]> = this.todoListService.getTodosByOwner();
    todos.subscribe(
      returnedTodos => {
        this.todos = returnedTodos;
        this.filterTodos(this.todoStatus, this.todoBody);
      },
      err => {
        console.log(err);
      });
    return todos;
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

  setId(id: string) {
    this.id = id;
    this.subscribeToServiceForId();
  }

  ngOnInit(): void {
    this.refreshTodos();
  }
}
