import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo-manage',
  templateUrl: './todo-manage.component.html',
  styleUrls: ['./todo-manage.component.scss']
})
export class TodoManageComponent implements OnInit {
  todoListForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.todoListForm = new FormGroup({
      topic: new FormControl(''),
      description: new FormControl('')
    });
  }

}
