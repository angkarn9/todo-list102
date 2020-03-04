import { TodoList } from './../model/todo-list';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { TodoListService } from './todo-list.service';
import { HttpErrorResponse } from '@angular/common/http';

describe('TodoListService', () => {
  let service: TodoListService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ TodoListService ]
    });

    service = TestBed.inject(TodoListService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('get List', () => {
    it('should return todoList when http response success', () => {
      const expected = [{
        id: 1,
        topic: 'Topic1',
        description: 'Desc1',
      }];

      service.getTodoList().subscribe((todos: TodoList[]) => {
        expect(todos).toEqual(expected);
      });

      const caller = httpTestingController.expectOne('http://localhost:3000/todos');
      expect(caller.request.method).toEqual('GET');
      caller.flush(expected);
      httpTestingController.verify();
    });

    it('should return error message when http response fail', () => {
      service.getTodoList().subscribe(() => {
      }, (error: HttpErrorResponse) => {
        expect(error.status === 400);
        expect(error.statusText === 'Bad request');
      });

      const caller = httpTestingController.expectOne('http://localhost:3000/todos');
      expect(caller.request.method).toEqual('GET');
      caller.flush('', {
        status: 400, statusText: 'Bad request'
      });
      httpTestingController.verify();
    });
  });
  // describe('get');
  describe('add', () => {
    it('should call http POST with todoList and http status response = 201', () => {
      const param = {
        id: 2,
        topic: 'Topic1',
        description: 'Desc1',
      };
      service.add(param).subscribe(() => {});

      const expected = {
        id: 2,
        topic: 'Topic1',
        description: 'Desc1',
      };
      const caller = httpTestingController.expectOne('http://localhost:3000/todos');
      expect(caller.request.method).toEqual('POST');
      expect(caller.request.body).toEqual(expected);
      caller.flush({});
      httpTestingController.verify();
    });

    it('should return error message when http response fail', () => {
      const param = {
        id: 3,
        topic: '',
        description: '',
      };
      service.add(param).subscribe(() => {

      }, (error: HttpErrorResponse) => {
        expect(error.status === 400);
        expect(error.statusText === 'Bad request');
      });

      const caller = httpTestingController.expectOne('http://localhost:3000/todos');
      expect(caller.request.method).toEqual('POST');
      caller.flush('', {
        status: 400, statusText: 'Bad request'
      });
      httpTestingController.verify();
    });
  });

  describe('update', () => {
    it('should call http PUT with todoList and http status response = 200', () => {
      const param = {
        id: 1,
        topic: 'Topic1-edit',
        description: 'Desc1-edit',
      };

      service.update(1, param).subscribe(() => {});

      const expected = {
        id: 1,
        topic: 'Topic1-edit',
        description: 'Desc1-edit',
      };

      const caller = httpTestingController.expectOne('http://localhost:3000/todos/1');
      expect(caller.request.method).toEqual('PUT');
      expect(caller.request.body).toEqual(expected);
      caller.flush({});
      httpTestingController.verify();
    });

    it('should return error message when http response fail', () => {
      const param = {
        id: 1,
        topic: 'Topic1-edit',
        description: 'Desc1-edit',
      };

      service.update(1, param).subscribe(() => {

      }, (error: HttpErrorResponse) => {
        expect(error.status).toEqual(400);
        expect(error.statusText).toEqual('Bad request');
      });

      const caller = httpTestingController.expectOne('http://localhost:3000/todos/1');
      expect(caller.request.method).toEqual('PUT');
      caller.flush('', {
        status: 400, statusText: 'Bad request'
      });
      httpTestingController.verify();
    });
  });

  describe('delete', () => {
    it('should call http DELETE and http status response = 204', () => {
      service.delete(1).subscribe(() => {});

      const caller = httpTestingController.expectOne('http://localhost:3000/todos/1');
      expect(caller.request.method).toEqual('DELETE');
      caller.flush({});
      httpTestingController.verify();
    });

    it('should return error message when http response fail', () => {

      service.delete(1).subscribe(() => {

      }, (error: HttpErrorResponse) => {
        expect(error.status === 400);
        expect(error.statusText === 'Bad request');
      });

      const caller = httpTestingController.expectOne('http://localhost:3000/todos/1');
      expect(caller.request.method).toEqual('DELETE');
      caller.flush('', {
        status: 400, statusText: 'Bad request'
      });
      httpTestingController.verify();
    });
  });
});
