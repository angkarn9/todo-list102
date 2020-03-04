import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoManageComponent } from './todo-manage.component';
import { FormGroup, FormControl } from '@angular/forms';
import { TodoListService } from '../service/todo-list.service';
import { of } from 'rxjs';
import { TodoList } from '../model/todo-list';
import { NO_ERRORS_SCHEMA } from '@angular/core';


describe('TodoManageComponent', () => {
  let component: TodoManageComponent;
  let fixture: ComponentFixture<TodoManageComponent>;
  let todoListService: TodoListService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TodoManageComponent],
      imports: [HttpClientTestingModule],
      providers: [TodoListService],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoManageComponent);
    component = fixture.componentInstance;
    todoListService = TestBed.inject(TodoListService);

    fixture.detectChanges();
    component.todoListForm = new FormGroup({
      topic: new FormControl(''),
      description: new FormControl('')
    });

  });

  describe('onInit', () => {
    it('should get todoList when init', () => {
      spyOn(todoListService, 'getTodoList').and.returnValue(of([{id: 1, topic: 'topic1', description: 'description1'}]));

      component.ngOnInit();

      expect(todoListService.getTodoList).toHaveBeenCalledTimes(1);
    });
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
      spyOn(todoListService, 'add').and.returnValue(of({
        id: 2,
        topic: 'topic2',
        description: 'description2'
      }));
      spyOn(todoListService, 'getTodoList').and.returnValue(of([{ id: 1, topic: 'topic1', description: 'description1' }]));

    });
    it('should call todoListService.add when click Add', () => {
      const expected = new TodoList();
      expected.topic = 'topic1';
      expected.description = 'description1';
      component.ngOnInit();

      component.todoListForm.controls.topic.setValue('topic1');
      component.todoListForm.controls.description.setValue('description1');

      component.add();

      expect(todoListService.add).toHaveBeenCalledWith(expected);
    });

    it('should append new todo list after add success', () => {
      component.ngOnInit();

      component.todoListForm.controls.topic.setValue('topic2');
      component.todoListForm.controls.description.setValue('description2');

      component.add();

      expect(component.todoList).toEqual([
        { id: 1, topic: 'topic1', description: 'description1' },
        { id: 2, topic: 'topic2', description: 'description2' }
      ]);

    });
  });

  describe('edit', () => {
    beforeEach(() => {
      component.todoList = [
        { id: 1, topic: 'topic1', description: 'description1' },
        { id: 2, topic: 'topic2', description: 'description2' }
      ];
    });

    it('should enable update button when click edit', () => {
      component.disabledEditButton = true;

      component.edit(1);

      expect(component.disabledEditButton).toBeFalse();
    });

    it('should set topic and description from edit row when click edit', () => {
      component.edit(0);

      expect(component.todoListForm.get('topic').value).toEqual('topic1');
      expect(component.todoListForm.get('description').value).toEqual('description1');
    });

    it('should set selectItem when click edit row', () => {
      component.edit(1);

      expect(component.selectItem).toEqual(1);
    });

  });

  describe('update', () => {
    beforeEach(() => {
      component.todoList = [
        { id: 1, topic: 'topic1', description: 'description1' },
        { id: 2, topic: 'topic2', description: 'description2' }
      ];
    });

    it('should update topic and description to todoList when click update button', () => {
      component.todoListForm.get('topic').setValue('topicUpdated');
      component.todoListForm.get('description').setValue('descriptionUpdated');

      component.selectItem = 1;

      component.update();

      expect(component.todoList).toEqual([
        { id: 1, topic: 'topic1', description: 'description1' },
        { id: 2, topic: 'topicUpdated', description: 'descriptionUpdated' }
      ]);
    });

    it('should hide update button when updated', () => {
      component.disabledEditButton = false;
      component.selectItem = 1;

      component.update();

      expect(component.disabledEditButton).toBeTrue();
    });

    it('should clear selectItem when updated', () => {
      component.selectItem = 1;

      component.update();

      expect(component.selectItem).toBeUndefined();
    });

    it('should clear todoListForm when updated', () => {
      spyOn(component, 'resetForm');
      component.selectItem = 1;

      component.update();

      expect(component.resetForm).toHaveBeenCalled();

    });
  });

});
