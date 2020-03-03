import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoManageComponent } from './todo-manage.component';
import { FormGroup, FormControl } from '@angular/forms';

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

  it('should create todoListForm', () => {
    expect(component.todoListForm instanceof FormGroup).toBe(true);
  });

  it('should create fields topic and description in todoListForm', () => {
    const expected = new FormGroup({
      topic: new FormControl(''),
      description: new FormControl('')
    });
    expect(component.todoListForm.getRawValue()).toEqual(expected.getRawValue());
  });

});
