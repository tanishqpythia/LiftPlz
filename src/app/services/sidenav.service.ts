import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { AuthService } from './auth/auth.service';

interface SidenavMenu {
  title: string;
  icon: string;
  url: string;
}

@Injectable({
  providedIn: 'root',
})
export class SidenavService {
  private mobileSidenavState = new BehaviorSubject<boolean>(false);
  mobileSidenavState$ = this.mobileSidenavState.asObservable();

  private currentDashboard = new BehaviorSubject<string>('user-dashboard');
  currentDashboard$ = this.currentDashboard.asObservable();

setCurrentDashboard(dashboard: string) {
  console.log(`[SidenavService] Setting dashboard →`, dashboard);

  this.currentDashboard.next(dashboard);
  localStorage.setItem('currentDashboard', dashboard);

  console.log(`[SidenavService] Saved to localStorage →`, dashboard);
}

getCurrentDashboard(): string {
  const storedDashboard = localStorage.getItem('currentDashboard');
  const dashboard = storedDashboard || 'user-dashboard';

  console.log(`[SidenavService] Retrieved dashboard from localStorage →`, storedDashboard);
  console.log(`[SidenavService] Using dashboard →`, dashboard);

  return dashboard;
}


  getNavigationLinks(): Observable<SidenavMenu[]> {
    const currentDashboard = this.getCurrentDashboard();
    let navigationLinks: SidenavMenu[] = [];

    if (currentDashboard === 'admin-dashboard') {
      navigationLinks = [
        { title: 'Admin Dashboard', icon: 'admin_panel_settings', url: '/admin-dashboard' },
        { title: 'Ride Records', icon: 'receipt_long', url: '/ride-records' },
        { title: 'Major Analysis', icon: 'analytics', url: '/major-analysis' },
        { title: 'Active Users', icon: 'groups', url: '/active-users' },
        { title: 'Rider Stats', icon: 'directions_bike', url: '/rider-stats' },
        { title: 'Rider Registration Approval', icon: 'how_to_reg', url: '/rider-approval' },
        { title: 'User Control', icon: 'manage_accounts', url: '/user-control' },
      ];
    } else if (currentDashboard === 'rider-dashboard') {
      navigationLinks = [
        { title: 'Rider Dashboard', icon: 'two_wheeler', url: '/rider-dashboard' },
        { title: 'Summary & Remaining', icon: 'summarize', url: '/ride-summary' },
        { title: 'Generate a Ride', icon: 'add_circle', url: '/generate-ride' },
        { title: 'Ride History', icon: 'history', url: '/ride-history' },
        { title: 'Rewards & Referrals', icon: 'card_giftcard', url: '/rewards-referrals' },
      ];
    } else if (currentDashboard === 'user-dashboard') {
      navigationLinks = [
        { title: 'User Dashboard', icon: 'dashboard', url: '/user-dashboard' },
        { title: 'Rides Summary', icon: 'summarize', url: '/rides-summary' },
        { title: 'Request a Trip', icon: 'add_circle', url: '/request-trip' },
        { title: 'Ride History', icon: 'history', url: '/ride-history' },
        { title: 'Balance, Referral & Wallet', icon: 'account_balance_wallet', url: '/wallet-referrals' },
      ];
    }

    return of(navigationLinks);
  }

  toggleMobileSidenav() {
    this.mobileSidenavState.next(!this.mobileSidenavState.value);
  }

  closeMobileSidenav() {
    this.mobileSidenavState.next(false);
  }
}
