import { Component, OnInit } from '@angular/core';
import {User} from '../interfaces/user-interface';
import {UserTableService} from '../user-table.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit {

  users: User[] = [];

  constructor(public userTableService: UserTableService) {
  }

  ngOnInit() {
    this.userTableService.getUsers().subscribe((users: any[]) => {
      this.users = users.map(user => {
        return {
          firstName: user.name.split(' ', 1),
          lastName: user.name.split(' ', 2)[1],
          age: Math.floor(Math.random() * 80 + 20),
          phone: user.phone.replace(/[.x ()[-]/g, '').slice(0, 10),
        };
      });
    });

    this.userTableService.newUserSubject$.subscribe((newUser: User) => {
      this.users.push(newUser);
    });
  }

}
