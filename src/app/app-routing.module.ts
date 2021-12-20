import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AdminRegistrationComponent } from './admin/admin-registration/admin-registration.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login',  component: LoginComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'admin-login', component: AdminLoginComponent},
  {path: 'admin-registration', component: AdminRegistrationComponent},
  {
    path: 'farmer', 
    canActivate: [AuthGuard],
    loadChildren: () => import('./farmer-dashboard/farmer/farmer.module')
    .then((m) => m.FarmerModule)},
    {
      path: 'admin',
      canActivate: [AuthGuard],
      loadChildren: () => import('./admin/admin/admin-routing.module')
      .then((m) => m.AdminRoutingModule)
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
