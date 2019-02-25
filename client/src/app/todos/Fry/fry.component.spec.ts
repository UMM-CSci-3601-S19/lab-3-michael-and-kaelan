import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Todo} from '../todo';
import {FryComponent} from './fry.component';
import {TodoListService} from '../todo-list.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {MatCardModule} from '@angular/material/card';

describe('Todo component', () => {

  let fryComponent: FryComponent;
  let fixture: ComponentFixture<FryComponent>;

  let todoListServiceStub: {
    getTodoById: (todoId: string) => Observable<Todo>
  };

  beforeEach(() => {
    // stub TodoService for test purposes
    todoListServiceStub = {
      getTodoById: (todoId: string) => Observable.of([
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
          _id: "58895985ee4964bdc668bd9e",
          owner: "Fry",
          status: false,
          body: "Veniam ut ex sit voluptate Lorem. Laboris ipsum nulla proident aute culpa esse aute pariatur velit deserunt deserunt cillum officia dolore.",
          category: "homework"
        },
        {
          _id: "588959856601f6a77b6a2862",
          owner: "Fry",
          status: false,
          body: "Sunt esse dolore sunt Lorem velit reprehenderit incididunt minim Lorem sint Lorem sit voluptate proident. Veniam voluptate veniam aliqua ipsum cupidatat.",
          category: "homework"
        },
        {
          _id: "58895985c42605d9a2814c7d",
          owner: "Fry",
          status: true,
          body: "Officia labore pariatur ea commodo deserunt dolore. Adipisicing culpa ullamco nulla ullamco enim consequat ipsum excepteur.",
          category: "homework"
        },
        {
          _id: "58895985ba6d35a801f171ac",
          owner: "Fry",
          status: false,
          body: "Aliquip dolor cupidatat incididunt mollit commodo aliqua aute amet reprehenderit incididunt excepteur ipsum reprehenderit. Consectetur est velit aute proident occaecat exercitation exercitation.",
          category: "video games"
        },
        {
          _id: "58895985cc9e12baff820394",
          owner: "Fry",
          status: false,
          body: "Qui culpa duis amet occaecat elit id est pariatur do. Incididunt do minim dolor aliquip minim adipisicing ad ad tempor elit amet amet sit et.",
          category: "software design"
        },
        {
          _id: "58895985e96bc855be665b7d",
          owner: "Fry",
          status: false,
          body: "Dolor cillum id eu mollit sit officia esse proident pariatur. Nulla magna elit in culpa veniam ex in minim commodo consectetur velit incididunt et.",
          category: "homework"
        },
        {
          _id: "58895985756338a6d69e107c",
          owner: "Fry",
          status: true,
          body: "Est sit est pariatur et ut eu quis. Sunt labore dolore deserunt aute sit minim sit tempor sunt sint aliquip dolore cillum consectetur.",
          category: "video games"
        },
        {
          _id: "58895985a7d8ab87dfc9036c",
          owner: "Fry",
          status: true,
          body: "Ipsum dolore incididunt ut ex amet. Ut velit dolor cillum do Lorem magna et aute reprehenderit.",
          category: "video games"
        }
      ].find(todo => todo._id === todoId))
    };

    TestBed.configureTestingModule({
      declarations: [FryComponent],
      imports: [MatCardModule],
      providers: [{provide: TodoListService, useValue: todoListServiceStub}]
    });
  });

  beforeEach(async(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(FryComponent);
      fryComponent = fixture.componentInstance;
    });
  }));

  it('can retrieve Fry by ID', () => {
    fryComponent.setId('58895985c1849992336c219b');
    expect(fryComponent.todo).toBeDefined();
    expect(fryComponent.todo.owner).toBe('Fry');
  });

  it('returns undefined for Santa', () => {
    fryComponent.setId('Santa');
    expect(fryComponent.todo).not.toBeDefined();
  });

});
