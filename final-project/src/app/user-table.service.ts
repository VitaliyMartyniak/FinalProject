import { Injectable } from '@angular/core';
import {User} from './interfaces/user-interface';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserTableService {
  public darkThemeSubject$ = new Subject<boolean>();
  public newUserSubject$ = new Subject<User>();
  public users: User[] = [];
  public tableHasChanges: boolean = false;

  constructor(public http: HttpClient) {
  }

  setTableHasChanges() {
    this.tableHasChanges = true;
  }

  getTableHasChanges() {
    return this.tableHasChanges;
  }

  setNewThemeStatus(darkThemeStatus) {
    this.darkThemeSubject$.next(darkThemeStatus);
  }

  isCachedUsers() {
    return this.users.length > 0;
  }

  getCachedUsers() {
    return this.users;
  }

  setCachedUsers(users) {
    this.users = users;
  }

  getUsers() {
    return this.http.get('https://jsonplaceholder.typicode.com/users');
  }

  sendNewUser(user: User) {
    this.users.push(user);
  }

  getTodos() {
    return this.http.get('https://jsonplaceholder.typicode.com/todos');
  }
}
