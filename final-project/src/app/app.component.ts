import {Component, ViewChild, AfterViewInit, OnInit} from '@angular/core';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {UserTableService} from './user-table.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnInit {
  public adminPass = {login: 'admin', password: 'admin'};
  public userIsAdmin: boolean = false;
  public darkThemeMode: boolean = false;
  modalReference: NgbModalRef;
  @ViewChild ('content' , {static: false}) content;
  constructor(private modalService: NgbModal, public userTableService: UserTableService, public router: Router) {}

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('admin'));
    if (user === null) {
      return;
    } else if (user.login === this.adminPass.login && user.password === this.adminPass.password) {
      this.userIsAdmin = true;
    }

    this.userTableService.darkThemeSubject$.subscribe(darkThemeStatus => {
      this.darkThemeMode = darkThemeStatus;
    });
  }

  ngAfterViewInit() {
    if (!this.userIsAdmin) {
      this.modalReference = this.modalService.open(this.content, {centered: true});
    }
  }

  checkAdmin(login, password) {
    if (login === this.adminPass.login && password === this.adminPass.password) {
      this.userIsAdmin = true;
      localStorage.setItem('admin', JSON.stringify(this.adminPass));
      this.modalReference.close(this.content);
    } else {
      alert('Login or password is incorrect!');
    }
  }

  clearLocalStorage() {
    localStorage.clear();
    window.location.reload();
  }

}
