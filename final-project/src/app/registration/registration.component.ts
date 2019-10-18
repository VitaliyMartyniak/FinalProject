import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserTableService} from '../user-table.service';
import {User} from "../interfaces/user-interface";

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

  onSubmit(firstName, lastName, age, phone, companyName, companyCatchPhrase, companyBs) {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }

    this.newUser = {
      firstName: firstName,
      lastName: lastName,
      age: parseInt(age, 10),
      phone: phone,
      company: {
        companyName: companyName,
          companyCatchPhrase: companyCatchPhrase,
          companyBs: companyBs,
      }
    };

    this.userTableService.sendNewUser(this.newUser);
  }
}
