import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../json-server/api.service';
import { FarmerComplaintModel } from './farmer-dashboard.model';

@Component({
  selector: 'app-farmer-dashboard',
  templateUrl: './farmer-dashboard.component.html',
  styleUrls: ['./farmer-dashboard.component.css']
})
export class FarmerDashboardComponent implements OnInit {
  formValue !: FormGroup;
  farmerComplaintData !: any;
  showAdd !: boolean;
  showUpdate !: boolean;
  farmerComplaintObj : FarmerComplaintModel = new FarmerComplaintModel();
  constructor(private formbuilder: FormBuilder, private api:ApiService, private router: Router) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      name : ['' , Validators.required],
      phoneNumber : ['' , Validators.required],
      dzongkhag : ['', Validators.required],
      gewog : ['', Validators.required],
      village : ['', Validators.required],
      image : ['', Validators.required],
      date : ['', Validators.required],
    })
    this.getAllComplaints();
  }
  
addNewComplaints(){
  this.formValue.reset();
  this.showAdd = true;
  this.showUpdate = false;
}

  postFarmerComplaintDetails(){
    this.farmerComplaintObj.name = this.formValue.value.name;
    this.farmerComplaintObj.phoneNumber = this.formValue.value.phoneNumber;
    this.farmerComplaintObj.dzongkhag = this.formValue.value.dzongkhag;
    this.farmerComplaintObj.gewog = this.formValue.value.gewog;
    this.farmerComplaintObj.village = this.formValue.value.village;
    this.farmerComplaintObj.image = 'assets/image.png';
    this.farmerComplaintObj.date = this.formValue.value.date;

   this.api.postFarmerComplaint(this.farmerComplaintObj)
   .subscribe(res => {
     console.log(res);
     alert("Complaint added successfully")
     let ref = document.getElementById('cancel');
     ref?.click();
     this.formValue.reset();
     this.getAllComplaints();
   },
   err => {
     alert("Something went wrong");
   })
  }
  getAllComplaints(){
    this.api.getFarmerComplaint(this.farmerComplaintObj)
    .subscribe(res => {
      this.farmerComplaintData = res;
    })
  }

  deleteComplaint(row: any){
    this.api.deleteFarmerComplaint(row.id)
    .subscribe(res => {
      this.getAllComplaints();
    })
  }
  
  editComplaints(row: any){
    this.showAdd = false;
    this.showUpdate = true;
    this.farmerComplaintObj.id = row.id;
    this.formValue.controls['name'].setValue(row.name);
    this.formValue.controls['phoneNumber'].setValue(row.phoneNumber);
    this.formValue.controls['dzongkhag'].setValue(row.dzongkhag);
    this.formValue.controls['gewog'].setValue(row.gewog);
    this.formValue.controls['village'].setValue(row.village);
    this.formValue.controls['image'].setValue(row.image);
    this.formValue.controls['date'].setValue(row.date);
  }

  updateComplaintDetails(){
    this.farmerComplaintObj.name = this.formValue.value.name;
    this.farmerComplaintObj.phoneNumber = this.formValue.value.phoneNumber;
    this.farmerComplaintObj.dzongkhag = this.formValue.value.dzongkhag;
    this.farmerComplaintObj.gewog = this.formValue.value.gewog;
    this.farmerComplaintObj.village = this.formValue.value.village;
    this.farmerComplaintObj.image = this.formValue.value.image;
    this.farmerComplaintObj.date = this.formValue.value.date;

    this.api.updateFarmerComplaint(this.farmerComplaintObj, this.farmerComplaintObj.id)
    .subscribe(res => {
      alert("Update successfully");
      let ref = document.getElementById('cancel');
      ref?.click();
      this.formValue.reset();
      this.getAllComplaints();
      this.farmerComplaintObj.id = 0;
    })
  }
  logout(){
    localStorage.removeItem('user');
    this.router.navigate(['login']);
  }
}
