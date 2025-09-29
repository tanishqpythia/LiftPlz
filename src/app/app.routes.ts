import { Routes } from '@angular/router';
import { HomeComponent } from './Pages/home/home.component';
import { SigninComponent } from './Pages/signin/signin.component';
import { SignupComponent } from './Pages/signup/signup.component';
import { UserDashboardComponent } from './Pages/user-dashboard/user-dashboard.component';

import { accessGuardGuard,TempAccessGuardGuard } from './services/routeGuard/access-guard.guard';


export const routes: Routes = [
    {path:'',redirectTo:'home',pathMatch:'full'},
    {path:'home',component:HomeComponent},
    {path:'contactus',loadComponent:()=>import("../app/Pages/contactus/contactus.component").then(c => c.ContactusComponent)},
    {path:'signIn',loadComponent:()=>import("../app/Pages/signin/signin.component").then(c => c.SigninComponent)},
    {path:'signUp',loadComponent:()=>import("../app/Pages/signup/signup.component").then(c => c.SignupComponent)},
    {path:'AdminPage',loadComponent:()=>import("../app/Pages/admin-pages/admin-pages.component").then(c => c.AdminPagesComponent),canActivate:[accessGuardGuard]},
    {path:'user-dashboard',loadComponent:()=>import("../app/Pages/user-dashboard/user-dashboard.component").then(c => c.UserDashboardComponent),canActivate:[accessGuardGuard]},
    {path:'rider-dashboard',loadComponent:()=>import("../app/Pages/rider-dashboard/rider-dashboard.component").then(c => c.RiderDashboardComponent),canActivate:[accessGuardGuard]},
    {path:'admin-dashboard',loadComponent:()=>import("../app/Pages/admin-dashboard/admin-dashboard.component").then(c => c.AdminDashboardComponent),canActivate:[accessGuardGuard]},
    {path:'dashboard-catelog',loadComponent:()=>import("../app/Pages/dashboard-catelog/dashboard-catelog.component").then(c => c.DashboardCatelogComponent),canActivate:[TempAccessGuardGuard]},
   {path:'**',redirectTo:'home',pathMatch:'full'}
];
