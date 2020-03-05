import { TodoList, ITodoListParam } from '../model/todo-list';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getTodoList(): Observable<TodoList[]> {
    return this.httpClient.get<TodoList[]>('http://localhost:3000/todos');
  }

  add(param: TodoList): Observable<any> {
    return this.httpClient.post('http://localhost:3000/todos', param);
  }

  update(id: number, param: ITodoListParam): Observable<any> {
    return this.httpClient.put(`http://localhost:3000/todos/${id}`, param);
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete(`http://localhost:3000/todos/${id}`);
  }
}
