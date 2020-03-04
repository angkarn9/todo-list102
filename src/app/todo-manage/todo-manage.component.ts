import {FormGroup, FormControl} from '@angular/forms';
import {Component, OnInit} from '@angular/core';
import {TodoListService} from '../service/todo-list.service';
import {TodoList} from '../model/todo-list';

@Component({
  selector: 'app-todo-manage',
  templateUrl: './todo-manage.component.html',
  styleUrls: ['./todo-manage.component.scss']
})
export class TodoManageComponent implements OnInit {
  todoListForm: FormGroup;
  btnLabel = 'Add';
  todoList: TodoList[];

  constructor(private todoListService: TodoListService) {
  }

  ngOnInit() {
    this.todoListForm = new FormGroup({
      topic: new FormControl(''),
      description: new FormControl('')
    });
    console.log(this.todoListService.getTodoList());
    this.todoListService.getTodoList().subscribe((todoList) => {
      this.todoList = todoList;
    });
  }

  resetForm() {
    this.todoListForm.reset();
  }

  add() {
    const todoList = new TodoList();
    todoList.topic = this.todoListForm.get('topic').value;
    todoList.description = this.todoListForm.get('description').value;
    this.todoListService.add(todoList).subscribe((todo) => {
      this.todoList.push(todo);
    });
  }
}
