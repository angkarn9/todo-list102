import { TodoList } from './../model/todo-list';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { TodoListService } from './todo-list.service';
import { HttpErrorResponse } from '@angular/common/http';

fdescribe('TodoListService', () => {
  let service: TodoListService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ TodoListService ]
    });

    service = TestBed.get(TodoListService);
    httpTestingController = TestBed.get(HttpTestingController);
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

      const caller = httpTestingController.expectOne('http://www.mocky.io/v2/5e5b456d3000000e00f9f1e7');
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

      const caller = httpTestingController.expectOne('http://www.mocky.io/v2/5e5b456d3000000e00f9f1e7');
      expect(caller.request.method).toEqual('GET');
      caller.flush('', {
        status: 400, statusText: 'Bad request'
      });
      httpTestingController.verify();
    });
  });

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
      const caller = httpTestingController.expectOne('http://www.mocky.io/v2/5e5b4cf23000004c00f9f1f0');
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

      const caller = httpTestingController.expectOne('http://www.mocky.io/v2/5e5b4cf23000004c00f9f1f0');
      caller.flush('', {
        status: 400, statusText: 'Bad request'
      });
      httpTestingController.verify();
    });

    describe('update', () => {
      it('should call http PUT with todoList and http status response = 200', () => {
        const param = {
          id: 1,
          topic: 'Topic1-edit',
          description: 'Desc1-edit',
        };

        service.update(param).subscribe(() => {});

        const expected = {
          id: 1,
          topic: 'Topic1-edit',
          description: 'Desc1-edit',
        };

        const caller = httpTestingController.expectOne('http://www.mocky.io/v2/5e5b5d583000000e00f9f208');
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

        service.update(param).subscribe(() => {

        }, (error: HttpErrorResponse) => {
          expect(error.status).toEqual(400);
          expect(error.statusText).toEqual('Bad request');
        });

        const caller = httpTestingController.expectOne('http://www.mocky.io/v2/5e5b5d583000000e00f9f208');
        caller.flush('', {
          status: 400, statusText: 'Bad request'
        });
        httpTestingController.verify();
      });
    });

  });
});
