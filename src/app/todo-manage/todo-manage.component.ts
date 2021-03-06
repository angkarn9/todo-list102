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
  todoList: TodoList[];
  disabledEditButton = true;
  selectItem: number;

  constructor(private todoListService: TodoListService) {
  }

  ngOnInit() {
    this.todoList = [];
    this.todoListForm = new FormGroup({
      topic: new FormControl(''),
      description: new FormControl('')
    });

    this.todoListService.getTodoList().subscribe((todoList) => {
      this.todoList = todoList;
    });
  }

  resetForm() {
    this.todoListForm.reset();
    this.disabledEditButton = true;
  }

  add() {
    const param = {
      topic: this.todoListForm.get('topic').value,
      description: this.todoListForm.get('description').value
    };
    this.todoListService.add(param).subscribe((todo) => {
      this.todoList.push(todo);
      this.resetForm();
    });
  }

  edit(index: number) {
    this.todoListForm.get('topic').setValue(this.todoList[index].topic);
    this.todoListForm.get('description').setValue(this.todoList[index].description);

    this.disabledEditButton = false;
    this.selectItem = index;
  }

  update() {
    const param = {
      topic: this.todoListForm.get('topic').value,
      description: this.todoListForm.get('description').value
    };

    const todoListSelected = this.todoList[this.selectItem];

    this.todoListService.update(todoListSelected.id, param).subscribe(() => {
      todoListSelected.topic = this.todoListForm.get('topic').value;
      todoListSelected.description = this.todoListForm.get('description').value;
      this.disabledEditButton = true;
      this.selectItem = undefined;
      this.resetForm();
    });
  }

  delete(id: number, index: number) {
    this.todoListService.delete(id).subscribe(() => {
      this.todoList.splice(index, 1);
    });
  }
}
