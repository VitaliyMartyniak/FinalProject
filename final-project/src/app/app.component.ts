import {Component, ViewChild, AfterViewInit, OnInit} from '@angular/core';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {UserTableService} from './user-table.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnInit {
  public userIsAdmin: boolean = false;
  modalReference: NgbModalRef;
  @ViewChild ('content' , {static: false}) content;
  public darkThemeMode: boolean = false;
  constructor(private modalService: NgbModal, public userTableService: UserTableService) {}

  ngAfterViewInit() {
    this.modalReference = this.modalService.open(this.content, { centered: true });
  }

  checkAdmin(login, password) {
    if (login === 'admin' && password === 'admin') {
      this.userIsAdmin = true;
      this.modalReference.close(this.content);
    } else {
      alert('Login or password is incorrect!');
    }
  }

  ngOnInit() {
    this.userTableService.darkThemeSubject$.subscribe(darkThemeStatus => {
      this.darkThemeMode = darkThemeStatus;
    });
  }

}
