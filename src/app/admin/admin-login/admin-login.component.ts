import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  public adminLoginForm !: FormGroup;
  constructor(private formBuilder : FormBuilder, private http : HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.adminLoginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }
  loginAdmin(){
    this.http.get<any>("http://localhost:3000/signupAdmin")
    .subscribe(res => {
      const admin = res.find((a:any) =>{
        return a.email === this.adminLoginForm.value.email && a.password === this.adminLoginForm.value.password
      });
      if(admin){
        localStorage.setItem('admin', JSON.stringify(admin));
        alert("Login successfull");
        this.adminLoginForm.reset();
        this.router.navigate(['admin']);
      }
      else{
        alert("Admin does not exist!");
      }
    })
  }

}
