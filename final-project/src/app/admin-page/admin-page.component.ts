import {Component, OnInit} from '@angular/core';
import {UserTableService} from '../user-table.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit{
  public darkMode: boolean;
  constructor(public userTableService: UserTableService) { }

  ngOnInit() {
    this.darkMode = this.userTableService.getThemeStatus();
  }

  changeTheme() {
    this.darkMode = !this.darkMode;
    this.userTableService.setNewThemeStatus(this.darkMode);
  }

}
