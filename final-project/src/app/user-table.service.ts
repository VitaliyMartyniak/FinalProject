import { Injectable } from '@angular/core';
import {User} from './interfaces/user-interface';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserTableService {
  public newUserSubject$ = new Subject<User>();

  constructor(public http: HttpClient) {
  }

  getUsers() {
    return this.http.get('https://jsonplaceholder.typicode.com/users');
  }

  // sendNewUser(user: User) {
  //   this.newUserSubject$.next(user);
  // }
}
