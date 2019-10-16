import { Component, OnInit } from '@angular/core';
import {User} from '../interfaces/user-interface';
import {UserTableService} from '../user-table.service';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit {

  users: User[] = [];

  constructor(public userTableService: UserTableService, private bottomSheet: MatBottomSheet) {
  }

  ngOnInit() {
    this.userTableService.getUsers().subscribe((users: any[]) => {
      this.users = users.map(user => {
        return {
          firstName: user.name.split(' ', 1),
          lastName: user.name.split(' ', 2)[1],
          age: Math.floor(Math.random() * 80 + 20),
          phone: user.phone.replace(/[.x ()[-]/g, '').slice(0, 10),
          company: {
            companyName: user.company.name,
            companyCatchPhrase: user.company.catchPhrase,
            companyBs: user.company.bs,
          }
        };
      });
    });

    this.userTableService.newUserSubject$.subscribe((newUser: User) => {
      this.users.push(newUser);
    });
  }

  openBottomSheet(object): void {
    console.log(object);
  }

}
