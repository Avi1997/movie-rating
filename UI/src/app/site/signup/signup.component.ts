import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  gender: any[];
  stateClick: boolean = false;
  stateEmpty: boolean = true;
  bloodGroupEmpty: boolean = true;
  signupForm: FormGroup;
  checkpass: boolean =false;
  userPresent: boolean = false;
  successMsg: boolean = false;

  constructor(private userService: UserService, private router: Router) {
   
  }

  ngOnInit() {  

    this.signupForm = new FormGroup({
      user_id: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),     
      password: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(15)]),    
      confirmPassword: new FormControl('', [Validators.required])
    });
  }
  checkIfMatchingPasswords() {
    if (this.signupForm.value.password == this.signupForm.value.confirmPassword) {
      this.checkpass = true;
    } else {
      this.checkpass = false;
    }
  }
  changeValue() {
    this.userPresent = false;
  }
  userAdd(signupForm) {
    const user = {
      name : signupForm.value.name,
      password : signupForm.value.password,
      email : signupForm.value.emailId
    }
     

    this.userService.createUser(user).subscribe(response => {
      this.successMsg = true;
    }, (error) => {
      this.userPresent = true
    })
  }
}
