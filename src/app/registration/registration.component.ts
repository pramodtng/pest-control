import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  public farmerSignUpForm !: FormGroup;
  constructor(private formBuilder : FormBuilder, private http : HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.farmerSignUpForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  signUpFarmers(){
    this.http.post<any>("http://localhost:3000/signupFarmers", this.farmerSignUpForm.value)
    .subscribe(res => {
      alert("Registration successfull");
      this.farmerSignUpForm.reset();
      this.router.navigate(['login']);
    }, err => {
      alert("Registration failed!");
    })
  }
}
