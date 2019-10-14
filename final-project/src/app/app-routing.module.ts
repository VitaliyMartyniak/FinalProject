import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegistrationComponent} from './registration/registration.component';
import {UsersListComponent} from './users-list/users-list.component';
import {AdminPageComponent} from './admin-page/admin-page.component';


const routes: Routes = [
  {path: 'registration', component: RegistrationComponent},
  {path: 'users-list', component: UsersListComponent},
  {path: 'admin-page', component: AdminPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
