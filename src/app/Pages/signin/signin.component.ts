import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { ApiService } from '../../services/api/api.service';


import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import * as CryptoJS from 'crypto-js';
import { MatRippleModule } from '@angular/material/core';
import { NotificationTriggerService } from '../../services/notificationTrigger/notification-trigger.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MatDialog } from '@angular/material/dialog';
import { DialogboxComponent } from '../../Components/dialogbox/dialogbox.component';


@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule, ReactiveFormsModule, MatIconModule, MatRippleModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SigninComponent {
  JWT_Token: any = '';

  loginForm: FormGroup;

  private dialog = inject(MatDialog);
  

  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService, private apiService: ApiService, private notification: NotificationTriggerService, private ngxLoader: NgxUiLoaderService) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  ngOnInit() { 
      // this.showDisclaimer()
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
      console.log("Disclaimer Accepted ✔️");
      
    } else {
      console.log("User exited ❌");
      this.router.navigate(['/home']);
    }
  });
}


  onSignIn() {
    if (this.loginForm.valid) {
      this.ngxLoader.start()
      const { username, password } = this.loginForm.value;


      const randomSalt = CryptoJS.lib.WordArray.random(16).toString();


      // Hash the password with SHA512, then Base64 encode it for backend compatibility
      const hashedPassword = CryptoJS.SHA512(password).toString(CryptoJS.enc.Hex);
      const encodedPassword = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Hex.parse(hashedPassword));

      // Prepare the request payload according to backend schema
      const body = {
        username: username,             // or use email/phone if logging in with those
        password_encrypted: encodedPassword
      };

      console.log('Password:', password);
      console.log('Salt:', randomSalt);
      console.log('Salted Password:', password);
      console.log('Hashed Password:', hashedPassword);

      // const body = { Username: username, Password: hashedPassword, passwordSalt: randomSalt };

      this.apiService.postSync({endpoint:'signin', body:body}).subscribe(
        (response: any) => {
          console.log(response)
          this.ngxLoader.stop()
          if (response && response.access_token) {
            console.log(response)
            this.JWT_Token = response.access_token;
            this.notification.showNotification({
              notificationType: 'success',
              Message: "Login Successful",
              verticalPosition: 'top',
            });
            this.auth.set_Credentials(this.JWT_Token.toString());
            console.log("navigating to dashboard")
            this.router.navigate(['/user-dashboard']);
          }
        },
        (error: any) => {
          this.ngxLoader.stop()
          console.error('Error during sign-in:', error.error);
          this.notification.showNotification({
            notificationType: 'error',
            Message: "Login failed. Please try again.",
            verticalPosition: 'top',
          });
        }
      );
    } else {
      this.ngxLoader.stop()
      this.notification.showNotification({
        notificationType: 'error',
        Message: "Please fill in both fields correctly.",
        verticalPosition: 'top',
      });
    }
  }



  onRegisterClick() {
    this.router.navigate(['/signUp']);
  }
}
