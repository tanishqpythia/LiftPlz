import { Component, Inject, PLATFORM_ID, OnInit, HostListener, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import Aos from 'aos';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./Components/header/header.component";
import { MatIconModule } from '@angular/material/icon';

import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { DashboardLayoutComponent } from "./Pages/dashboard-layout/dashboard-layout.component";
import { FooterComponent } from "./Components/footer/footer.component";
import { InfoFooterComponent } from "./Components/info-footer/info-footer.component";
import { AuthService } from './services/auth/auth.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, NgxUiLoaderModule, MatIconModule, DashboardLayoutComponent, FooterComponent, InfoFooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {



  title = 'LiftPlz';
  showScrollButton = false;
  previousScroll = 0;
  isHeaderVisible = true;

  constructor(@Inject(PLATFORM_ID) private platformId: object, private Auth: AuthService) { }

  auth = this.Auth;

  ngOnInit() {

    if (isPlatformBrowser(this.platformId)) {
      Aos.init();
      window.scrollTo({
        top: 1,
        behavior: 'smooth'
      });
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (isPlatformBrowser(this.platformId)) {
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

      if (currentScroll > this.previousScroll && currentScroll > 100) {
        this.isHeaderVisible = false;
      } else {
        this.isHeaderVisible = true;
      }
      this.previousScroll = currentScroll;

      this.showScrollButton = currentScroll > 100;
    }
  }

  scrollToTop() {
    if (isPlatformBrowser(this.platformId)) {
      (function smoothscroll() {
        let currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
        if (currentScroll > 0) {
          window.requestAnimationFrame(smoothscroll);
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        }
      })();
    }
  }

  isAtTop(): boolean {
    return isPlatformBrowser(this.platformId) && (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop) === 0;
  }













}
