import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {
  
  constructor (private router: Router) {};
  canActivate(){
    const admin = localStorage.getItem('admin');
    if(admin) {
      return true;
    }
    else{
      this.router.navigate(['']);
      return false;
    }
  }
}
