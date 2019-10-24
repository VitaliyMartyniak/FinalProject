import {Component, OnInit, ViewChild} from '@angular/core';
import {Todo} from '../interfaces/todo-interface';
import {UserTableService} from '../user-table.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  @ViewChild('todoCheckBox', {static: false}) todoCheckBox;
  constructor(public userTableService: UserTableService) { }

  ngOnInit() {
    this.userTableService.getTodos().subscribe((todo: Todo[]) => {
      this.todos = todo;
    });
  }

  delete(todo, i) {
    if (todo.completed) {
      this.todos.splice(i, 1);
    }
  }

  changeTodoStatus(todo: Todo) {
    todo.completed = !todo.completed;
  }
}
