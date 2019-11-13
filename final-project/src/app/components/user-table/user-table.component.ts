import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../../interfaces/user-interface';
import {UserTableService} from '../../services/user-table.service';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {BottomSheetComponent} from '../bottom-sheet/bottom-sheet.component';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit, OnDestroy {
  editForm: FormGroup;
  users: User[] = [];
  badUsers: { phone: string; name: string; company: { bs: string; catchPhrase: string; name: string }; age: number }[] = [];
  editedUser: User;

  constructor(public userTableService: UserTableService, private bottomSheet: MatBottomSheet,
              public router: Router, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    if (this.userTableService.isCachedUsers() || this.userTableService.getTableHasChanges()) {
      this.users = this.userTableService.getCachedUsers();
      this.mapUsers(this.users);
    } else this.userTableService.getUsers().subscribe((users: any[]) => {
      this.userTableService.setCachedUsers(users);
      this.users = this.userTableService.getCachedUsers();
      this.mapUsers(this.users);
    });

    this.editForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      age: ['', Validators.required],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10),
        Validators.pattern( /[0-9]+$/)]],
      companyName: ['', Validators.required],
      companyCatchPhrase: ['', Validators.required],
      companyBs: ['', Validators.required],
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

  editElement() {
    if (this.editForm.invalid) {
      return;
    }
    this.editedUser.firstName = this.editForm.value.firstName;
    this.editedUser.lastName = this.editForm.value.lastName;
    this.editedUser.age = parseInt(this.editForm.value.age, 10);
    this.editedUser.phone = this.editForm.value.phone;
    this.editedUser.company.companyName = this.editForm.value.companyName;
    this.editedUser.company.companyCatchPhrase = this.editForm.value.companyCatchPhrase;
    this.editedUser.company.companyBs = this.editForm.value.companyBs;

    this.userTableService.setCachedUsers(this.users);
  }

  sendDataToEditModal(user) {
    this.editedUser = user;

    this.editForm.controls.firstName.setValue(this.editedUser.firstName);
    this.editForm.controls.lastName.setValue(this.editedUser.lastName);
    this.editForm.controls.age.setValue(this.editedUser.age);
    this.editForm.controls.phone.setValue(this.editedUser.phone);
    this.editForm.controls.companyName.setValue(this.editedUser.company.companyName);
    this.editForm.controls.companyCatchPhrase.setValue(this.editedUser.company.companyCatchPhrase);
    this.editForm.controls.companyBs.setValue(this.editedUser.company.companyBs);
  }

  delete(index) {
    this.users.splice(index, 1);
    this.userTableService.setCachedUsers(this.users);
  }

  mapUsers(users) {
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
  }

  ngOnDestroy() {
    this.badUsers = this.users.map(user => {
      return {
        name: user.firstName + ' ' + user.lastName,
        age: Math.floor(Math.random() * 80 + 20),
        phone: user.phone,
        company: {
          name: user.company.companyName,
          catchPhrase: user.company.companyCatchPhrase,
          bs: user.company.companyBs,
        }
      };
    });
    this.userTableService.setCachedUsers(this.badUsers);
    this.userTableService.setTableHasChanges();
  }
}
