import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public farmerLoginForm !: FormGroup;
  constructor(private formBuilder : FormBuilder, private http : HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.farmerLoginForm = this.formBuilder.group({
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required],
    })
  }
  loginFarmers(){
    this.http.get<any>("http://localhost:3000/signupFarmers")
    .subscribe(res => {
      const user = res.find((a:any) =>{
        return a.email === this.farmerLoginForm.value.email && a.password === this.farmerLoginForm.value.password
      });
      if(user){
        localStorage.setItem('user', JSON.stringify(user));
        alert("User login is successfull");
        this.farmerLoginForm.reset();
        this.router.navigate(['farmer']);
      }
      else{
        alert("User does not exist! Try again.");
      }
    })
  }
}
