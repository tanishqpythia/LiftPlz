import { Routes } from '@angular/router';
import { HomeComponent } from './Pages/home/home.component';
import { SigninComponent } from './Pages/signin/signin.component';
import { SignupComponent } from './Pages/signup/signup.component';
import { UserDashboardComponent } from './Pages/user-dashboard/user-dashboard.component';

import { accessGuardGuard } from './services/routeGuard/access-guard.guard';


export const routes: Routes = [
    {path:'',redirectTo:'home',pathMatch:'full'},
    {path:'home',component:HomeComponent},
    {path:'contactus',loadComponent:()=>import("../app/Pages/contactus/contactus.component").then(c => c.ContactusComponent)},
    {path:'signIn',loadComponent:()=>import("../app/Pages/signin/signin.component").then(c => c.SigninComponent)},
    {path:'signUp',loadComponent:()=>import("../app/Pages/signup/signup.component").then(c => c.SignupComponent)},
    {path:'AdminPage',loadComponent:()=>import("../app/Pages/admin-pages/admin-pages.component").then(c => c.AdminPagesComponent),canActivate:[accessGuardGuard]},
    {path:'user-dashboard',loadComponent:()=>import("../app/Pages/user-dashboard/user-dashboard.component").then(c => c.UserDashboardComponent),canActivate:[accessGuardGuard]},
   {path:'**',redirectTo:'home',pathMatch:'full'}
];
