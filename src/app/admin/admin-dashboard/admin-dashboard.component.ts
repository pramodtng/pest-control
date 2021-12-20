import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FarmerComplaintModel } from 'src/app/farmer-dashboard/farmer-dashboard.model';
import { ApiService } from 'src/app/json-server/api.service';


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  filterText!: any;
  farmerComplaintData !: any;
  farmerComplaintObj : FarmerComplaintModel = new FarmerComplaintModel();
  constructor( private api:ApiService, private router: Router) { }

  ngOnInit(): void {
    this.getAllComplaints();
  }
  getAllComplaints(){
    this.api.getFarmerComplaint(this.farmerComplaintObj)
    .subscribe(res => {
      this.farmerComplaintData = res;
    })
  }
  logoutAdmin(){
    localStorage.removeItem('admin');
    this.router.navigate(['admin-login']);
  }

}
