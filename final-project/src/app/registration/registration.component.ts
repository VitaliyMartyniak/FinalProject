import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserTableService} from '../services/user-table.service';
import {User} from '../interfaces/user-interface';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  registerForm: FormGroup;
  submitted: boolean = false;
  newUser: User;
  constructor(private formBuilder: FormBuilder, public userTableService: UserTableService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      age: ['', Validators.required],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern( /[0-9]+$/)]],
      companyName: ['', Validators.required],
      companyCatchPhrase: ['', Validators.required],
      companyBs: ['', Validators.required],
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }

    this.newUser = {
      firstName: this.registerForm.value.firstName,
      lastName: this.registerForm.value.lastName,
      age: parseInt(this.registerForm.value.age, 10),
      phone: this.registerForm.value.phone,
      company: {
        companyName: this.registerForm.value.companyName,
          companyCatchPhrase: this.registerForm.value.companyCatchPhrase,
          companyBs: this.registerForm.value.companyBs,
      }
    };

    this.newUser['name'] = this.newUser.firstName + ' ' + this.newUser.lastName;
    this.newUser['company']['name'] =  this.newUser.company.companyName;
    this.newUser['company']['catchPhrase'] =  this.newUser.company.companyCatchPhrase;
    this.newUser['company']['bs'] =  this.newUser.company.companyBs;
    this.userTableService.sendNewUser(this.newUser);
  }
}
