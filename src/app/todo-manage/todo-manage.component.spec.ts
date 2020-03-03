import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TodoManageComponent} from './todo-manage.component';
import {FormGroup, FormControl} from '@angular/forms';
import {TodoListService} from '../service/todo-list.service';
import {of} from 'rxjs';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {TodoList} from '../model/todo-list';
import {NO_ERRORS_SCHEMA} from '@angular/core';


describe('TodoManageComponent', () => {
  let component: TodoManageComponent;
  let fixture: ComponentFixture<TodoManageComponent>;
  let todoListService: TodoListService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TodoManageComponent],
      providers: [TodoListService, HttpClient, HttpHandler],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoManageComponent);
    component = fixture.componentInstance;
    todoListService = TestBed.inject(TodoListService);

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

  describe('resetForm', () => {
    it('should clear fields in todoForm after click button', () => {

      component.todoListForm.get('topic').setValue('Topic');
      component.todoListForm.get('description').setValue('Description');

      component.resetForm();

      expect(component.todoListForm.controls.topic.value).toEqual(null);
      expect(component.todoListForm.controls.description.value).toEqual(null);
    });
  });


  describe('add', () => {
    beforeEach(() => {
      spyOn(todoListService, 'add').and.returnValue(of());
      spyOn(todoListService, 'getTodoList').and.returnValue(of([{id: 1, topic: 'topic1', description: 'description1'}]));

    });
    it('should call todoListService.add when click Add', () => {
      const expected = new TodoList();
      expected.topic = 'topic1';
      expected.description = 'description1';

      component.todoListForm.controls.topic.setValue('topic1');
      component.todoListForm.controls.description.setValue('description1');

      component.add();

      expect(todoListService.add).toHaveBeenCalledWith(expected);
    });

    // it('should call todoListService.getTodoList after Add success', () => {
    //
    //   component.todoListForm.controls.topic.setValue('topic1');
    //   component.todoListForm.controls.description.setValue('description1');
    //
    //   component.add();
    //
    //   expect(todoListService.getTodoList).toHaveBeenCalledTimes(1);
    //
    // });
  });

});
