import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoManageComponent } from './todo-manage.component';

describe('TodoManageComponent', () => {
  let component: TodoManageComponent;
  let fixture: ComponentFixture<TodoManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
