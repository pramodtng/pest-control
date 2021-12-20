import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { identifierModuleUrl } from '@angular/compiler';
 
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http: HttpClient) { }

  postFarmerComplaint(data: any){
    return this._http.post<any>("http://localhost:3000/posts", data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  getFarmerComplaint(data: any){
    return this._http.get<any>("http://localhost:3000/posts", data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  updateFarmerComplaint(data: any, id:number){
    return this._http.put<any>("http://localhost:3000/posts/" + id, data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  deleteFarmerComplaint(id: number){
    return this._http.delete<any>("http://localhost:3000/posts/" + id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
}
