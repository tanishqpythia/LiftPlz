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

      // If you need a different payload, use a different variable name
      const backendBody = { Username: username, Password: hashedPassword, passwordSalt: randomSalt };

      console.log('Request Body:', backendBody);


      // _______________________ local test _______________________
      this.notification.showNotification({
              notificationType: 'success',
              Message: "Login Successful",
              verticalPosition: 'top',
            });

    // Proper JWT dummy token
    const header = { alg: "HS256", typ: "JWT" };
    const payload = {
      sub: '12345',
      role: '0', 
      unique_name: 'TestUser',
      webHookUrl: 'http://dummy.webhook',
      exp: Math.floor(Date.now() / 1000) + 3600
    };

    function base64url(source: string) {
      // Encode in base64, then replace +, /, = for URL safety
      return btoa(source)
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
    }

    const encodedHeader = base64url(JSON.stringify(header));
    const encodedPayload = base64url(JSON.stringify(payload));
    const signature = "dummy-signature"; // Not validated locally

    const dummyToken = `${encodedHeader}.${encodedPayload}.${signature}`;

    // Store temp credentials
    this.auth.set__temp_creedentials(dummyToken);

    // Redirect to dashboard-catelog
    this.router.navigate(['/dashboard-catelog']);
    this.ngxLoader.stop()
    // _______________________ local test _______________________


      // this.apiService.postSync({endpoint:'signin', body:body}).subscribe(
      //   (response: any) => {
      //     console.log(response)
      //     this.ngxLoader.stop()
      //     if (response && response.access_token) {
      //       console.log(response)
      //       this.JWT_Token = response.access_token;
      //       this.notification.showNotification({
      //         notificationType: 'success',
      //         Message: "Login Successful",
      //         verticalPosition: 'top',
      //       });
      //       console.log("navigating to dashboard")
      //       this.auth.set_Credentials(this.JWT_Token.toString());
      //       this.router.navigate(['/user-dashboard']);
      //     }
      //   },
      //   (error: any) => {
      //     this.ngxLoader.stop()
      //     console.error('Error during sign-in:', error.error);
      //     this.notification.showNotification({
      //       notificationType: 'error',
      //       Message: "Login failed. Please try again.",
      //       verticalPosition: 'top',
      //     });
      //   }
      // );
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
