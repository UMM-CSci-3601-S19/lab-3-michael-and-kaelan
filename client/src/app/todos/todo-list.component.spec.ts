import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Observable} from 'rxjs/Observable';
import {FormsModule} from '@angular/forms';
import {MATERIAL_COMPATIBILITY_MODE} from '@angular/material';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';

import {CustomModule} from '../custom.module';

import {Todo} from './todo';
import {TodoListComponent} from './todo-list.component';
import {TodoListService} from './todo-list.service';

describe('Todo list', () => {

  let todoList: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  let todoListServiceStub: {
    getTodos: () => Observable<Todo[]>
  };

  beforeEach(() => {
    // stub TodoService for test purposes
    todoListServiceStub = {
      getTodos: () => Observable.of([
        {
          _id: "58895985a22c04e761776d54",
          owner: "Blanche",
          status: false,
          body: "In sunt ex non tempor cillum commodo amet incididunt anim qui commodo quis. Cillum non labore ex sint esse.",
          category: "software design"
        },
        {
          _id: "58895985c1849992336c219b",
          owner: "Fry",
          status: false,
          body: "Ipsum esse est ullamco magna tempor anim laborum non officia deserunt veniam commodo. Aute minim incididunt ex commodo.",
          category: "video games"
        },
        {
          _id: "58895985ae3b752b124e7663",
          owner: "Fry",
          status: true,
          body: "Ullamco irure laborum magna dolor non. Anim occaecat adipisicing cillum eu magna in.",
          category: "homework"
        },
        {
          _id: "58895985186754887e0381f5",
          owner: "Blanche",
          status: true,
          body: "Incididunt enim ea sit qui esse magna eu. Nisi sunt exercitation est Lorem consectetur incididunt cupidatat laboris commodo veniam do ut sint.",
          category: "software design"
        },
        {
          _id: "5889598555fbbad472586a56",
          owner: "Blanche",
          status: true,
          body: "Aliqua esse aliqua veniam id nisi ea. Ullamco Lorem ex aliqua aliquip cupidatat incididunt reprehenderit voluptate ad nisi elit dolore laboris.",
          category: "groceries"
        },
        {
          _id: "588959856f0b82ee93cd93eb",
          owner: "Barry",
          status: true,
          body: "Nisi sit non non sunt veniam pariatur. Elit reprehenderit aliqua consectetur est dolor officia et adipisicing elit officia nisi elit enim nisi.",
          category: "video games"
        },
        {
          _id: "5889598585bda42fb8388ba1",
          owner: "Blanche",
          status: false,
          body: "Laborum incididunt nisi eiusmod aliqua velit quis occaecat excepteur ut in ad. Commodo adipisicing sint ipsum irure amet exercitation voluptate mollit.",
          category: "homework"
        },
        {
          _id: "588959850ccede43cc675826",
          owner: "Blanche",
          status: true,
          body: "Nostrud ullamco labore exercitation magna. Excepteur aute aliqua veniam veniam nisi eu occaecat ea magna do.",
          category: "homework"
        },
        {
          _id: "58895985ee4964bdc668bd9e",
          owner: "Fry",
          status: false,
          body: "Veniam ut ex sit voluptate Lorem. Laboris ipsum nulla proident aute culpa esse aute pariatur velit deserunt deserunt cillum officia dolore.",
          category: "homework"
        },
        {
          _id: "5889598528c4748a0292e014",
          owner: "Workman",
          status: true,
          body: "Eiusmod commodo officia amet aliquip est ipsum nostrud duis sunt voluptate mollit excepteur. Sunt non in pariatur et culpa est sunt.",
          category: "software design"
        }
      ])
    };

    TestBed.configureTestingModule({
      imports: [CustomModule],
      declarations: [TodoListComponent],
      // providers:    [ TodoListService ]  // NO! Don't provide the real service!
      // Provide a test-double instead
      providers: [{provide: TodoListService, useValue: todoListServiceStub},
        {provide: MATERIAL_COMPATIBILITY_MODE, useValue: true}]

    });
  });

  beforeEach(async(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(TodoListComponent);
      todoList = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('contains all the todos', () => {
    expect(todoList.todos.length).toBe(10);
  });

  //BEGIN name contains
  it('contains a todo named \'Blanche\'', () => {
    expect(todoList.todos.some((todo: Todo) => todo.owner === 'Blanche')).toBe(true);
  });

  it('contain a todo named \'Fry\'', () => {
    expect(todoList.todos.some((todo: Todo) => todo.owner === 'Fry')).toBe(true);
  });

  it('contain a todo named \'Barry\'', () => {
    expect(todoList.todos.some((todo: Todo) => todo.owner === 'Barry')).toBe(true);
  });

  it('doesn\'t contain a todo named \'Santa\'', () => {
    expect(todoList.todos.some((todo: Todo) => todo.owner === 'Santa')).toBe(false);
  });
  //END name contains

  // BEGIN body contains
  it('contains a todo body contains \'In sunt ex ... quis. Cillum non labore ex sint esse.\'', () => {
    expect(todoList.todos.some((todo: Todo) => todo.body === 'In sunt ex non tempor cillum commodo amet incididunt anim qui commodo quis. Cillum non labore ex sint esse.')).toBe(true);
  });

  it('contains a todo body contains \'Eiusmod commodo ... sunt.\'', () => {
    expect(todoList.todos.some((todo: Todo) => todo.body === 'Eiusmod commodo officia amet aliquip est ipsum nostrud duis sunt voluptate mollit excepteur. Sunt non in pariatur et culpa est sunt.')).toBe(true);
  });

  it('doesn\'t EQUAL a todo body with \'Santa\'', () => {
    expect(todoList.todos.some((todo: Todo) => todo.body === 'Santa')).toBe(false);
  });
  //END body contains

  it('has 4 todos that contain category \'homework\'', () => {
    expect(todoList.todos.filter((todo: Todo) => todo.category === "homework").length).toBe(4);
  });

  //BEGIN todo body letter containment
  it('todo list filters by owner containing \'a\' in name', () => {
    expect(todoList.filteredTodos.length).toBe(10);
    todoList.todoBody = 'a';
    const a: Observable<Todo[]> = todoList.refreshTodos();
    a.do(x => Observable.of(x))
      .subscribe(x => expect(todoList.filteredTodos.length).toBe(10));
  });
  //END todo body letter containment


  //BEGIN owner name letter containment
  it('todo list filters by owner containing \'a\' in name', () => {
    expect(todoList.filteredTodos.length).toBe(10);
    todoList.todoOwner = 'a';
    const a: Observable<Todo[]> = todoList.refreshTodos();
    a.do(x => Observable.of(x))
      .subscribe(x => expect(todoList.filteredTodos.length).toBe(7));
  });

  it('todo list filters by owner containing \'e\' in name', () => {
    expect(todoList.filteredTodos.length).toBe(10);
    todoList.todoOwner = 'e';
    const a: Observable<Todo[]> = todoList.refreshTodos();
    a.do(x => Observable.of(x))
      .subscribe(x => expect(todoList.filteredTodos.length).toBe(5));
  });

  it('todo list filters by owner containing \'i\' in name', () => {
    expect(todoList.filteredTodos.length).toBe(10);
    todoList.todoOwner = 'i';
    const a: Observable<Todo[]> = todoList.refreshTodos();
    a.do(x => Observable.of(x))
      .subscribe(x => expect(todoList.filteredTodos.length).toBe(0));
  });

  it('todo list filters by owner containing \'o\' in name', () => {
    expect(todoList.filteredTodos.length).toBe(10);
    todoList.todoOwner = 'o';
    const a: Observable<Todo[]> = todoList.refreshTodos();
    a.do(x => Observable.of(x))
      .subscribe(x => expect(todoList.filteredTodos.length).toBe(1));
  });

  it('todo list filters by owner containing \'u\' in name', () => {
    expect(todoList.filteredTodos.length).toBe(10);
    todoList.todoOwner = 'u';
    const a: Observable<Todo[]> = todoList.refreshTodos();
    a.do(x => Observable.of(x))
      .subscribe(x => expect(todoList.filteredTodos.length).toBe(0));
  });

  it('todo list filters by owner containing \'1\' in name', () => {
    expect(todoList.filteredTodos.length).toBe(10);
    todoList.todoOwner = '1';
    const a: Observable<Todo[]> = todoList.refreshTodos();
    a.do(x => Observable.of(x))
      .subscribe(x => expect(todoList.filteredTodos.length).toBe(0));
  });
  // END owner names letter containment

  it('todo list filters by status', () => {
    expect(todoList.filteredTodos.length).toBe(10);
    todoList.todoStatus = true;
    const a: Observable<Todo[]> = todoList.refreshTodos();
    a.do(x => Observable.of(x))
      .subscribe(x => expect(todoList.filteredTodos.length).toBe(6));
  });

  //BEGIN combination filters
  it('todo list filters by owner with \'bla\'and body with \'non\'', () => {
    expect(todoList.filteredTodos.length).toBe(10);
    todoList.todoBody = 'non';
    todoList.todoOwner = 'bla';
    const a: Observable<Todo[]> = todoList.refreshTodos();
    a.do(x => Observable.of(x))
      .subscribe(x => expect(todoList.filteredTodos.length).toBe(1));
  });

  it('todo list filters by owner with \'r\' and body with \'sunt\'', () => {
    expect(todoList.filteredTodos.length).toBe(10);
    todoList.todoBody = 'sunt';
    todoList.todoOwner = 'r';
    const a: Observable<Todo[]> = todoList.refreshTodos();
    a.do(x => Observable.of(x))
      .subscribe(x => expect(todoList.filteredTodos.length).toBe(2));
  });

  it('todo list filters by owner with \'y\' and body with \'ex\'', () => {
    expect(todoList.filteredTodos.length).toBe(10);
    todoList.todoBody = 'ex';
    todoList.todoOwner = 'y';
    const a: Observable<Todo[]> = todoList.refreshTodos();
    a.do(x => Observable.of(x))
      .subscribe(x => expect(todoList.filteredTodos.length).toBe(2));
  });
  //END combination filters
});

describe('Misbehaving Todo List', () => {
  let todoList: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  let todoListServiceStub: {
    getTodos: () => Observable<Todo[]>
  };

  beforeEach(() => {
    // stub TodoService for test purposes
    todoListServiceStub = {
      getTodos: () => Observable.create(observer => {
        observer.error('Error-prone observable');
      })
    };

    TestBed.configureTestingModule({
      imports: [FormsModule, CustomModule],
      declarations: [TodoListComponent],
      providers: [{provide: TodoListService, useValue: todoListServiceStub},
        {provide: MATERIAL_COMPATIBILITY_MODE, useValue: true}]
    });
  });

  beforeEach(async(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(TodoListComponent);
      todoList = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('generates an error if we don\'t set up a TodoListService', () => {
    // Since the observer throws an error, we don't expect todos to be defined.
    expect(todoList.todos).toBeUndefined();
  });
});
