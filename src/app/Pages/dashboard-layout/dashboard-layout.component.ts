import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDrawer, MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {MatMenuTrigger, MatMenuModule} from '@angular/material/menu';
import {MatDialog,} from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';




import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef,  OnDestroy, inject } from '@angular/core';
import { SidenavService } from '../../services/sidenav.service';
import { Subscription } from 'rxjs';
import { FooterComponent } from "../../Components/footer/footer.component";
import { DialogboxComponent } from '../../Components/dialogbox/dialogbox.component';
import { AuthService } from '../../services/auth/auth.service';
import { NotificationTriggerService } from '../../services/notificationTrigger/notification-trigger.service';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [MatIconModule, MatMenuModule, RouterLink, MatTooltipModule, RouterLinkActive,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule, CommonModule, RouterOutlet],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css'
})
export class DashboardLayoutComponent {



  isMobile = false;
  isMobileSidenavOpen = false; 
  isHovered = false; 
  sidenavWidth = 70; 
  expandedWidth = 200; 

  navigationLinks: any[] = [];

  private sidenavSubscription: Subscription;

    private dialog = inject(MatDialog);



    




  constructor(
    private breakpointObserver: BreakpointObserver,
    private sidenavService: SidenavService,
    private router: Router,private auth: AuthService, private notification: NotificationTriggerService,
  ) {
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe((result) => {
      this.isMobile = result.matches;
      this.isMobileSidenavOpen = false; 
    });

    this.sidenavSubscription = this.sidenavService.mobileSidenavState$.subscribe((state) => {
      this.isMobileSidenavOpen = state;
    });
  }

  ngOnInit(): void {
    this.sidenavService.getNavigationLinks().subscribe((links) => {
      this.navigationLinks = links;
    });

    this.router.navigate(['/user-dashboard']);
    this.showDisclaimer()
  }



    
  
    showDisclaimer() {
    const ref = this.dialog.open(DialogboxComponent, {
      width: '500px',
      data: {
        title: 'Algo Trading Disclaimer & Risk Disclosure',
        message: `
          I, the undersigned account holder, hereby acknowledge and confirm that:
  
          Voluntary Usage:
  I am using this algo trading software voluntarily and connecting my trading account entirely at my own risk.
  
  Risk of Loss:
  I fully understand that algorithmic and futures trading involve high market risks, including the possibility of substantial losses up to and including my entire invested capital. Profitability is not guaranteed, and I solely bear all gains and losses.
  
  Algo Malfunctions & Errors:
  I understand and agree that this software may contain bugs, errors, glitches, or execution failures. If the algorithm generates wrong trades, technical mistakes, or financial losses, I accept that the fault is entirely mine and not of the developer/provider. I will not bring any legal claim, complaint, or proceeding against the developer/provider, its owners, employees, affiliates, or partners under any circumstances.
  
  Data & Privacy:
  I acknowledge that my trading account information and other personal data may be stored, processed, or transmitted during the use of this software. I accept all risks related to data security, including potential leaks or breaches.
  
  No Liability of Provider:
  The developer/provider does not provide investment advice and is not responsible or liable for any financial loss, damages, technical errors, unauthorized trades, or other issues arising from the use of this software.
  
  Auto Login & Trading Permission:
  I consent to enable auto-login/daily login for account access.
  I authorize the algorithm to execute live trades in my account as per the strategies configured.
  
  Legal Release:
  By signing this disclaimer, I release and permanently discharge the software developer/provider and any of its affiliates from all forms of liability, legal claims, lawsuits, or demands arising from the use of this software.
  
  Acknowledgment:
  I declare that I have fully understood all risks, terms, and limitations of algo trading software. I accept full responsibility for my trading decisions, execution errors, and technical risks.
        `,
        action: 'I Agree & Continue',
        cancelaction: 'I Disagree',
        data: 'LiftPlz appreciates your understanding and compliance with this disclaimer.'
      }
    });
  
    ref.afterClosed().subscribe(ok => {
      if (ok) {
        console.log("Disclaimer Accepted");
        this.notification.showNotification({
            notificationType: 'success',
            Message: "Welcome to LiftPlz",
            verticalPosition: 'top',
          });
        
      } else {
        console.log("User exited");
        this.auth.logout()
      }
    });
  }






  onHover(state: boolean) {
    if (!this.isMobile) {
      this.isHovered = state;
    }
  }

  getSidenavWidth(): string {
    if (this.isMobile) {
      return this.isMobileSidenavOpen ? '70%' : '0';
    }
    return this.isHovered ? `${this.expandedWidth}px` : `${this.sidenavWidth}px`;
  }

  ngOnDestroy(): void {
    this.sidenavSubscription.unsubscribe();
  }


  toogle() {
    if (this.isMobile){
      this.sidenavService.toggleMobileSidenav()
    }
}
}