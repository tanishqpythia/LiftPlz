import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { SectionHeadingsComponent } from "../../Components/section-headings/section-headings.component";
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { DialogboxComponent } from '../../Components/dialogbox/dialogbox.component';
import { MatDialog } from '@angular/material/dialog';
import { SidenavService } from '../../services/sidenav.service';

@Component({
  selector: 'app-dashboard-catelog',
  standalone: true,
  imports: [SectionHeadingsComponent,CommonModule,MatIconModule],
  templateUrl: './dashboard-catelog.component.html',
  styleUrl: './dashboard-catelog.component.css'
})
export class DashboardCatelogComponent {
  allowedDashboards: any[] = [];

  
  private dialog = inject(MatDialog);

  constructor(private auth: AuthService, private router: Router, private sidenavService:SidenavService) {}

  ngOnInit() {
     this.showDisclaimer()
    this.allowedDashboards = this.auth.getUserDashboards();
    console.log('Allowed Dashboards:', this.allowedDashboards);
  }


  
  
    showDisclaimer() {
    const ref = this.dialog.open(DialogboxComponent, {
      width: '500px',
      data: {
    title: ' IMPORTANT NOTICE : LiftPls Disclaimer',
    message: `
      LiftPls is a trusted, community-first mobility platform connecting travelers for short-distance rides. 
  
      User Responsibility:
      While LiftPls verifies users and encourages safe commuting practices, every commuter is ultimately responsible for their travel choices, including following local safety rules and personally verifying ride partners before sharing a journey.
  
      No Guarantee of Rides:
      LiftPls does not guarantee ride availability, punctuality, or the actions of other users on the platform.
  
      Limited Liability:
      LiftPls and its affiliates do not accept liability for any incidents, accidents, delays, disputes, or losses occurring during transit or arising from the use of this platform.
  
      Acknowledgment:
      By continuing to use LiftPls, I acknowledge that I have read and understood this notice, and I accept full responsibility for my commuting choices and interactions through the platform.
    `,
    action: 'I Agree & Continue',
    cancelaction: 'I Disagree',
    data: 'LiftPls appreciates your understanding and compliance with this disclaimer.'
  }
    });
  
    ref.afterClosed().subscribe(ok => {
      if (ok) {
        console.log("Disclaimer Accepted ✔️");
        
      } else {
        console.log("User exited ❌");
        this.router.navigate(['/home']);
      }
    });
  }
  

onDashboardSelect(dashboard: any) {
  console.log("Dashboard selected:", dashboard);
  this.sidenavService.setCurrentDashboard(dashboard.path);

  const tempToken = this.auth.getTempToken();
  this.auth.set_Credentials(tempToken);
  console.log('[DashboardCatelog] Credentials set with temp token ->', tempToken);


  this.router.navigate([`/${dashboard.path}`]);
}
}
