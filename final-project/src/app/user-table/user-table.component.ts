import {Component, OnInit} from '@angular/core';
import {User} from '../interfaces/user-interface';
import {UserTableService} from '../user-table.service';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {BottomSheetComponent} from '../bottom-sheet/bottom-sheet.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit {
  users: User[] = [];
  editedUser: User;

  constructor(public userTableService: UserTableService, private bottomSheet: MatBottomSheet, public router: Router) {
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

  openBottomSheet(name, phrase, bs): void {
    this.bottomSheet.open(BottomSheetComponent, {
      data: [name, phrase, bs],
    });
  }

  editElement(firstName, lastName, age, phone, companyName, companyCatchPhrase, companyBs) {
    this.editedUser.firstName = firstName;
    this.editedUser.lastName = lastName;
    this.editedUser.age = parseInt(age, 10);
    this.editedUser.phone = phone;
    this.editedUser.company.companyName = companyName;
    this.editedUser.company.companyCatchPhrase = companyCatchPhrase;
    this.editedUser.company.companyBs = companyBs;
  }

  sendDataToEditModal(user) {
    this.editedUser = user;
  }

  delete(index) {
    this.users.splice(index, 1);
  }
}
