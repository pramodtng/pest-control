import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-registration',
  templateUrl: './admin-registration.component.html',
  styleUrls: ['./admin-registration.component.css']
})
export class AdminRegistrationComponent implements OnInit {
  public adminSignUpForm !: FormGroup;
  constructor(private formBuilder : FormBuilder, private http : HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.adminSignUpForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  signUpAdmin(){
    this.http.post<any>("http://localhost:3000/signupAdmin", this.adminSignUpForm.value)
    .subscribe(res => {
      alert("Registration successfull");
      this.adminSignUpForm.reset();
      this.router.navigate(['admin-login']);
    }, err => {
      alert("Registration failed!");
    })
  }

}
