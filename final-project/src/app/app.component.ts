import {Component, ViewChild, AfterViewInit} from '@angular/core';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  public userIsAdmin: boolean = false;
  modalReference: NgbModalRef;
  @ViewChild ('content' , {static: false}) content;
  constructor(private modalService: NgbModal) {}

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
}
