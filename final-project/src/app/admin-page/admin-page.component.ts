import {Component} from '@angular/core';
import {UserTableService} from '../user-table.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent{
  public darkMode: boolean = false;
  constructor(public userTableService: UserTableService) { }

  changeTheme() {
    this.darkMode = !this.darkMode;
    this.userTableService.setNewThemeStatus(this.darkMode);
  }

}
