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

  constructor(private auth : AuthService){}

  getNavigationLinks(): Observable<SidenavMenu[]> {
    // In a real application, this could be fetched from an API
    const navigationLinks: SidenavMenu[] = [
      { title: 'Dashboard', icon: 'home', url: '/user-dashboard' },
      { title: 'Running Trade', icon: 'send', url: '/RunningTrade' },
      { title: 'Orders', icon: 'shopping_cart', url: '/orders' },
      { title: 'All Orders', icon: 'all_inclusive', url: '/AllOrders' },
      { title: 'GTT', icon: 'done_all', url: '/gtt' },
      { title: 'Paper Trade', icon: 'receipt', url: '/PaperConfig' },
      { title: 'Closed Trade', icon: 'power_settings_new', url: '/ClosedTrade' },
      { title: 'Active Stop Loss', icon: 'gpp_maybe', url: '/ActiveStopLoss' },
      { title: 'Target & Trail', icon: 'track_changes', url: '/TargetAndTrail' },
      { title: 'Portfolio Goals', icon: 'account_balance', url: '/PortfolioGoals' },
      
    ];

    if (this.auth.getUserRole() == "1"){
      navigationLinks.push({ title: 'Admin Dashboard', icon: 'portrait', url: '/AdminPage' },)
    }
    
    return of(navigationLinks);
  }

  
  private mobileSidenavState = new BehaviorSubject<boolean>(false);

  // Observable for the sidenav state
  mobileSidenavState$ = this.mobileSidenavState.asObservable();

  // Toggle the mobile sidenav state
  toggleMobileSidenav() {
    this.mobileSidenavState.next(!this.mobileSidenavState.value);
  }

  // Close the sidenav
  closeMobileSidenav() {
    this.mobileSidenavState.next(false);
  }
}
