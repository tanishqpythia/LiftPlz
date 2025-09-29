import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import { ApiService } from '../api/api.service';
import { jwtDecode } from 'jwt-decode';
import { SsrCookieService } from 'ngx-cookie-service-ssr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly tokenStorageKey = 'srh_jwt_token';
  private readonly roleStorageKey = 'srh_user_role';
  private readonly UserIdStorageKey = 'srh_user_id';
  private readonly WebHookStorageKey = 'srh_user_webhook';
  private readonly UserNameStorageKey = 'srh_user_name';

  // testing variables
  private readonly temptokenStorageKey = 'srh_temp_jwt_token';
  private readonly temproleStorageKey = 'srh_temp_user_role';


  private AllowedUserRoles = [
    { "role": "0", "access": ["all"] }, //admin
    { "role": "1", "access": ["dashboard-catelog","user-dashboard", "RunningTrade", "orders", "AllOrders", "gtt", "ClosedTrade", "PaperConfig", "subscriptions", "brokerConfig", "userProfile", "ActiveStopLoss", "TargetAndTrail", "PortfolioGoals"] }, //user
    { "role": "2", "access": ["dashboard-catelog","rider-dashboard","user-dashboard", "RunningTrade", "orders", "AllOrders", "gtt", "ClosedTrade", "PaperConfig", "subscriptions", "brokerConfig", "userProfile", "ActiveStopLoss", "TargetAndTrail", "PortfolioGoals"] }, //rider
  ]

  private AllowedUserDashboards = [
    {
      "role": "0", "AllowedDashboards": [
        { "name": "Admin Dashboard", "path": "admin-dashboard", "icon": "admin_panel_settings" },
        { "name": "User Dashboard", "path": "user-dashboard", "icon": "dashboard" },
        { "name": "Rider Dashboard", "path": "rider-dashboard", "icon": "two_wheeler" }
      ]
    }, //admin
    {
      "role": "1", "AllowedDashboards": [
        { "name": "User Dashboard", "path": "user-dashboard", "icon": "dashboard" }
      ]
    }, //user
    {
      "role": "2", "AllowedDashboards": [
        { "name": "User Dashboard", "path": "user-dashboard", "icon": "dashboard" },
        { "name": "Rider Dashboard", "path": "rider-dashboard", "icon": "two_wheeler" }
      ]
    }, //rider
  ]


  constructor(
    private router: Router,
    // private apiService: ApiService,
    private cookieService: SsrCookieService
  ) {

  }


  hasTempAccess(path: string): boolean {
    // console.log("checking access")

    const userRole = this.getUserTempRole();
    console.log("found role", userRole)
    const allowedRole = this.AllowedUserRoles.find(role => role.role === userRole);
    console.log("allowed role", allowedRole)
    if (!allowedRole) {
      return false;
    }

    console.log("access check", allowedRole.access.includes(path) || allowedRole.role === "0")

    return allowedRole.access.includes(path) || allowedRole.role === "0";
  }

  hasAccess(path: string): boolean {
    // console.log("checking access")

    const userRole = this.getUserRole();
    console.log("found role", userRole)
    const allowedRole = this.AllowedUserRoles.find(role => role.role === userRole);
    console.log("allowed role", allowedRole)
    if (!allowedRole) {
      return false;
    }

    console.log("access check", allowedRole.access.includes(path) || allowedRole.role === "0")

    return allowedRole.access.includes(path) || allowedRole.role === "0";
  }

  private decryptToken(token: string): any {
    try {
      const decodedToken = jwtDecode<any>(token);
      return decodedToken;
    } catch (error) {
      console.error('Failed to decode JWT:', error);
      return null;
    }
  }


  private isTokenValid(exp: number): boolean {
    if (!exp) {
      console.warn('Token does not have an expiration field.');
      return false;
    }

    const currentTime = Math.floor(Date.now() / 1000);
    // console.log('current time',currentTime);
    // console.log('exp time',exp);
    // console.log('current exp test',currentTime < exp);
    return currentTime < exp;
  }

  set__temp_creedentials(token: string) {

    console.log("setting Temp Creds")

    this.cookieService.set(this.temptokenStorageKey, token);
    console.log("temp token set", this.cookieService.get(this.temptokenStorageKey))

    const decodedToken = this.decryptToken(token);
    console.log("decodedToken", decodedToken);
    this.cookieService.set(this.temproleStorageKey, decodedToken.role);

  }

  set_Credentials(token: string) {

    // console.log("setting Creds")


    this.cookieService.set(this.tokenStorageKey, token);
    // console.log("token set",this.cookieService.get(this.tokenStorageKey))

    const decodedToken = this.decryptToken(token);

    if (decodedToken) {
      console.log("decodedToken", decodedToken);

      this.cookieService.set(this.UserIdStorageKey, decodedToken.sub);
      // this.cookieService.set(this.roleStorageKey, decodedToken.roleId);
      if (decodedToken.role == undefined) {

        decodedToken.role = "0"
      }
      this.cookieService.set(this.roleStorageKey, decodedToken.role);
      this.cookieService.set(this.UserNameStorageKey, decodedToken.unique_name);
      this.cookieService.set(this.WebHookStorageKey, decodedToken.webHookUrl);
      // this.cookieService.set(this.roleStorageKey, decodedToken.RoleId);

      if (decodedToken.exp) {
        const expiryDate = new Date(decodedToken.exp * 1000);
        console.log(`Token expires at: ${expiryDate}`);
      }
    }
    else {
      this.clear_creds();

    }
  }


  private clear_creds(): void {
    this.cookieService.deleteAll()
  }

  getToken(): string {
    const token = this.cookieService.get(this.tokenStorageKey);

    if (!token) {
      // console.warn('No token found.');
      return "null";
    }

    const decryptedToken = this.decryptToken(token);

    if (decryptedToken && this.isTokenValid(decryptedToken.exp)) {
      return token;
    }

    // console.log("check 1",decryptedToken )
    // console.log("check 2",this.isTokenValid(decryptedToken.exp))
    // console.log("why invalid",decryptedToken && this.isTokenValid(decryptedToken.exp))

    console.warn('Invalid token.');
    this.logout()
    return "null";
  }

  getTempToken(): string {
    const token = this.cookieService.get(this.temptokenStorageKey);

    if (!token) {
      // console.warn('No token found.');
      return "null";
    }

    const decryptedToken = this.decryptToken(token);

    if (decryptedToken && this.isTokenValid(decryptedToken.exp)) {
      return token;
    }

    console.warn('Invalid token.');
    this.logout()
    return "null";

  }

getUserDashboards() {
  const userRole = this.getUserTempRole();
  console.log("Current User Role 👉", userRole);

  const allowedDashboards = this.AllowedUserDashboards.find(
    role => role.role === userRole
  );
  console.log("Matched Role Config 👉", allowedDashboards);

  if (!allowedDashboards) {
    console.log("⚠️ No dashboards allowed for this role");
    return [];
  }

  console.log("✅ Allowed Dashboards 👉", allowedDashboards.AllowedDashboards);
  return allowedDashboards.AllowedDashboards;
}



  getUserId() {

    return this.cookieService.get(this.UserIdStorageKey)

  }


  getUsername() {

    return this.cookieService.get(this.UserNameStorageKey)

  }


  getUserwebHookURL() {

    return this.cookieService.get(this.WebHookStorageKey)

  }

  getUserRole() {

    return this.cookieService.get(this.roleStorageKey)

  }

  getUserTempRole() {
    return this.cookieService.get(this.temproleStorageKey)
  }

  isAuthenticatedAndVerified(): boolean {
    // this.clear_creds()
    // console.log("checking Authenticated and verfied")
    const token = this.getToken();
    // console.log("token",token)
    const userId = this.getUserId();
    // console.log("userId",userId)
    const userRole = this.getUserRole();
    console.log("userId:", this.getUserId(), "userName:", this.getUsername(), "userRole:", this.getUserRole(), "userWebhook:", this.getUserwebHookURL());

    // console.log("checking Authenticated and verfied",token && userId && (userRole === '1' || userRole === '0' || userRole === '2' || userRole == undefined))

    if (token && userId && (userRole === '1' || userRole === '0' || userRole === '2')) {
      return true;
    }

    return false;
  }


  logout(): void {
    this.clear_creds();
    this.router.navigate(['/home']);
  }
}
