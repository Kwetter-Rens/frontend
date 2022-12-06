import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {LogoutComponent} from "./logout/logout.component";
import {ProfileComponent} from "./profile/profile.component";
import { NotfoundComponent } from "./notfound/notfound.component";

import { AuthGuard } from '@auth0/auth0-angular';
import {ErrorComponent} from "./error/error.component";
import {AdminpageComponent} from "./adminpage/adminpage.component";
import {RoleGuardService as RoleGuard } from "./__services/auth/role-guard.service";

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'pagenotfound', component: NotfoundComponent },
  { path: 'error', component: ErrorComponent },
  { path: ':profilename', component: ProfileComponent },
  { path: '**', redirectTo: 'pagenotfound' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
