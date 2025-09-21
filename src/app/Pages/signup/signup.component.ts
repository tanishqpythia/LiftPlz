import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';

import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatRippleModule } from '@angular/material/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiService } from '../../services/api/api.service';
import { NotificationTriggerService } from '../../services/notificationTrigger/notification-trigger.service';
import * as CryptoJS from 'crypto-js';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule,FormsModule,MatFormFieldModule, MatInputModule,MatSelectModule, MatIconModule, FormsModule, ReactiveFormsModule, MatRippleModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  registrationForm: FormGroup;

  drivingLicenseBase64: string | null = null;
  aadhaarCardBase64: string | null = null;

  constructor(private fb: FormBuilder,private router: Router,private ngxLoader:NgxUiLoaderService,private apiService:ApiService,private notification: NotificationTriggerService,) {
    this.registrationForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      userStreet: ['', Validators.required],
      userDistrict: ['', Validators.required],
      userState: ['', Validators.required],
      userPincode: [0, Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue]
    }, { 
      validator: this.passwordMatchValidator 
    });
  }

  passwordMatchValidator(group: FormGroup): null | object {
    const password = group.get('password');
    const confirmPassword = group.get('confirmPassword');
    return password && confirmPassword && password.value === confirmPassword.value
      ? null : { mismatch: true };
  }

  confirmPasswordMismatch(): boolean {
    return this.registrationForm.hasError('mismatch') && this.registrationForm.get('confirmPassword')!.touched;
  }

  onFileChange(event: any, fileType: 'drivingLicense' | 'aadhaarCard') {
    const file = event.target.files[0];
    if (file) {
      // Allowed types list
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];

      if (!allowedTypes.includes(file.type)) {
        this.notification.showNotification({
          notificationType: 'error',
          Message: 'Invalid file type. Please upload a JPG or PNG image.',
          verticalPosition: 'top',
        });
        event.target.value = ''; // Reset file input
        if (fileType === 'drivingLicense') {
          this.drivingLicenseBase64 = null;
        } else if (fileType === 'aadhaarCard') {
          this.aadhaarCardBase64 = null;
        }
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const base64String = (reader.result as string).split(',')[1];
        if (fileType === 'drivingLicense') {
          this.drivingLicenseBase64 = base64String;
        } else if (fileType === 'aadhaarCard') {
          this.aadhaarCardBase64 = base64String;
        }
      };
      reader.readAsDataURL(file);
    }
  }

  

  onRegister() {
    if (this.registrationForm.valid) {
      this.ngxLoader.start();

      const formData = { ...this.registrationForm.value };

      // Hash and base64 encode the password fields before sending
      const hashedPassword = CryptoJS.SHA512(formData.password);
      const encodedPassword = CryptoJS.enc.Base64.stringify(hashedPassword);

      const hashedConfirmPassword = CryptoJS.SHA512(formData.confirmPassword);
      const encodedConfirmPassword = CryptoJS.enc.Base64.stringify(hashedConfirmPassword);

      formData.password_encrypted = encodedPassword;
      formData.confirm_password_encrypted = encodedConfirmPassword;

      // Remove plain password fields
      delete formData.password;
      delete formData.confirmPassword;

      // Map to backend expected fields
      formData.phone = formData.mobileNumber;
      delete formData.mobileNumber;

      // Add base64 encoded files
      formData.driving_license = this.drivingLicenseBase64;
      formData.aadhaar_card = this.aadhaarCardBase64;

      // Optionally remove or map other frontend-only fields if necessary
      // For example, backend may not expect firstName, lastName, gender, userStreet, etc.
      // Add them if backend supports or omit

      this.apiService.postSync({ endpoint: 'signup', body: formData }).subscribe(
        (response: any) => {
          this.ngxLoader.stop();
          if (response && (response.status === 200 || response.access_token)) {
            this.notification.showNotification({
              notificationType: 'success',
              Message: "User Registered Successfully",
              verticalPosition: 'top',
            });
            this.router.navigate(['/signin']);  // Redirect to login page after success
          }
        },
        (error: any) => {
          this.ngxLoader.stop();
          this.notification.showNotification({
            notificationType: 'error',
            Message: error.error.detail || "Failed to Register User. Please try again.",
            verticalPosition: 'top',
          });
        }
      );
    } else {
      this.notification.showNotification({
        notificationType: 'error',
        Message: "Please fill all fields correctly and accept terms.",
        verticalPosition: 'top',
      });
    }
  }

    onLoginClick() {
      this.router.navigate(['/signIn']); 
    }
}