import { Component, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import {MatIconModule} from '@angular/material/icon'
import { SidenavService } from '../../services/sidenav.service';
import {MatToolbarModule} from '@angular/material/toolbar';
import { AuthService } from '../../services/auth/auth.service';
import { MatRippleModule } from '@angular/material/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgbCollapseModule,RouterLink,MatIconModule,MatToolbarModule,MatRippleModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isMenuCollapsed = true;
  isMenuCollapsed2 = true;

  title = "LiftPlz"
  sub_title = "hum chale sath sath"
  signing_action = "Sign In"
  signing_url = "/signIn"
  signout_action = "Sign Out"
  signout_url = "/signIn"
  menuList = [
    {name:"Home", url : "/home"},
    {name:"About", url : "/home"},
    {name:"Contact", url : "/contactus"},
    {name:"Blogs", url : "/blogs"},
  ]


  username = "user name"
  userId = "userId"
  profilepage = "View Profile"
  profilepageurl = "/userProfile"
  brokerconfigpage = "View Broker Details"
  brokerConfigpageurl = "/brokerConfig"
  subscriptionpage = "Get Subscription"
  subscriptionpageurl = "/subscriptions"
  contactpage = "Contact us"
  contactpageurl = "/contactus"


  constructor(private sidenavService: SidenavService, private authService:AuthService ) {
    this.getuserName()

  }


  auth = this.authService

  getuserName() {
    console.log("username",this.auth.getUsername())
    this.username = this.auth.getUsername();
    this.userId = this.auth.getUserId();
  }
  toggleSidenav() {
    this.sidenavService.toggleMobileSidenav();
  }

  signout(){
    this.isMenuCollapsed = true
    this.authService.logout()
  }

}
