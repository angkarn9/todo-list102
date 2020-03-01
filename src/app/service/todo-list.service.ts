import { TodoList } from './../model/todo-list';
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
    return this.httpClient.get<TodoList[]>('http://www.mocky.io/v2/5e5b456d3000000e00f9f1e7');
  }

  add(param: TodoList): Observable<any> {
    return this.httpClient.post('http://www.mocky.io/v2/5e5b4cf23000004c00f9f1f0', param);
  }
}
